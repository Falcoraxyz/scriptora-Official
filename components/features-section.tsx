import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Bot, Quote, Eye, ListTree, Image as ImageIcon, Sparkles, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const features = [
    {
        title: "Integrated AI Research Hub",
        desc: "Stop tab-switching. Search scientific papers across Perplexity, Consensus, Elicit, and Google Scholar in a unified workspace designed for academic rigor.",
        icon: Bot,
        image: "/screenshots/AI Dashboard.png"
    },
    {
        title: "Smart Citation Engine",
        desc: "Mendeley-level intelligence. Search and insert citations with APA 7 or IEEE standards instantly. Scriptora handles the formatting so you can focus on the content.",
        icon: ListTree,
        image: "/screenshots/UI Citation.png"
    },
    {
        title: "Live Academic Preview",
        desc: "See your thesis as it will appear in print. Real-time rendering with 4-4-3-3 margins, Times New Roman 12pt, and perfect line spacing built into the core.",
        icon: Eye,
        image: "/screenshots/halaman Live Document Preview.png"
    },
    {
        title: "Premium DOCX Pipeline",
        desc: "The only IDE that exports a 'Ready to Submit' DOCX. Automatic Table of Contents, List of Figures, and Roman numeral sectioning with one click.",
        icon: Quote,
        image: "/screenshots/Halaman Export.png"
    },
    {
        title: "Smart Asset Management",
        desc: "Centralized management for Figures, Tables, and Equations. Drag, drop, and auto-number your assets while maintaining strict academic labeling standards.",
        icon: ImageIcon,
        image: "/screenshots/UI insert Gambar.png"
    }
]

export function FeaturesSection() {
    return (
        <section id="features" className="py-32 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 -z-10" />

            <div className="container px-4 mx-auto space-y-40">
                {features.map((f, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-150px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className={cn(
                            "flex flex-col md:flex-row gap-16 items-center",
                            i % 2 === 1 ? 'md:flex-row-reverse' : ''
                        )}
                    >
                        <div className="flex-1 space-y-8">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-[0_0_40px_rgba(138,46,255,0.2)] group-hover:shadow-[0_0_60px_rgba(138,46,255,0.4)] transition-all duration-500"
                            >
                                <f.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                            </motion.div>

                            <div className="space-y-4">
                                <h3 className="text-4xl md:text-5xl font-heading font-black tracking-tighter flex items-center gap-4">
                                    {f.title}
                                    {f.title.includes("DOCX") && (
                                        <span className="text-[10px] bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full uppercase tracking-[0.2em] font-black shadow-[0_0_20px_rgba(138,46,255,0.3)]">PRO</span>
                                    )}
                                </h3>
                                <p className="text-xl text-muted-foreground/80 leading-relaxed font-medium max-w-xl">
                                    {f.desc}
                                </p>
                            </div>

                            <Button variant="ghost" className="rounded-full border border-white/5 hover:bg-primary/5 hover:border-primary/20 transition-all text-xs uppercase tracking-widest font-bold px-6 h-10 group">
                                Learn More <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>

                        <div className="flex-1 w-full relative">
                            <GlassCard className="aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-white/[0.05] via-transparent to-primary/[0.02] relative overflow-hidden group border-white/10 p-2 shadow-2xl">
                                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl" />
                                <div className="relative z-10 w-full flex justify-center p-2 md:p-6 transition-transform duration-700 group-hover:scale-[1.02] group-hover:-rotate-1">
                                    <img
                                        src={f.image}
                                        alt={f.title}
                                        className="rounded-xl shadow-2xl border border-white/10 group-hover:border-primary/30 transition-all duration-700"
                                    />
                                </div>
                                <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full p-2">
                                        <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                                    </div>
                                </div>
                            </GlassCard>
                            {/* Decorative Glow */}
                            <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
