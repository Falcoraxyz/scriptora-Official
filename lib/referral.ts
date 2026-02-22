import { trackClick } from "./sales-tracking";

export const REFERRAL_KEY = "scriptora_ref_id";

/**
 * Captures referral ID from URL and saves to localStorage + Supabase
 */
export async function initializeReferralTracking() {
    if (typeof window === "undefined") return;

    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get("ref");

    if (ref) {
        localStorage.setItem(REFERRAL_KEY, ref);
        console.log(`[Scriptora] Referral captured: ${ref}`);
        // Log click to real database
        await trackClick(ref);
    }
}

/**
 * Retrieves the stored referral ID
 */
export function getStoredReferral(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(REFERRAL_KEY);
}
