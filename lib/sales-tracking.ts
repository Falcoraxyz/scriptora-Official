"use client"

import { supabase } from "./supabase";

export interface SaleRecord {
    id: string;
    email: string; // The affiliate's email (tied to the sale)
    refId: string; // The affiliate's referral ID
    customerEmail?: string;
    amount: number;
    status: 'pending' | 'verified';
    timestamp: string;
}

/**
 * Tracks a sale attempt in Supabase
 */
export async function trackSaleAttempt(refId: string) {
    if (!refId) return;

    // Join with affiliates to find the correct affiliate_id
    const { data: affiliate } = await supabase
        .from('affiliates')
        .select('id')
        .eq('ref_id', refId)
        .single();

    if (!affiliate) {
        console.warn(`[Scriptora] Unknown RefID during tracking: ${refId}`);
    }

    const { error } = await supabase
        .from('sales')
        .insert([{
            affiliate_id: affiliate?.id,
            ref_id: refId,
            amount: 249000,
            status: 'pending'
        }]);

    if (error) {
        console.error('[Scriptora] Error tracking sale:', error);
    } else {
        console.log(`[Scriptora] Real sale attempt recorded for Ref: ${refId}`);
    }
}

/**
 * Gets sales records from Supabase
 */
export async function getSalesRecords(): Promise<SaleRecord[]> {
    const { data, error } = await supabase
        .from('sales')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('[Scriptora] Error fetching sales:', error);
        return [];
    }

    return (data || []).map(r => ({
        id: r.id,
        email: "unknown", // Fetching email would require a join, keeping it simple for now
        refId: r.ref_id,
        amount: r.amount,
        status: r.status as any,
        timestamp: r.created_at
    }));
}

/**
 * Verifies a sale in Supabase
 */
export async function verifySale(saleId: string) {
    const { error } = await supabase
        .from('sales')
        .update({ status: 'verified' })
        .eq('id', saleId);

    if (error) {
        console.error('[Scriptora] Error verifying sale:', error);
    }
}

/**
 * Deletes a sale in Supabase
 */
export async function deleteSale(saleId: string) {
    const { error } = await supabase
        .from('sales')
        .delete()
        .eq('id', saleId);

    if (error) {
        console.error('[Scriptora] Error deleting sale:', error);
    }
}

/**
 * Records a click in Supabase
 */
export async function trackClick(refId: string) {
    if (!refId) return;

    const { data: affiliate } = await supabase
        .from('affiliates')
        .select('id')
        .eq('ref_id', refId)
        .single();

    if (affiliate) {
        await supabase.from('clicks').insert([{ affiliate_id: affiliate.id }]);
    }
}
