"use client"

import { supabase } from "./supabase";

/**
 * Calculates real stats based on Supabase database
 */
export async function getAffiliateStats(email: string) {
    // 1. Get Affiliate Info
    const { data: affiliate } = await supabase
        .from('affiliates')
        .select('id, ref_id')
        .eq('email', email.toLowerCase())
        .single();

    if (!affiliate) {
        return {
            clicks: "0",
            activeUsers: "0",
            sales: "0",
            commission: "Rp 0",
            salesRaw: 0
        };
    }

    // 2. Get Counts
    const { count: clicks, error: clickError } = await supabase
        .from('clicks')
        .select('*', { count: 'exact', head: true })
        .eq('affiliate_id', affiliate.id);

    if (clickError) console.error('[Scriptora] Click Count Error:', clickError);

    const { data: verifiedSales, error: salesError } = await supabase
        .from('sales')
        .select('*')
        .eq('affiliate_id', affiliate.id)
        .eq('status', 'verified');

    const salesCount = verifiedSales?.length || 0;
    const commission = salesCount * 70000;

    return {
        clicks: (clicks || 0).toString(),
        activeUsers: salesCount.toString(),
        sales: salesCount.toString(),
        commission: `Rp ${commission.toLocaleString()}`,
        salesRaw: salesCount
    };
}

/**
 * Generates leaderboard based on verified sales in Supabase
 */
export async function getLeaderboardData(currentUser?: { name: string, sales: number }) {
    // 1. Fetch sales grouped by affiliate (simulated grouping via join or count)
    const { data, error } = await supabase
        .from('affiliates')
        .select(`
            email,
            ref_id,
            sales!inner (status)
        `)
        .eq('sales.status', 'verified');

    if (error) {
        console.error('[Scriptora] Leaderboard Error:', error);
        return [];
    }

    // 2. Calculate sales per affiliate
    const stats: Record<string, number> = {};
    data?.forEach((aff: any) => {
        stats[aff.ref_id] = aff.sales.length;
    });

    const competitors = Object.entries(stats)
        .map(([ref, sales]) => ({
            name: ref,
            sales: sales,
            reward: `Rp ${(sales * 70000).toLocaleString()}`,
            isUser: false
        }))
        .sort((a, b) => b.sales - a.sales)
        .slice(0, 5);

    if (currentUser) {
        const userInTop5 = competitors.find(c => c.name === currentUser.name);

        if (!userInTop5) {
            competitors.push({
                name: currentUser.name,
                sales: currentUser.sales,
                reward: `Rp ${(currentUser.sales * 70000).toLocaleString()}`,
                isUser: true
            });
        } else {
            competitors.forEach(c => {
                if (c.name === currentUser.name) {
                    c.isUser = true;
                }
            });
        }
    }

    return competitors.sort((a, b) => b.sales - a.sales);
}
