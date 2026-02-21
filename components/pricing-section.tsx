"use client"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { Check, Download, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { detectPlatform, getDownloadUrl, Platform, DOWNLOAD_LINKS } from "@/lib/downloads"

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
        btn: "Chat for Activation",
        action: "contact",
        popular: true
    }
]

export function PricingSection() {
    const [platform, setPlatform] = useState<Platform>('unknown');

    useEffect(() => {
        setPlatform(detectPlatform());
    }, []);

    const handleAction = (action: string) => {
        if (action === "download") {
            const url = getDownloadUrl(platform);
            window.location.href = url;
        } else {
            // Updated WhatsApp link with specific activation request
            window.open("https://wa.me/621958860338?text=Halo%20Scriptora,%20saya%20ingin%20aktivasi%20Pro%20License.%20Ini%20Device%20Key%20saya:", "_blank");
        }
    };

    return (
        <section id="pricing" className="py-24 container mx-auto px-4">
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
                                <a href={DOWNLOAD_LINKS.windows} className="hover:text-primary transition-colors">Win</a>
                                <a href={DOWNLOAD_LINKS.macos_arm} className="hover:text-primary transition-colors">Mac</a>
                                <a href={DOWNLOAD_LINKS.linux_deb} className="hover:text-primary transition-colors">Linux</a>
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
                            <p className="text-xs text-muted-foreground">Click <strong>"Chat for Activation"</strong> to send your key and receive your Pro License code.</p>
                        </div>
                    </div>
                </GlassCard>
            </div>
        </section>
    )
}
