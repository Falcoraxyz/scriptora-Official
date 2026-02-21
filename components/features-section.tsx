import { GlassCard } from "@/components/ui/glass-card"
import { Bot, Quote, Eye, ListTree, Image as ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

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
        <section id="features" className="py-24 relative">
            <div className="container px-4 mx-auto space-y-32">
                {features.map((f, i) => (
                    <div key={i} className={cn("flex flex-col md:flex-row gap-12 items-center", i % 2 === 1 ? 'md:flex-row-reverse' : '')}>
                        <div className="flex-1 space-y-6">
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-[0_0_30px_rgba(138,46,255,0.15)]">
                                <f.icon className="w-7 h-7 text-primary" />
                            </div>
                            <h3 className="text-3xl font-heading font-bold flex items-center gap-3">
                                {f.title}
                                {f.title.includes("DOCX") && (
                                    <span className="text-[10px] bg-primary/20 text-primary border border-primary/30 px-2 py-0.5 rounded-full uppercase tracking-widest font-bold">PRO</span>
                                )}
                            </h3>
                            <p className="text-lg text-muted-foreground leading-relaxed">{f.desc}</p>
                        </div>
                        <div className="flex-1 w-full">
                            <GlassCard className="aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent relative overflow-hidden group">
                                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative z-10 w-full flex justify-center p-4">
                                    <img
                                        src={f.image}
                                        alt={f.title}
                                        className="rounded-lg shadow-2xl border border-white/10 group-hover:scale-[1.05] transition-transform duration-700"
                                    />
                                </div>
                            </GlassCard>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
