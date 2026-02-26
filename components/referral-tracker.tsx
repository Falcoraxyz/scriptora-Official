"use client"

import { useEffect } from "react"
import { initializeReferralTracking } from "@/lib/referral"

export function ReferralTracker() {
    useEffect(() => {
        const init = async () => {
            await initializeReferralTracking();
        }
        init();
    }, []);

    return null;
}
