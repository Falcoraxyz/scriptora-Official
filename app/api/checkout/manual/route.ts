import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, deviceKey, refId, affiliateId } = body;

        console.log('[Manual Checkout Intent]:', body);

        // Record a pending sale if we have affiliate info
        if (affiliateId && affiliateId !== 'direct') {
            const { error } = await supabase
                .from('sales')
                .insert([{
                    affiliate_id: affiliateId,
                    ref_id: refId,
                    amount: 249000,
                    status: 'pending',
                    customer_email: email
                }]);

            if (error) console.error('[Manual Checkout] Error tracking pending sale:', error);
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('[Manual Checkout Error]:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
