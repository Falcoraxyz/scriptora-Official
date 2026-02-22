"use client"
import { motion, AnimatePresence } from "framer-motion"
import { X, Download, Monitor, Apple, Laptop, MousePointer2 } from "lucide-react"
import { GlassCard } from "./ui/glass-card"
import { Button } from "./ui/button"
import { DOWNLOAD_VERSIONS, Platform } from "@/lib/downloads"

interface DownloadModalProps {
    isOpen: boolean;
    onClose: () => void;
    platform: Platform;
}

export function DownloadModal({ isOpen, onClose, platform }: DownloadModalProps) {
    const activePlatform = platform === 'unknown' ? 'windows' : platform;
    const versions = DOWNLOAD_VERSIONS[activePlatform as keyof typeof DOWNLOAD_VERSIONS] || DOWNLOAD_VERSIONS.windows;

    const getIcon = () => {
        switch (platform) {
            case 'windows': return <Monitor className="w-8 h-8 text-blue-400" />;
            case 'macos': return <Apple className="w-8 h-8 text-white" />;
            case 'linux': return <Laptop className="w-8 h-8 text-orange-400" />;
            default: return <Monitor className="w-8 h-8 text-primary" />;
        }
    };

    const getTitle = () => {
        switch (platform) {
            case 'windows': return 'Download for Windows';
            case 'macos': return 'Download for macOS';
            case 'linux': return 'Download for Linux';
            default: return 'Download Scriptora';
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 30 }}
                        className="relative w-full max-w-lg z-10"
                    >
                        <GlassCard className="p-8 border-primary/30 shadow-2xl bg-[#0F0819]/90 relative overflow-hidden">
                            {/* Decorative background glow */}
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-[80px]" />

                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="flex flex-col items-center text-center mb-10">
                                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4 border border-white/10">
                                    {getIcon()}
                                </div>
                                <h3 className="text-3xl font-heading font-bold text-white mb-2">{getTitle()}</h3>
                                <p className="text-sm text-muted-foreground">Select the version that matches your system configuration.</p>
                            </div>

                            <div className="space-y-4">
                                {versions.map((v, i) => (
                                    <motion.a
                                        key={i}
                                        href={v.link}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                                <Download className="w-5 h-5" />
                                            </div>
                                            <div className="text-left">
                                                <div className="text-sm font-bold text-white group-hover:text-primary transition-colors">{v.label}</div>
                                                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{v.type}</div>
                                            </div>
                                        </div>
                                        <MousePointer2 className="w-4 h-4 text-white/20 group-hover:text-primary transition-all group-hover:translate-x-1" />
                                    </motion.a>
                                ))}
                            </div>

                            <div className="mt-8 text-center">
                                <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
                                    Not on {platform}?
                                    <button
                                        onClick={() => {/* Allow switching OS? Maybe too complex for now */ }}
                                        className="ml-2 text-primary hover:underline"
                                    >
                                        Show all systems
                                    </button>
                                </p>
                            </div>
                        </GlassCard>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
