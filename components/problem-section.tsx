"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { FileWarning, BookX, LayoutTemplate, RefreshCcw, AlertTriangle } from "lucide-react"
import { motion } from "framer-motion"

const problems = [
    { icon: FileWarning, title: "Formatting rules everywhere", desc: "APA, MLA, Chicago... keeping track of margin, font, and spacing rules across different universities is a nightmare nobody signed up for." },
    { icon: BookX, title: "Citations done manually", desc: "One wrong comma, a missing year, or a misplaced period — and your grade suffers. Manual citations are a ticking time bomb." },
    { icon: LayoutTemplate, title: "Layout breaks when exported", desc: "Perfect on screen, completely broken in PDF. Page numbers reset, images shift, and your TOC becomes fiction." },
    { icon: RefreshCcw, title: "Revisions ruin structure", desc: "Moving a single chapter breaks all your auto-numbering, figure references, and cross-links. Hours of fixing for minutes of editing." },
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
}

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6 }
    }
}

export function ProblemSection() {
    return (
        <section className="py-28 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-500/5 rounded-full blur-[150px] -z-10" />

            <div className="container px-4 mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center rounded-full border border-red-500/20 bg-red-500/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-red-400 mb-6">
                        <AlertTriangle className="w-3 h-3 mr-2" />
                        The Pain Point
                    </div>
                    <h2 className="text-3xl md:text-5xl font-heading font-bold">
                        Writing Academic Papers Shouldn't <br /> Feel Like <span className="text-red-400">Fighting Microsoft Word</span>
                    </h2>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {problems.map((p, i) => (
                        <motion.div key={i} variants={cardVariants}>
                            <GlassCard className="h-full hover:bg-red-500/[0.03] hover:border-red-500/20 transition-all duration-500 group p-6">
                                <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(239,68,68,0.2)] transition-all duration-500 border border-red-500/10">
                                    <p.icon className="w-7 h-7 text-red-400" />
                                </div>
                                <h3 className="text-lg font-bold mb-3">{p.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                            </GlassCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
