"use client"
import { motion } from "framer-motion"
import { ArrowRight, PlayCircle, Download, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { detectPlatform, getDownloadUrl, Platform, DOWNLOAD_LINKS } from "@/lib/downloads"
import { useEffect, useState } from "react"

export function Hero() {
    const [platform, setPlatform] = useState<Platform>('unknown');

    useEffect(() => {
        setPlatform(detectPlatform());
    }, []);

    const handleDownload = () => {
        const url = getDownloadUrl(platform);
        window.location.href = url;
    };

    const getBtnLabel = () => {
        switch (platform) {
            case 'windows': return 'Download for Windows';
            case 'macos': return 'Download for macOS';
            case 'linux': return 'Download for Linux';
            default: return 'Download Scriptora';
        }
    };

    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none" />
            <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] pointer-events-none" />

            <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-6"
                >
                    <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary">
                        <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                        v1.0.2 Stable Release is Live
                    </div>

                    <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                        Finalize Your Thesis, <br />
                        <span className="text-primary-purple bg-clip-text text-transparent bg-gradient-to-r from-[#8A2EFF] to-[#B57CFF]">
                            Faster & Smarter.
                        </span>
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                        The ultimate AI Academic IDE designed for perfection. Free to write, structure, and cite. Get Pro when you are ready to export your final masterpiece.
                    </p>

                    <div className="flex flex-col gap-4 pt-4">
                        <div className="flex flex-wrap gap-4">
                            <Button
                                variant="glow"
                                size="lg"
                                className="rounded-full h-12 px-8"
                                onClick={handleDownload}
                            >
                                <Download className="mr-2 h-4 w-4" /> {getBtnLabel()}
                            </Button>
                            <Button
                                variant="ghost"
                                size="lg"
                                className="rounded-full h-12 px-8 border border-white/10 hover:bg-white/5"
                                onClick={() => alert("Video Demo: Coming Soon! Follow our socials for updates.")}
                            >
                                <PlayCircle className="mr-2 h-4 w-4" /> Watch Demo
                            </Button>
                        </div>

                        <div className="flex items-center gap-6 px-4 text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60">
                            <span>Other Systems:</span>
                            <a href={DOWNLOAD_LINKS.windows} className="hover:text-primary transition-colors">Windows</a>
                            <div className="w-1 h-1 rounded-full bg-white/20" />
                            <a href={DOWNLOAD_LINKS.macos_arm} className="hover:text-primary transition-colors">macOS</a>
                            <div className="w-1 h-1 rounded-full bg-white/20" />
                            <a href={DOWNLOAD_LINKS.linux_deb} className="hover:text-primary transition-colors">Linux</a>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="relative"
                >
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="relative z-10"
                    >
                        <GlassCard className="border-primary/20 bg-[#0B0613]/80 backdrop-blur-2xl p-0 overflow-hidden shadow-[0_0_50px_rgba(138,46,255,0.15)]">
                            {/* Fake UI Header */}
                            <div className="h-10 border-b border-white/10 flex items-center px-4 gap-2 bg-white/5">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                                </div>
                                <div className="flex-1 text-center text-xs font-mono text-muted-foreground opacity-50 uppercase tracking-widest">
                                    BAB I PENDAHULUAN
                                </div>
                            </div>

                            {/* Desktop Splash Content */}
                            <div className="relative group overflow-hidden bg-[#0B0613]">
                                <img
                                    src="/splash.png"
                                    alt="Scriptora Desktop Splash"
                                    className="w-full h-auto object-cover opacity-95 group-hover:opacity-100 transition-all duration-700 rounded-lg"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0613] via-transparent to-transparent pointer-events-none" />
                            </div>
                        </GlassCard>

                        {/* Floating Elements */}
                        <motion.div
                            animate={{ y: [0, 15, 0] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -right-8 -bottom-8"
                        >
                            <GlassCard className="p-4 px-6 flex items-center gap-3 bg-[#0B0613] border-primary/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                                <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 font-bold">
                                    ✓
                                </div>
                                <div className="">
                                    <div className="text-[10px] uppercase tracking-tighter text-muted-foreground">Style Standard</div>
                                    <div className="text-sm font-bold text-white">IEEE / APA 7</div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    </motion.div>

                    {/* Glow behind hero image */}
                    <div className="absolute inset-0 bg-primary/20 blur-[100px] -z-10 rounded-full"></div>
                </motion.div>
            </div>
        </section>
    )
}
