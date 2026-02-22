import { NextResponse } from 'next/server';
import { snap } from '@/lib/midtrans';

export async function POST(req: Request) {
    try {
        const { amount, refId, affiliateId, email, deviceKey } = await req.json();

        // 1. Create unique order ID
        const orderId = `SCRIPT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        // 2. Prepare transaction details
        const parameter = {
            transaction_details: {
                order_id: orderId,
                gross_amount: amount || 249000
            },
            customer_details: {
                email: email
            },
            // Custom data to track affiliate and product delivery in webhook
            metadata: {
                affiliate_id: affiliateId,
                ref_id: refId,
                customer_email: email,
                device_key: deviceKey
            }
        };

        // 3. Generate Snap Token
        const transaction = await snap.createTransaction(parameter);

        return NextResponse.json({
            token: transaction.token,
            redirect_url: transaction.redirect_url
        });

    } catch (error: any) {
        console.error('[Midtrans Checkout Error]:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
