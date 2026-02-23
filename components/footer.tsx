"use client"

import Link from "next/link"
import { Disc } from "lucide-react"
import { motion } from "framer-motion"

export function Footer() {
    return (
        <footer className="relative py-14">
            {/* Gradient Border Top */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                <div className="flex flex-col gap-2 items-center md:items-start">
                    <div className="font-heading font-bold text-xl flex items-center gap-3">
                        <img src="/icon.png" alt="Scriptora Logo" className="w-6 h-6 object-contain" />
                        Scriptora
                    </div>
                    <p className="text-xs text-muted-foreground/40">© 2026 Scriptora Inc. — AI Academic Writing IDE</p>
                </div>

                <div className="flex gap-8 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground/50 order-2">
                    <a href="#features" className="hover:text-primary transition-colors duration-300">Features</a>
                    <a href="#how-it-works" className="hover:text-primary transition-colors duration-300">How It Works</a>
                    <a href="#pricing" className="hover:text-primary transition-colors duration-300">Pricing</a>
                    <Link href="/affiliate" className="text-primary/60 hover:text-primary transition-colors duration-300 font-black">Affiliate</Link>
                </div>

                <div className="flex gap-5 items-center">
                    <Link href="https://x.com/silentonmode" target="_blank" className="text-muted-foreground/40 hover:text-white hover:scale-110 transition-all duration-300">
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                        </svg>
                    </Link>
                    <Link href="https://discord.gg/k3eUAHtZtE" target="_blank" className="text-muted-foreground/40 hover:text-white hover:scale-110 transition-all duration-300">
                        <Disc className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </footer>
    )
}
