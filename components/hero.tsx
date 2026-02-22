"use client"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, PlayCircle, Download, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { detectPlatform, getDownloadUrl, Platform, DOWNLOAD_LINKS } from "@/lib/downloads"
import { useEffect, useState } from "react"
import { DownloadModal } from "./download-modal"

export function Hero() {
    const [platform, setPlatform] = useState<Platform>('unknown');
    const [showDemo, setShowDemo] = useState(false);
    const [showDownload, setShowDownload] = useState(false);

    useEffect(() => {
        setPlatform(detectPlatform());
    }, []);

    const handleDownload = () => {
        setShowDownload(true);
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
                                onClick={() => setShowDemo(true)}
                            >
                                <PlayCircle className="mr-2 h-4 w-4" /> Watch Demo
                            </Button>
                        </div>

                        <div className="flex items-center gap-6 px-4 text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60">
                            <span>Other Systems:</span>
                            <button onClick={() => { setPlatform('windows'); setShowDownload(true); }} className="hover:text-primary transition-colors">Windows</button>
                            <div className="w-1 h-1 rounded-full bg-white/20" />
                            <button onClick={() => { setPlatform('macos'); setShowDownload(true); }} className="hover:text-primary transition-colors">macOS</button>
                            <div className="w-1 h-1 rounded-full bg-white/20" />
                            <button onClick={() => { setPlatform('linux'); setShowDownload(true); }} className="hover:text-primary transition-colors">Linux</button>
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

            {/* Demo Modal */}
            <AnimatePresence>
                {showDemo && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowDemo(false)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-5xl aspect-video bg-[#0B0613] rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
                        >
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setShowDemo(false)}
                                className="absolute top-4 right-4 z-10 text-white/50 hover:text-white hover:bg-white/10 rounded-full"
                            >
                                <Bot className="w-6 h-6 rotate-45" />
                            </Button>

                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12 space-y-6">
                                <div className="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center mb-4">
                                    <PlayCircle className="w-10 h-10 text-primary" />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-heading font-bold">Demo Video Coming Soon</h2>
                                    <p className="text-muted-foreground max-w-md mx-auto">
                                        We are currently filming a deep-dive walkthrough of Scriptora v1.0.2. Follow us on X or Discord to be the first to watch!
                                    </p>
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <Button variant="outline" className="border-white/10 rounded-full" onClick={() => window.open("https://x.com/silentonmode", "_blank")}>Follow on X</Button>
                                    <Button variant="outline" className="border-white/10 rounded-full" onClick={() => window.open("https://discord.gg/k3eUAHtZtE", "_blank")}>Join Discord</Button>
                                </div>
                            </div>

                            {/* Background decoration for modal */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-10" />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            <DownloadModal
                isOpen={showDownload}
                onClose={() => setShowDownload(false)}
                platform={platform}
            />
        </section>
    )
}
