import { Check, X } from "lucide-react"

const comparison = [
    { feature: "Formatting", manual: "Manual & Painful", auto: "Auto-structured", better: true },
    { feature: "Citations", manual: "Manual Entry", auto: "AI Citation Engine", better: true },
    { feature: "Layout", manual: "Breaks Easily", auto: "Live Preview", better: true },
    { feature: "TOC", manual: "Manual Update", auto: "Auto Generated", better: true },
]

export function ComparisonSection() {
    return (
        <section className="py-24">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-heading font-bold text-center mb-16">Stop Fighting Word</h2>
                <div className="max-w-3xl mx-auto rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm">
                    <div className="grid grid-cols-3 p-6 border-b border-white/10 bg-white/5 font-bold">
                        <div>Feature</div>
                        <div className="text-muted-foreground text-center">Manual Writing</div>
                        <div className="text-primary text-center">Scriptora</div>
                    </div>
                    {comparison.map((c, i) => (
                        <div key={i} className="grid grid-cols-3 p-6 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors items-center">
                            <div className="font-medium text-sm md:text-base">{c.feature}</div>
                            <div className="text-center text-muted-foreground text-sm flex flex-col md:flex-row items-center justify-center gap-2">
                                <X className="w-4 h-4 text-red-500" /> <span className="hidden md:inline">{c.manual}</span>
                            </div>
                            <div className="text-center text-white text-sm flex flex-col md:flex-row items-center justify-center gap-2 font-bold shadow-[0_0_20px_rgba(138,46,255,0.0)]">
                                <Check className="w-4 h-4 text-primary" /> <span className="hidden md:inline">{c.auto}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
