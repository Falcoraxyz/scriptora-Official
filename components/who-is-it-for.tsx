"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { GraduationCap, BookOpen, School, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

const audiences = [
    {
        icon: GraduationCap,
        title: "Students",
        desc: "Focus on your thesis, not the formatting. Scriptora auto-applies university rules so you can submit with confidence and get that A+.",
        stat: "For S1 & S2"
    },
    {
        icon: BookOpen,
        title: "Researchers",
        desc: "Manage hundreds of citations effortlessly. Import from DOI, validate with 6 layers, and export to APA or IEEE format instantly.",
        stat: "APA & IEEE"
    },
    {
        icon: School,
        title: "Lecturers",
        desc: "Standardize student submissions. Use compliance checker to verify formatting rules and structure in seconds, not hours.",
        stat: "Auto-check"
    }
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
}

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 }
    }
}

export function WhoIsItFor() {
    return (
        <section className="py-28 container mx-auto px-4">
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-6">
                    <Sparkles className="w-3 h-3 mr-2" />
                    Built for Academia
                </div>
                <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tight">
                    Who Is <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8A2EFF] to-[#B57CFF]">Scriptora</span> For?
                </h2>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid md:grid-cols-3 gap-8"
            >
                {audiences.map((a, i) => (
                    <motion.div key={i} variants={cardVariants}>
                        <GlassCard className="text-center group hover:border-primary/20 hover:shadow-[0_0_50px_rgba(138,46,255,0.08)] transition-all duration-500 h-full p-8">
                            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(138,46,255,0.2)] transition-all duration-500 border border-primary/20">
                                <a.icon className="w-8 h-8 text-primary" />
                            </div>
                            <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary/50 mb-3">{a.stat}</div>
                            <h3 className="text-xl font-bold mb-3">{a.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
                        </GlassCard>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    )
}
