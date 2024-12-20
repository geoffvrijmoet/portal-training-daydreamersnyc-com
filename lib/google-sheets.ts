import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// These will come from your service account JSON
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;

async function getAuthToken() {
  const auth = new JWT({
    email: GOOGLE_CLIENT_EMAIL,
    key: GOOGLE_PRIVATE_KEY,
    scopes: SCOPES,
  });
  return auth;
}

export async function getSheetData(range: string) {
  try {
    const auth = await getAuthToken();
    const sheets = google.sheets({ version: 'v4', auth });
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEET_ID,
      range,
    });

    return response.data.values;
  } catch (error) {
    console.error('Error reading from Google Sheet:', error);
    throw error;
  }
}

export async function updateSheetData(range: string, values: (string | number | boolean)[][]) {
  try {
    const auth = await getAuthToken();
    const sheets = google.sheets({ version: 'v4', auth });
    
    const response = await sheets.spreadsheets.values.update({
      spreadsheetId: GOOGLE_SHEET_ID,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error updating Google Sheet:', error);
    throw error;
  }
}

// Example function to append rows
export async function appendSheetData(range: string, values: (string | number | boolean)[][]) {
  try {
    const auth = await getAuthToken();
    const sheets = google.sheets({ version: 'v4', auth });
    
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEET_ID,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error appending to Google Sheet:', error);
    throw error;
  }
} 