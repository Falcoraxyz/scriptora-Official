import { GlassCard } from "@/components/ui/glass-card"
import { FileWarning, BookX, LayoutTemplate, RefreshCcw } from "lucide-react"

const problems = [
    { icon: FileWarning, title: "Formatting rules everywhere", desc: "APA, MLA, Chicago... keeping track is a nightmare." },
    { icon: BookX, title: "Citations done manually", desc: "One wrong comma and your grade suffers." },
    { icon: LayoutTemplate, title: "Layout breaks when exported", desc: "Perfect on screen, broken in PDF?" },
    { icon: RefreshCcw, title: "Revisions ruin structure", desc: "Moving a chapter breaks all your numbering." },
]

export function ProblemSection() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container px-4 mx-auto">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-16">
                    Writing Academic Papers Shouldn’t <br /> Feel Like <span className="text-red-400">Fighting Microsoft Word</span>
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {problems.map((p, i) => (
                        <GlassCard key={i} className="hover:bg-red-500/5 hover:border-red-500/20 transition-colors group">
                            <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <p.icon className="w-6 h-6 text-red-400" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    )
}
