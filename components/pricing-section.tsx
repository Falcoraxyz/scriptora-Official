"use client"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { Check, Download, ArrowRight, X, Mail, Key, Upload, Camera, QrCode } from "lucide-react"
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

    const [selectedWaNumber, setSelectedWaNumber] = useState<string>("");
    const [waNumbersList, setWaNumbersList] = useState<string[]>([]);
    const [step, setStep] = useState(1);
    const [receipt, setReceipt] = useState<File | null>(null);
    const [receiptPreview, setReceiptPreview] = useState<string | null>(null);

    useEffect(() => {
        setPlatform(detectPlatform());

        const waEnv = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281958860338";
        const list = waEnv.split(',').map(n => n.trim()).filter(n => n.endsWith('338')).slice(0, 1);
        setWaNumbersList(list);
        if (list.length > 0) setSelectedWaNumber(list[0]);
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
        setStep(2);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setReceipt(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setReceiptPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFinalizePayment = async () => {
        setLoading(true);
        try {
            const refId = getStoredReferral();
            const affiliateId = refId ? await getAffiliateIdFromRef(refId) : 'direct';

            const waNumber = selectedWaNumber || waNumbersList[0] || "6281958860338";
            const message = `Halo Admin Scriptora! Saya ingin aktivasi Pro License.

Email: ${customerEmail}
Device Key: ${deviceKey}
Referral ID: ${refId || 'direct'}
Affiliate ID: ${affiliateId}

[SAYA SUDAH BAYAR & AKAN MELAMPIRKAN BUKTI DI CHAT INI]

Mohon instruksi untuk selanjutnya.`;

            const encodedMessage = encodeURIComponent(message);
            const waUrl = `https://wa.me/${waNumber}?text=${encodedMessage}`;

            // Track potential sale before redirecting
            await fetch('/api/checkout/manual', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: customerEmail,
                    deviceKey: deviceKey,
                    refId: refId || 'direct',
                    affiliateId: affiliateId
                })
            }).catch(err => console.error("Tracking error:", err));

            window.open(waUrl, '_blank');
            setShowModal(false);
            setStep(1);
            setReceipt(null);
            setReceiptPreview(null);
        } catch (error) {
            console.error('[Pricing] WhatsApp Redirect Error:', error);
            alert("Gagal menghubungkan ke WhatsApp. Silakan coba lagi.");
        } finally {
            setLoading(false);
        }
    };

    // Helper to resolve refId to affiliate UUID
    const getAffiliateIdFromRef = async (ref: string) => {
        const { data } = await fetch(`/api/affiliate/${ref}`).then(res => res.json()).catch(() => ({ data: null }));
        return data?.id || null;
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8 }
        }
    };

    return (
        <section id="pricing" className="py-24 container mx-auto px-4 relative">
            <div className="max-w-2xl mx-auto text-center mb-16 space-y-4">
                <h2 className="text-4xl font-heading font-bold">Simple, Transparent Pricing</h2>
                <p className="text-muted-foreground text-lg text-balance">
                    Download and start writing for free. Pay once when you are ready to export your final version.
                </p>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto relative mb-20"
            >
                {plans.map((p, i) => (
                    <motion.div key={i} variants={cardVariants}>
                        <GlassCard className={cn(
                            "flex flex-col h-full relative p-8 transition-all duration-500 hover:shadow-[0_0_80px_rgba(138,46,255,0.15)]",
                            p.popular ? "border-primary/50 bg-[#140A1F]/80 shadow-[0_0_50px_rgba(138,46,255,0.1)]" : "border-white/10"
                        )}>
                            {p.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-black text-center bg-primary text-white py-1.5 px-8 rounded-full border border-primary/50 uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(138,46,255,0.4)] animate-pulse">
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
                    </motion.div>
                ))}
            </motion.div>

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

                                <AnimatePresence mode="wait">
                                    {step === 1 ? (
                                        <motion.form
                                            key="step1"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            onSubmit={processCheckout}
                                            className="space-y-6"
                                        >
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

                                            {waNumbersList.length > 1 && (
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold uppercase tracking-wider text-primary/80">Pilih Jalur Support</label>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        {waNumbersList.map((num, idx) => (
                                                            <button
                                                                key={idx}
                                                                type="button"
                                                                onClick={() => setSelectedWaNumber(num)}
                                                                className={cn(
                                                                    "py-2 px-3 rounded-xl border text-[10px] font-bold transition-all",
                                                                    selectedWaNumber === num
                                                                        ? "bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(138,46,255,0.2)]"
                                                                        : "bg-white/[0.03] border-white/10 text-white/40 hover:border-white/20"
                                                                )}
                                                            >
                                                                Support Admin {idx + 1}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            <Button
                                                type="submit"
                                                variant="glow"
                                                className="w-full py-6 rounded-xl text-lg group font-bold"
                                            >
                                                Lanjut ke Pembayaran
                                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </Button>
                                        </motion.form>
                                    ) : (
                                        <motion.div
                                            key="step2"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-6"
                                        >
                                            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                                                        <QrCode className="w-4 h-4 text-primary" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold uppercase tracking-widest text-primary">Scan QRIS</p>
                                                        <p className="text-[10px] text-muted-foreground uppercase">GOPAY / OVO / DANA / MOBILE BANKING</p>
                                                    </div>
                                                </div>
                                                <div className="aspect-square w-full max-w-[200px] mx-auto bg-white rounded-xl p-2 mb-4">
                                                    <img src="/qris.png" alt="QRIS Scriptora" className="w-full h-full object-contain" />
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-xs text-muted-foreground mb-1">Total Bayar</p>
                                                    <p className="text-2xl font-bold text-white">Rp 249.000</p>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <label className="text-xs font-bold uppercase tracking-wider text-primary/80">Upload Bukti Bayar</label>
                                                <div className="relative">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleFileChange}
                                                        className="hidden"
                                                        id="receipt-upload"
                                                    />
                                                    <label
                                                        htmlFor="receipt-upload"
                                                        className="flex flex-col items-center justify-center w-full aspect-video rounded-xl border-2 border-dashed border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-primary/50 transition-all cursor-pointer overflow-hidden group"
                                                    >
                                                        {receiptPreview ? (
                                                            <img src={receiptPreview} alt="Receipt Preview" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="flex flex-col items-center gap-2">
                                                                <Camera className="w-8 h-8 text-white/20 group-hover:text-primary transition-colors" />
                                                                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Pilih Gambar</span>
                                                            </div>
                                                        )}
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <Button
                                                    onClick={handleFinalizePayment}
                                                    variant="glow"
                                                    className="w-full py-6 rounded-xl text-lg group font-bold"
                                                    disabled={loading || !receipt}
                                                >
                                                    {loading ? "Memproses..." : (
                                                        <>
                                                            Kirim ke WhatsApp
                                                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                        </>
                                                    )}
                                                </Button>
                                                <button
                                                    onClick={() => setStep(1)}
                                                    className="w-full text-xs text-muted-foreground hover:text-white transition-colors"
                                                >
                                                    &larr; Kembali ke Data Diri
                                                </button>
                                                <p className="text-[9px] text-center text-muted-foreground leading-relaxed italic">
                                                    *Pastikan Anda melampirkan foto bukti transfer secara manual di chat WhatsApp setelah klik tombol di atas.
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
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
