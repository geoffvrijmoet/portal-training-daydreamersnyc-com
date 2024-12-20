import { NextResponse } from 'next/server';
import { getSheetData, updateSheetData, appendSheetData } from '@/lib/google-sheets';
import { auth } from '@clerk/nextjs/server';

type Episode = {
  podcastName: string;
  episodeTitle: string;
  episodeType: string;
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
  dateInvoiced: string;
  datePaid: string;
  note: string;
};

export async function GET() {
  try {
    const { userId }: { userId: string | null } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // Get all episodes data (A2:R to skip header row)
    const data = await getSheetData('Sheet1!A2:R');
    
    // Transform the raw data into structured episodes
    const episodes = data?.map((row: (string | number | boolean)[]) => ({
      podcastName: row[0]?.toString() || '',
      episodeTitle: row[1]?.toString() || '',
      episodeType: row[2]?.toString() || '',
      earnedAfterFees: Number(row[3]) || 0,
      invoicedAmount: Number(row[4]) || 0,
      billedMinutes: Number(row[5]) || 0,
      lengthHours: Number(row[6]) || 0,
      lengthMinutes: Number(row[7]) || 0,
      lengthSeconds: Number(row[8]) || 0,
      paymentMethod: row[9]?.toString() || '',
      editingHours: Number(row[10]) || 0,
      editingMinutes: Number(row[11]) || 0,
      editingSeconds: Number(row[12]) || 0,
      billableHours: Number(row[13]) || 0,
      runningHourlyTotal: Number(row[14]) || 0,
      dateInvoiced: row[15]?.toString() || '',
      datePaid: row[16]?.toString() || '',
      note: row[17]?.toString() || '',
    })) || [];

    return NextResponse.json({ data: episodes });
  } catch (error) {
    console.error('Sheets API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch episodes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId }: { userId: string | null } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { episode } = body as { episode: Episode };

    // Validate required fields
    if (!episode.podcastName || !episode.episodeTitle) {
      return NextResponse.json(
        { error: 'Podcast name and episode title are required' },
        { status: 400 }
      );
    }

    // Format data for sheets
    const values = [[
      episode.podcastName,
      episode.episodeTitle,
      episode.episodeType,
      episode.earnedAfterFees,
      episode.invoicedAmount,
      episode.billedMinutes,
      episode.lengthHours,
      episode.lengthMinutes,
      episode.lengthSeconds,
      episode.paymentMethod,
      episode.editingHours,
      episode.editingMinutes,
      episode.editingSeconds,
      episode.billableHours,
      episode.runningHourlyTotal,
      episode.dateInvoiced,
      episode.datePaid,
      episode.note
    ]];

    // Append the new episode
    await appendSheetData('Sheet1!A:R', values);

    // Get updated data
    const updatedData = await getSheetData('Sheet1!A2:R');
    
    return NextResponse.json({ 
      message: 'Episode added successfully',
      data: updatedData 
    });
  } catch (error) {
    console.error('Sheets API Error:', error);
    return NextResponse.json({ error: 'Failed to add episode' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { userId }: { userId: string | null } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { rowIndex, episode } = body as { rowIndex: number; episode: Episode };

    if (!rowIndex || rowIndex < 0) {
      return NextResponse.json({ error: 'Valid row index required' }, { status: 400 });
    }

    const values = [[
      episode.podcastName,
      episode.episodeTitle,
      episode.episodeType,
      episode.earnedAfterFees,
      episode.invoicedAmount,
      episode.billedMinutes,
      episode.lengthHours,
      episode.lengthMinutes,
      episode.lengthSeconds,
      episode.paymentMethod,
      episode.editingHours,
      episode.editingMinutes,
      episode.editingSeconds,
      episode.billableHours,
      episode.runningHourlyTotal,
      episode.dateInvoiced,
      episode.datePaid,
      episode.note
    ]];

    // Update the specific row (add 2 to account for header and 0-based index)
    const range = `Sheet1!A${rowIndex + 2}:R${rowIndex + 2}`;
    await updateSheetData(range, values);

    // Get updated data
    const updatedData = await getSheetData('Sheet1!A2:R');
    
    return NextResponse.json({ 
      message: 'Episode updated successfully',
      data: updatedData 
    });
  } catch (error) {
    console.error('Sheets API Error:', error);
    return NextResponse.json({ error: 'Failed to update episode' }, { status: 500 });
  }
} 