import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
    req: Request,
    { params }: { params: { ref: string } }
) {
    try {
        const ref = params.ref;

        const { data, error } = await supabase
            .from('affiliates')
            .select('id, email')
            .eq('ref_id', ref)
            .single();

        if (error || !data) {
            return NextResponse.json({ error: 'Affiliate not found' }, { status: 404 });
        }

        return NextResponse.json({ data });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
