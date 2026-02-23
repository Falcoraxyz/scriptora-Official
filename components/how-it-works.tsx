"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

const steps = [
    { title: "Write your content", desc: "Focus on your research and ideas. Scriptora handles the formatting rules, margins, and typography automatically in the background." },
    { title: "Insert citations & assets", desc: "Paste a DOI to import citations, drag-drop images for Figures, or write LaTeX for equations. Everything is auto-numbered." },
    { title: "Preview the formatted document", desc: "See exactly how your thesis will appear in print with live academic preview — TNR 12pt, 1.5 spacing, correct margins." },
    { title: "Export perfectly formatted DOCX", desc: "One click generates a submission-ready DOCX with auto TOC, List of Figures, List of Tables, and correct page numbering." }
]

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-28 relative">
            <div className="container px-4 mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-6">
                        <Sparkles className="w-3 h-3 mr-2" />
                        4 Simple Steps
                    </div>
                    <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tight">How It Works</h2>
                    <p className="text-muted-foreground/60 mt-4 max-w-lg mx-auto">From blank page to perfectly formatted thesis in minutes.</p>
                </motion.div>

                <div className="max-w-4xl mx-auto space-y-0 relative">
                    {/* Vertical Line */}
                    <div className="absolute left-[23px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-primary via-primary/40 to-transparent md:left-1/2 md:-ml-px" />

                    {steps.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className={`relative flex items-start gap-8 py-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                        >
                            {/* Number Bubble */}
                            <div className="absolute left-0 w-12 h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center font-bold text-white text-lg z-10 md:left-1/2 md:-translate-x-1/2 shadow-[0_0_25px_rgba(138,46,255,0.3)]">
                                {i + 1}
                            </div>

                            {/* Spacer for desktop alignment */}
                            <div className="hidden md:block flex-1" />

                            {/* Card */}
                            <div className="flex-1 pl-16 md:pl-0">
                                <GlassCard className="p-6 relative group hover:border-primary/30 hover:shadow-[0_0_40px_rgba(138,46,255,0.08)] transition-all duration-500">
                                    <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary/60 mb-2">Step {i + 1}</div>
                                    <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                                </GlassCard>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
