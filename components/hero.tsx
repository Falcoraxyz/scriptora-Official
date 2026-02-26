"use client"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { ArrowRight, PlayCircle, Download, Bot, Sparkles, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { detectPlatform, Platform } from "@/lib/downloads"
import { useEffect, useState } from "react"
import { DownloadModal } from "./download-modal"
import { createPortal } from "react-dom"
import Image from "next/image"

export function Hero() {
    const [platform, setPlatform] = useState<Platform>('unknown');
    const [showDemo, setShowDemo] = useState(false);
    const [showDownload, setShowDownload] = useState(false);
    const [mounted, setMounted] = useState(false);

    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    useEffect(() => {
        setMounted(true);
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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8 }
        }
    };

    const demoModal = (
        <AnimatePresence>
            {showDemo && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowDemo(false)}
                        className="fixed inset-0 bg-black/90 backdrop-blur-sm cursor-pointer"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-5xl aspect-video bg-[#0B0613] rounded-3xl border border-white/10 overflow-hidden shadow-2xl pointer-events-auto"
                    >
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setShowDemo(false)}
                            className="absolute top-4 right-4 z-10 text-white/50 hover:text-white hover:bg-white/10 rounded-full"
                        >
                            <X className="w-6 h-6" />
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
    );

    return (
        <section className="relative min-h-[110vh] flex items-center pt-20 overflow-hidden bg-vibrant-gradient">
            {/* Background blobs with parallax */}
            <motion.div
                style={{ y: y1 }}
                className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[128px] pointer-events-none animate-pulse-glow"
            />
            <motion.div
                style={{ y: y2 }}
                className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[128px] pointer-events-none"
            />

            <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8 relative z-10"
                >
                    <motion.div variants={itemVariants} className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                        <Sparkles className="w-3 h-3 mr-2 animate-pulse" />
                        v1.0.2 Stable Release
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="font-heading text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-white/20">
                        Finalize Your <br />
                        Thesis <span className="text-primary-purple bg-clip-text text-transparent bg-gradient-to-r from-[#8A2EFF] via-[#B57CFF] to-[#8A2EFF] bg-[length:200%_auto] animate-gradient-x">Smarter.</span>
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground/80 max-w-lg leading-relaxed font-medium">
                        The ultimate AI Academic IDE designed for perfection. Free to write, structure, and cite. Get Pro when you are ready to export.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-col gap-6 pt-4">
                        <div className="flex flex-wrap gap-4">
                            <Button
                                variant="glow"
                                size="lg"
                                className="rounded-full h-14 px-10 text-md font-bold group shadow-[0_0_30px_rgba(138,46,255,0.3)] hover:shadow-[0_0_50px_rgba(138,46,255,0.5)] transition-all"
                                onClick={handleDownload}
                            >
                                <Download className="mr-2 h-5 w-5 group-hover:-translate-y-1 transition-transform" /> {getBtnLabel()}
                            </Button>
                            <Button
                                variant="ghost"
                                size="lg"
                                className="rounded-full h-14 px-10 border border-white/10 hover:bg-white/5 text-md font-bold group"
                                onClick={() => setShowDemo(true)}
                            >
                                <PlayCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform text-primary" /> Watch Demo
                            </Button>
                        </div>

                        <div className="flex items-center gap-6 px-4 text-[10px] uppercase tracking-[0.25em] font-black text-muted-foreground/40">
                            <span className="opacity-50">Available on:</span>
                            <button onClick={() => { setPlatform('windows'); setShowDownload(true); }} className="hover:text-primary transition-all hover:scale-110">Windows</button>
                            <div className="w-1 h-1 rounded-full bg-white/10" />
                            <button onClick={() => { setPlatform('macos'); setShowDownload(true); }} className="hover:text-primary transition-all hover:scale-110">macOS</button>
                            <div className="w-1 h-1 rounded-full bg-white/10" />
                            <button onClick={() => { setPlatform('linux'); setShowDownload(true); }} className="hover:text-primary transition-all hover:scale-110">Linux</button>
                        </div>
                    </motion.div>
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
                                <Image
                                    src="/splash.png"
                                    alt="Scriptora Desktop Splash"
                                    width={1000}
                                    height={600}
                                    priority
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
                    <div className="absolute inset-0 bg-primary/30 blur-[120px] -z-10 rounded-full animate-pulse-glow"></div>
                </motion.div>
            </div>

            <DownloadModal
                isOpen={showDownload}
                onClose={() => setShowDownload(false)}
                platform={platform}
            />
            {mounted && createPortal(demoModal, document.body)}
        </section>
    )
}
