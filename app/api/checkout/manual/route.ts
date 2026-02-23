import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log('[Manual Checkout Intent]:', body);

        // You can add logic here to save the intent to Supabase if needed
        // For now, it just logs and returns success to allow the WA redirect to proceed

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('[Manual Checkout Error]:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
