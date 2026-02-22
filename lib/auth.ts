"use client"

import { useState, useEffect } from "react";
import { supabase } from "./supabase";

const AUTH_KEY = "scriptora_affiliate_user";

export interface AffiliateUser {
    id: string;
    email: string;
    refId: string;
    isAdmin: boolean;
}

export function useAuth() {
    const [user, setUser] = useState<AffiliateUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem(AUTH_KEY);
        if (stored) {
            setUser(JSON.parse(stored));
        }
        setLoading(false);
    }, []);

    const fetchAndSetUser = (affiliate: any) => {
        const authUser: AffiliateUser = {
            id: affiliate.id,
            email: affiliate.email,
            refId: affiliate.ref_id,
            isAdmin: affiliate.isadmin
        };
        localStorage.setItem(AUTH_KEY, JSON.stringify(authUser));
        setUser(authUser);
        return authUser;
    };

    /**
     * Login via direct DB Query
     */
    const login = async (email: string, password?: string) => {
        if (!password) throw new Error("Password wajib diisi.");

        const { data: affiliate, error } = await supabase
            .from('affiliates')
            .select('*')
            .eq('email', email.toLowerCase())
            .eq('password', password) // Direct matching
            .single();

        if (error || !affiliate) {
            throw new Error("Email atau password salah.");
        }

        return fetchAndSetUser(affiliate);
    };

    /**
     * Register via direct DB Insert
     */
    const register = async (email: string, password?: string) => {
        if (!password) throw new Error("Password wajib diisi.");
        const lowerEmail = email.toLowerCase();

        // 1. Check if exists
        const { data: existing } = await supabase
            .from('affiliates')
            .select('id')
            .eq('email', lowerEmail)
            .single();

        if (existing) {
            throw new Error("Email ini sudah terdaftar.");
        }

        // 2. Create new record
        const refId = lowerEmail.split('@')[0].replace(/[^a-zA-Z0-9]/g, '').toLowerCase() + Math.floor(Math.random() * 1000);

        const { data: newUser, error: insertError } = await supabase
            .from('affiliates')
            .insert([{
                email: lowerEmail,
                password: password,
                ref_id: refId,
                isadmin: false
            }])
            .select()
            .single();

        if (insertError) {
            console.error('[Scriptora] DB Register Error:', insertError);
            throw new Error("Gagal menyimpan ke database.");
        }

        return fetchAndSetUser(newUser);
    };

    const logout = () => {
        localStorage.removeItem(AUTH_KEY);
        setUser(null);
    };

    return {
        user,
        loading,
        login,
        register,
        logout,
        isAdmin: user?.isAdmin || false
    };
}
