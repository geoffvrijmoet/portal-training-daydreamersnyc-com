import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// These will come from your service account JSON
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;

export async function getAuthToken() {
  const auth = new JWT({
    email: GOOGLE_CLIENT_EMAIL,
    key: GOOGLE_PRIVATE_KEY,
    scopes: SCOPES,
  });
  return auth;
}

// Add this type to define our column mappings
type ColumnMap = {
  client: number;
  episodeTitle: number;
  type: number;
  earnedAfterFees: number;
  invoicedAmount: number;
  billedMinutes: number;
  lengthHours: number;
  lengthMinutes: number;
  lengthSeconds: number;
  paymentMethod: number;
  editingHours: number;
  editingMinutes: number;
  editingSeconds: number;
  billableHours: number;
  runningHourlyTotal: number;
  ratePerMinute: number;
  dateInvoiced: number;
  datePaid: number;
  note: number;
};

// Add this function to get column indices
async function getColumnIndices(): Promise<ColumnMap> {
  const headers = await getSheetData('Sheet1!1:1');
  if (!headers?.[0]) throw new Error('Could not find headers in spreadsheet');

  const headerRow = headers[0];
  const findColumn = (name: string): number => {
    const index = headerRow.findIndex((header: string) => 
      header.toLowerCase().trim() === name.toLowerCase().trim()
    );
    if (index === -1) throw new Error(`Could not find column: ${name}`);
    return index;
  };

  return {
    client: findColumn('Client'),
    episodeTitle: findColumn('Episode title'),
    type: findColumn('Type'),
    earnedAfterFees: findColumn('$ after fee'),
    invoicedAmount: findColumn('$ invoiced'),
    billedMinutes: findColumn('Billed minutes'),
    lengthHours: findColumn('Episode length hours'),
    lengthMinutes: findColumn('Episode length minutes'),
    lengthSeconds: findColumn('Episode length seconds'),
    paymentMethod: findColumn('Payment method'),
    editingHours: findColumn('Hours spent editing'),
    editingMinutes: findColumn('Minutes spent editing'),
    editingSeconds: findColumn('Seconds spent editing'),
    billableHours: findColumn('Billable hours'),
    runningHourlyTotal: findColumn('Running Hourly Total'),
    ratePerMinute: findColumn('Rate per minute'),
    dateInvoiced: findColumn('Date invoiced'),
    datePaid: findColumn('Date paid'),
    note: findColumn('Note')
  };
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

// Add this interface at the top of the file
interface SheetRow {
  client: string;
  episodeTitle: string;
  type: string;
  earnedAfterFees: number;
  invoicedAmount: number;
  billedMinutes: number;
  lengthHours: number;
  lengthMinutes: number;
  lengthSeconds: number;
  paymentMethod: string;
  editingHours: number;
  editingMinutes: number;
  editingSeconds: number;
  billableHours: number;
  runningHourlyTotal: number;
  ratePerMinute: number;
  dateInvoiced: string;
  datePaid: string;
  note: string;
}

// Update function signatures
export async function updateSheetData(rowIndex: number, values: SheetRow) {
  try {
    const columns = await getColumnIndices();
    const auth = await getAuthToken();
    const sheets = google.sheets({ version: 'v4', auth });
    
    // Create an array with the correct length and put values in the right positions
    const rowData = new Array(Math.max(...Object.values(columns)) + 1).fill('');
    Object.entries(values).forEach(([key, value]) => {
      const columnIndex = columns[key as keyof ColumnMap];
      if (columnIndex !== undefined) {
        rowData[columnIndex] = value;
      }
    });

    const response = await sheets.spreadsheets.values.update({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: `Sheet1!A${rowIndex}:${String.fromCharCode(65 + rowData.length)}${rowIndex}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowData],
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error updating Google Sheet:', error);
    throw error;
  }
}

export async function appendSheetData(values: SheetRow) {
  try {
    const columns = await getColumnIndices();
    const auth = await getAuthToken();
    const sheets = google.sheets({ version: 'v4', auth });
    
    // Create an array with the correct length and put values in the right positions
    const rowData = new Array(Math.max(...Object.values(columns)) + 1).fill('');
    Object.entries(values).forEach(([key, value]) => {
      const columnIndex = columns[key as keyof ColumnMap];
      if (columnIndex !== undefined) {
        rowData[columnIndex] = value;
      }
    });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: 'Sheet1!A:Z',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowData],
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error appending to Google Sheet:', error);
    throw error;
  }
} 