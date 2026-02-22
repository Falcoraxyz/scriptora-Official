import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            order_id,
            transaction_status,
            fraud_status,
            metadata
        } = body;

        console.log(`[Midtrans Webhook] Received for Order: ${order_id} - Status: ${transaction_status}`);

        // Logic check Midtrans Status
        // settlement = Success
        // capture = Success (Credit Card)
        const isSuccess = transaction_status === 'settlement' || transaction_status === 'capture';
        const isPending = transaction_status === 'pending';
        const isCancel = transaction_status === 'deny' || transaction_status === 'cancel' || transaction_status === 'expire';

        if (isSuccess && metadata?.affiliate_id) {
            // Update Database: Create or Update Sale record
            // Since this is Sandbox, we'll insert a record for tracking
            const { error: saleError } = await supabase
                .from('sales')
                .insert([{
                    affiliate_id: metadata.affiliate_id,
                    ref_id: metadata.ref_id || 'direct',
                    customer_email: metadata.customer_email || null,
                    device_key: metadata.device_key || null,
                    amount: 249000,
                    status: 'verified' // Auto-verified on success
                }]);

            if (saleError) {
                console.error('[Webhook DB Error]:', saleError);
            } else {
                // Record click as conversion if needed
                console.log(`[Scriptora] Sale recorded for affiliate ${metadata.affiliate_id}`);
            }
        }

        return NextResponse.json({ status: 'OK' });

    } catch (error: any) {
        console.error('[Midtrans Webhook Error]:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
