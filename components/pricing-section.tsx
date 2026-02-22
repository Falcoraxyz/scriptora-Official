"use client"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { Check, Download, ArrowRight, X, Mail, Key } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { detectPlatform, getDownloadUrl, Platform, DOWNLOAD_LINKS } from "@/lib/downloads"
import { getStoredReferral } from "@/lib/referral"
import { motion, AnimatePresence } from "framer-motion"
import { DownloadModal } from "./download-modal"

const plans = [
    {
        name: "Starter",
        price: "0",
        currency: "IDR",
        desc: "Trial all writing features",
        features: ["Full AI Writing Assistant", "Smart Citation Engine", "Live Layout Preview", "Unlimited Drafts", "No Exporting (DOCX/PDF)"],
        btn: "Try for Free",
        action: "download",
        popular: false
    },
    {
        name: "Pro License",
        price: "249K",
        originalPrice: "499K",
        currency: "IDR",
        desc: "For serious researchers",
        features: ["Everything in Starter", "Unlimited DOCX Exports", "Professional PDF Outputs", "Automatic Table of Contents", "PUEBI Formatting Guard"],
        btn: "Get License Now",
        action: "contact",
        popular: true
    }
]

declare global {
    interface Window {
        snap: any;
    }
}

export function PricingSection() {
    const [platform, setPlatform] = useState<Platform>('unknown');
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showDownloadModal, setShowDownloadModal] = useState(false);
    const [customerEmail, setCustomerEmail] = useState("");
    const [deviceKey, setDeviceKey] = useState("");

    useEffect(() => {
        setPlatform(detectPlatform());
    }, []);

    const handleAction = (action: string) => {
        if (action === "download") {
            setShowDownloadModal(true);
            return;
        }
        setShowModal(true);
    };

    const processCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!customerEmail || !deviceKey) {
            alert("Harap isi Email dan Device Key Anda.");
            return;
        }

        setLoading(true);
        try {
            const refId = getStoredReferral();

            // 1. Get Snap Token from our API
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: 249000,
                    refId: refId || 'direct',
                    affiliateId: refId ? await getAffiliateIdFromRef(refId) : null,
                    email: customerEmail,
                    deviceKey: deviceKey
                })
            });

            const data = await response.json();
            const token = data.token;

            if (!token) {
                console.error('[Pricing] No token received:', data);
                alert("Gagal mendapatkan kode pembayaran. Pastikan Server Key & Client Key di .env.local sudah benar.");
                return;
            }

            // 2. Open Snap Popup
            if (window.snap) {
                setShowModal(false);
                window.snap.pay(token, {
                    onSuccess: (result: any) => {
                        console.log('Payment Success:', result);
                        alert("Pembayaran Berhasil! Lisensi akan dikirim ke email: " + customerEmail);
                    },
                    onPending: (result: any) => {
                        console.log('Payment Pending:', result);
                        alert("Menunggu pembayaran...");
                    },
                    onError: (result: any) => {
                        console.error('Payment Error:', result);
                        alert("Terjadi kesalahan pada pembayaran.");
                    },
                    onClose: () => {
                        console.log('Snap Popup Closed');
                    }
                });
            }
        } catch (error) {
            console.error('[Pricing] Checkout Error:', error);
            alert("Gagal memproses pembayaran. Silakan coba lagi.");
        } finally {
            setLoading(false);
        }
    };

    // Helper to resolve refId to affiliate UUID
    const getAffiliateIdFromRef = async (ref: string) => {
        const { data } = await fetch(`/api/affiliate/${ref}`).then(res => res.json()).catch(() => ({ data: null }));
        return data?.id || null;
    };

    return (
        <section id="pricing" className="py-24 container mx-auto px-4 relative">
            <div className="max-w-2xl mx-auto text-center mb-16 space-y-4">
                <h2 className="text-4xl font-heading font-bold">Simple, Transparent Pricing</h2>
                <p className="text-muted-foreground text-lg text-balance">
                    Download and start writing for free. Pay once when you are ready to export your final version.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto relative mb-20">
                {plans.map((p, i) => (
                    <div key={i} className="relative group">
                        {p.popular && (
                            <div className="absolute inset-0 bg-primary/20 blur-[100px] -z-10 rounded-full" />
                        )}
                        <GlassCard className={cn(
                            "flex flex-col h-full relative p-8 transition-transform hover:scale-[1.02]",
                            p.popular ? "border-primary/50 bg-[#140A1F]/80 shadow-[0_0_50px_rgba(138,46,255,0.1)]" : "border-white/10"
                        )}>
                            {p.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold text-center bg-primary text-white py-1 px-6 rounded-full border border-primary/50 uppercase tracking-widest">
                                    Flash Sale - 50% OFF
                                </div>
                            )}

                            <div className="text-center mb-8 pt-4">
                                <h3 className="text-2xl font-bold mb-2">{p.name}</h3>
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    {p.originalPrice && (
                                        <span className="text-xl text-muted-foreground line-through opacity-50">{p.originalPrice}</span>
                                    )}
                                    <div className="text-5xl font-heading font-bold text-white flex items-baseline">
                                        <span className="text-sm font-sans mr-1">{p.currency}</span>
                                        {p.price}
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground">{p.desc}</p>
                            </div>

                            <div className="space-y-4 mb-8 flex-1">
                                {p.features.map((f, j) => (
                                    <div key={j} className="flex items-center gap-3 text-sm text-white/80">
                                        <div className={cn(
                                            "h-5 w-5 rounded-full flex items-center justify-center shrink-0",
                                            f.includes("No Exporting") ? "bg-red-500/10" : "bg-primary/20"
                                        )}>
                                            {f.includes("No Exporting") ? (
                                                <span className="text-red-500 font-bold text-[10px]">✕</span>
                                            ) : (
                                                <Check className="w-3 h-3 text-primary shrink-0" />
                                            )}
                                        </div>
                                        {f}
                                    </div>
                                ))}
                            </div>

                            <Button
                                variant={p.popular ? "glow" : "outline"}
                                size="lg"
                                className="w-full rounded-full"
                                onClick={() => handleAction(p.action)}
                            >
                                {p.action === "contact" ? <ArrowRight className="mr-2 h-4 w-4" /> : <Download className="mr-2 h-4 w-4" />}
                                {p.btn}
                            </Button>

                            <div className="flex justify-center gap-4 mt-4 text-[9px] uppercase tracking-wider font-bold text-muted-foreground/60">
                                <button onClick={() => { setPlatform('windows'); setShowDownloadModal(true); }} className="hover:text-primary transition-colors">Win</button>
                                <button onClick={() => { setPlatform('macos'); setShowDownloadModal(true); }} className="hover:text-primary transition-colors">Mac</button>
                                <button onClick={() => { setPlatform('linux'); setShowDownloadModal(true); }} className="hover:text-primary transition-colors">Linux</button>
                            </div>
                        </GlassCard>
                    </div>
                ))}
            </div>

            {/* Manual Activation Guide */}
            <div className="max-w-3xl mx-auto">
                <GlassCard className="p-8 border-white/5 bg-white/[0.02]">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <span className="flex h-6 w-6 rounded-full bg-primary/20 text-primary items-center justify-center text-xs">?</span>
                        How to Activate Pro License
                    </h3>
                    <div className="grid sm:grid-cols-3 gap-8 relative">
                        <div className="space-y-3">
                            <div className="text-primary font-bold text-2xl opacity-20">01</div>
                            <p className="text-sm font-medium text-white/90">Install & Open App</p>
                            <p className="text-xs text-muted-foreground">Download Scriptora for your system and launch the application.</p>
                        </div>
                        <div className="space-y-3">
                            <div className="text-primary font-bold text-2xl opacity-20">02</div>
                            <p className="text-sm font-medium text-white/90">Copy Device Key</p>
                            <p className="text-xs text-muted-foreground">Go to <strong>Output</strong> section, click <strong>"Free"</strong>, and copy your Public Device Key.</p>
                        </div>
                        <div className="space-y-3">
                            <div className="text-primary font-bold text-2xl opacity-20">03</div>
                            <p className="text-sm font-medium text-white/90">Send for License</p>
                            <p className="text-xs text-muted-foreground">Enter your key in the form above and pay to receive your automated license.</p>
                        </div>
                    </div>
                </GlassCard>
            </div>

            {/* Checkout Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowModal(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-md z-10"
                        >
                            <GlassCard className="p-8 border-primary/30 shadow-2xl bg-[#0F0819]">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold text-white mb-2">Aktivasi Pro License</h3>
                                    <p className="text-sm text-muted-foreground">Silakan isi data berikut untuk menerima lisensi otomatis.</p>
                                </div>

                                <form onSubmit={processCheckout} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-primary/80">Email Penerima</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                            <input
                                                required
                                                type="email"
                                                placeholder="nama@email.com"
                                                value={customerEmail}
                                                onChange={(e) => setCustomerEmail(e.target.value)}
                                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all placeholder:text-white/20"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-primary/80">Public Device Key</label>
                                        <div className="relative">
                                            <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                            <input
                                                required
                                                type="text"
                                                placeholder="Copy dari aplikasi Scriptora"
                                                value={deviceKey}
                                                onChange={(e) => setDeviceKey(e.target.value)}
                                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all placeholder:text-white/20"
                                            />
                                        </div>
                                        <p className="text-[10px] text-muted-foreground leading-relaxed">
                                            *Dapatkan di aplikasi: <strong>Output &rarr; Free &rarr; Copy Public Key</strong>
                                        </p>
                                    </div>

                                    <Button
                                        type="submit"
                                        variant="glow"
                                        className="w-full py-6 rounded-xl text-lg group font-bold"
                                        disabled={loading}
                                    >
                                        {loading ? "Memproses..." : (
                                            <>
                                                Bayar Sekarang (Rp 249K)
                                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </GlassCard>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            <DownloadModal
                isOpen={showDownloadModal}
                onClose={() => setShowDownloadModal(false)}
                platform={platform}
            />
        </section>
    )
}
