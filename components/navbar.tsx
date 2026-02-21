"use client"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { useEffect, useState } from "react"
import { detectPlatform, getDownloadUrl, Platform } from "@/lib/downloads"
import { cn } from "@/lib/utils"

export function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const { scrollY } = useScroll()
    const [platform, setPlatform] = useState<Platform>('unknown');

    useEffect(() => {
        setPlatform(detectPlatform());
    }, []);

    const handleDownload = () => {
        const url = getDownloadUrl(platform);
        window.location.href = url;
    };

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50)
    })

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
                scrolled ? "bg-background/80 backdrop-blur-md border-white/10 py-3" : "bg-transparent border-transparent py-5"
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img src="/icon.png" alt="Scriptora Logo" className="w-8 h-8 rounded-lg object-contain" />
                    <span className="text-xl font-heading font-bold tracking-tight">Scriptora</span>
                </div>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                    <a href="#features" className="hover:text-primary transition-colors">Features</a>
                    <a href="#how-it-works" className="hover:text-primary transition-colors">How it Works</a>
                    <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
                </div>

                <div className="flex items-center gap-4">
                    <Button
                        variant="glow"
                        size="sm"
                        className="rounded-full px-6"
                        onClick={handleDownload}
                    >
                        Get Started
                    </Button>
                </div>
            </div>
        </motion.nav>
    )
}
