"use client"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { useEffect, useState } from "react"
import { detectPlatform, Platform } from "@/lib/downloads"
import { DownloadModal } from "./download-modal"
import { cn } from "@/lib/utils"

export function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const { scrollY, scrollYProgress } = useScroll()
    const [platform, setPlatform] = useState<Platform>('unknown');
    const [showDownloadModal, setShowDownloadModal] = useState(false);

    useEffect(() => {
        setPlatform(detectPlatform());
    }, []);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50)
    })

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                scrolled ? "bg-background/40 backdrop-blur-xl border-b border-white/5 py-3" : "bg-transparent border-b border-transparent py-5"
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                <div
                    className="flex items-center gap-2 cursor-pointer group"
                    onClick={() => window.location.href = '/'}
                >
                    <div className="relative">
                        <img src="/icon.png" alt="Scriptora Logo" className="w-8 h-8 rounded-lg object-contain group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-xl font-heading font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Scriptora</span>
                </div>

                <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
                    <a href="#features" className="hover:text-primary hover:tracking-[0.15em] transition-all duration-300">Features</a>
                    <a href="#how-it-works" className="hover:text-primary hover:tracking-[0.15em] transition-all duration-300">How it Works</a>
                    <a href="#pricing" className="hover:text-primary hover:tracking-[0.15em] transition-all duration-300">Pricing</a>
                </div>

                <div className="flex items-center gap-4">
                    <Button
                        variant="glow"
                        size="sm"
                        className="rounded-full px-6 text-xs uppercase tracking-widest font-bold h-9"
                        onClick={() => setShowDownloadModal(true)}
                    >
                        Get Started
                    </Button>
                </div>
            </div>

            {/* Scroll Progress Bar */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent origin-left"
                style={{ scaleX: scrollYProgress }}
            />

            <DownloadModal
                isOpen={showDownloadModal}
                onClose={() => setShowDownloadModal(false)}
                platform={platform}
            />
        </motion.nav>
    )
}
