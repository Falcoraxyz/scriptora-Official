import { GlassCard } from "@/components/ui/glass-card"

const steps = [
    { title: "Write your content", desc: "Focus on your research. We handle the formatting." },
    { title: "Insert citations & tables", desc: "Just paste a link or upload an image." },
    { title: "Preview the formatted document", desc: "See exactly how it looks in the final DOCX." },
    { title: "Export perfectly formatted DOCX", desc: "Ready for submission in one click." }
]

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 relative">
            <div className="container px-4 mx-auto">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-16">How It Works</h2>
                <div className="max-w-4xl mx-auto space-y-8 relative">
                    {/* Vertical Line */}
                    <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent md:left-1/2 md:-ml-px" />

                    {steps.map((s, i) => (
                        <div key={i} className={`relative flex items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                            {/* Number Bubble */}
                            <div className="absolute left-0 w-10 h-10 rounded-full bg-primary border-4 border-black flex items-center justify-center font-bold text-white z-10 md:left-1/2 md:-translate-x-1/2">
                                {i + 1}
                            </div>

                            {/* Spacer for desktop alignment */}
                            <div className="hidden md:block flex-1" />

                            {/* Card */}
                            <div className="flex-1 pl-12 md:pl-0">
                                <GlassCard className="p-6 relative group hover:border-primary/40 transition-colors">
                                    <h3 className="text-xl font-bold mb-2 text-primary-purple group-hover:text-glow-purple transition-colors">{s.title}</h3>
                                    <p className="text-muted-foreground">{s.desc}</p>
                                </GlassCard>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
