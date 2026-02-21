import { GlassCard } from "@/components/ui/glass-card"
import { GraduationCap, BookOpen, School } from "lucide-react"

const audiences = [
    { icon: GraduationCap, title: "Students", desc: "Focus on your thesis, not the formatting. Get that A+." },
    { icon: BookOpen, title: "Researchers", desc: "Manage thousands of citations effortlessly. Export to any journal format." },
    { icon: School, title: "Lecturers", desc: "Standardize student submissions. Check structure instantly." }
]

export function WhoIsItFor() {
    return (
        <section className="py-24 container mx-auto px-4">
            <h2 className="text-3xl font-heading font-bold text-center mb-16">Built for Academia</h2>
            <div className="grid md:grid-cols-3 gap-6">
                {audiences.map((a, i) => (
                    <GlassCard key={i} className="text-center group hover:bg-white/10">
                        <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-primary/20">
                            <a.icon className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{a.title}</h3>
                        <p className="text-muted-foreground">{a.desc}</p>
                    </GlassCard>
                ))}
            </div>
        </section>
    )
}
