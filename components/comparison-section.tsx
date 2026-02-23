"use client"

import { Check, X, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

const comparison = [
    { feature: "Formatting", manual: "Manual & Painful", auto: "Auto-structured" },
    { feature: "Citations", manual: "Manual Entry", auto: "AI Citation Engine" },
    { feature: "Layout", manual: "Breaks Easily", auto: "Live Preview" },
    { feature: "TOC", manual: "Manual Update", auto: "Auto Generated" },
    { feature: "Page Numbers", manual: "One Format Only", auto: "5-Zone System" },
    { feature: "Assets", manual: "Manual Numbering", auto: "Auto-numbered" },
    { feature: "Export", manual: "Copy-paste Nightmare", auto: "One-click DOCX" },
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.06 }
    }
}

const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.4 }
    }
}

export function ComparisonSection() {
    return (
        <section className="py-28">
            <div className="container mx-auto px-4">
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
                        Scriptora vs Manual
                    </div>
                    <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tight">
                        Stop Fighting <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-500">Word.</span>
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-sm shadow-[0_0_60px_rgba(138,46,255,0.05)]"
                >
                    {/* Table Header */}
                    <div className="grid grid-cols-3 p-6 border-b border-white/10 bg-white/[0.03]">
                        <div className="font-bold text-sm uppercase tracking-wider text-muted-foreground/60">Feature</div>
                        <div className="text-center font-bold text-sm uppercase tracking-wider text-red-400/60">Manual</div>
                        <div className="text-center font-bold text-sm uppercase tracking-wider text-primary">Scriptora</div>
                    </div>

                    {/* Table Rows */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {comparison.map((c, i) => (
                            <motion.div
                                key={i}
                                variants={rowVariants}
                                className="grid grid-cols-3 p-5 border-b border-white/5 last:border-0 hover:bg-primary/[0.03] transition-all duration-300 items-center group"
                            >
                                <div className="font-medium text-sm">{c.feature}</div>
                                <div className="text-center text-muted-foreground text-sm flex flex-col md:flex-row items-center justify-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                                        <X className="w-3 h-3 text-red-500" />
                                    </div>
                                    <span className="hidden md:inline text-xs">{c.manual}</span>
                                </div>
                                <div className="text-center text-white text-sm flex flex-col md:flex-row items-center justify-center gap-2 font-semibold">
                                    <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0 group-hover:shadow-[0_0_12px_rgba(138,46,255,0.3)] transition-shadow duration-300">
                                        <Check className="w-3 h-3 text-primary" />
                                    </div>
                                    <span className="hidden md:inline text-xs">{c.auto}</span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
