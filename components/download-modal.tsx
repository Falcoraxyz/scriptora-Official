"use client"
import { motion, AnimatePresence } from "framer-motion"
import { X, Download, Monitor, Apple, Laptop, MousePointer2, ShieldCheck, AlertCircle, ChevronDown, ChevronUp } from "lucide-react"
import { GlassCard } from "./ui/glass-card"
import { Button } from "./ui/button"
import { DOWNLOAD_VERSIONS, Platform } from "@/lib/downloads"
import { useState } from "react"

interface DownloadModalProps {
    isOpen: boolean;
    onClose: () => void;
    platform: Platform;
}

export function DownloadModal({ isOpen, onClose, platform }: DownloadModalProps) {
    const [showGuide, setShowGuide] = useState(false);
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

    const getSafeGuide = () => {
        if (platform === 'windows') {
            return (
                <div className="text-[11px] text-white/70 leading-relaxed text-left space-y-2 p-3 bg-white/5 rounded-xl border border-white/10">
                    <p className="font-bold text-primary flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Bypass SmartScreen:</p>
                    <p>If Windows flags the app as "unsafe", click <span className="text-white font-bold italic">"More info"</span> and then <span className="text-white font-bold italic">"Run anyway"</span>. Scriptora is safe but lacks an expensive EV certificate.</p>
                </div>
            )
        }
        if (platform === 'macos') {
            return (
                <div className="text-[11px] text-white/70 leading-relaxed text-left space-y-2 p-3 bg-white/5 rounded-xl border border-white/10">
                    <p className="font-bold text-purple-400 flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Bypass Gatekeeper:</p>
                    <p>Right-click the app and select <span className="text-white font-bold italic">"Open"</span>. If it still won't run, use Terminal: <code className="bg-black/50 px-1 rounded">sudo xattr -rd com.apple.quarantine /Applications/Scriptora.app</code></p>
                </div>
            )
        }
        return null;
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6 overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 30 }}
                        className="w-full max-w-lg relative pointer-events-auto"
                    >
                        <GlassCard className="p-0 border-primary/30 shadow-2xl bg-[#0F0819]/90 relative overflow-hidden">
                            {/* Decorative background glow */}
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-[80px]" />

                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full z-20"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Header - Fixed */}
                            <div className="flex flex-col items-center text-center p-8 pb-0 relative z-10">
                                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4 border border-white/10">
                                    {getIcon()}
                                </div>
                                <h3 className="text-3xl font-heading font-bold text-white mb-2">{getTitle()}</h3>
                                <p className="text-sm text-muted-foreground pb-6">Select the version that matches your system configuration.</p>
                            </div>

                            {/* Scrollable Content */}
                            <div className="px-8 pb-8 max-h-[60vh] overflow-y-auto relative z-10 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                <div className="space-y-3">
                                    {versions.map((v: any, i: number) => (
                                        <motion.a
                                            key={i}
                                            href={v.link}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className={`flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 transition-all group ${v.type === 'Update' ? 'hover:border-purple-500/50 hover:bg-purple-500/5' : 'hover:border-primary/50 hover:bg-primary/5'}`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${v.type === 'Update' ? 'bg-purple-500/10 text-purple-400' : 'bg-primary/10 text-primary'}`}>
                                                    <Download className="w-5 h-5" />
                                                </div>
                                                <div className="text-left">
                                                    <div className={`text-sm font-bold text-white transition-colors ${v.type === 'Update' ? 'group-hover:text-purple-400' : 'group-hover:text-primary'}`}>{v.label}</div>
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        <span className={`text-[9px] uppercase tracking-widest font-bold px-1.5 py-0.5 rounded-md ${v.type === 'Update' ? 'bg-purple-500/20 text-purple-400' : 'bg-primary/20 text-primary-foreground/70 text-primary'}`}>{v.type}</span>
                                                        <span className="text-[10px] text-white/40 font-medium">v{v.version}</span>
                                                        <span className="text-[10px] text-white/20">•</span>
                                                        <span className="text-[10px] text-white/40 font-medium">{v.size}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <MousePointer2 className={`w-4 h-4 transition-all group-hover:translate-x-1 ${v.type === 'Update' ? 'text-white/20 group-hover:text-purple-400' : 'text-white/20 group-hover:text-primary'}`} />
                                        </motion.a>
                                    ))}
                                </div>

                                {/* Trust Badge and Safe Guide */}
                                <div className="mt-6 pt-6 border-t border-white/5">
                                    <button
                                        onClick={() => setShowGuide(!showGuide)}
                                        className="w-full flex items-center justify-between p-3 rounded-xl bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors group"
                                    >
                                        <div className="flex items-center gap-2">
                                            <ShieldCheck className="w-4 h-4 text-primary" />
                                            <span className="text-xs font-bold text-white/80">Safe Installation Guide</span>
                                        </div>
                                        {showGuide ? <ChevronUp className="w-4 h-4 text-white/40" /> : <ChevronDown className="w-4 h-4 text-white/40" />}
                                    </button>

                                    <AnimatePresence>
                                        {showGuide && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="mt-3">
                                                    {getSafeGuide()}
                                                    <p className="mt-3 text-[10px] text-muted-foreground flex items-center gap-1">
                                                        <AlertCircle className="w-3 h-3" />
                                                        Scriptora is 100% Malware-Free. We are currently applying for official OS verification.
                                                    </p>
                                                    <div className="mt-3 p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                                                        <p className="text-[10px] text-purple-300 font-bold flex items-center gap-1.5 uppercase tracking-wider">
                                                            <AlertCircle className="w-3 h-3" /> Important Note:
                                                        </p>
                                                        <p className="text-[10px] text-purple-200/70 mt-1 leading-relaxed">
                                                            The app does not support auto-updates yet. You <strong>must install the Base version first</strong> before applying the Update Patch.
                                                        </p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className="mt-6 text-center">
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                                        Not on {platform}?
                                        <button
                                            onClick={() => {/* Show all functionality could be improved later */ }}
                                            className="text-primary hover:underline font-bold"
                                        >
                                            Show all systems
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
