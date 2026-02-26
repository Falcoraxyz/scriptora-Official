"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { Bot, ListTree, Eye, Quote, Image as ImageIcon, Layers, BookOpen, Paperclip, StickyNote, Settings, Sparkles, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useState, useRef } from "react"
import Image from "next/image"
import { MockupFrame } from "@/components/ui/mockup-frame"

const features = [
    {
        title: "Integrated AI Research Hub",
        desc: "Stop tab-switching. Search scientific papers across Perplexity, Consensus, Elicit, and Google Scholar in a unified workspace designed for academic rigor.",
        icon: Bot,
        images: ["/screenshots/AI Dashboard.png"],
        highlights: [
            "Multi-engine search in one panel",
            "Built-in paper summarizer",
            "Direct citation insertion from results",
            "Academic source verification"
        ]
    },
    {
        title: "Smart Citation Engine",
        desc: "Mendeley-level intelligence. Search and insert citations with APA 7 or IEEE standards instantly. Scriptora handles the formatting so you can focus on the content.",
        icon: ListTree,
        images: ["/screenshots/UI Citation.png", "/screenshots/Halaman Bibliography Manager.png"],
        highlights: [
            "Import from DOI, PDF, or BibTeX",
            "Auto-format APA 7 & IEEE",
            "6-layer citation validation pipeline",
            "Groups & Tags for organization"
        ]
    },
    {
        title: "Live Academic Preview",
        desc: "See your thesis as it will appear in print. Real-time rendering with 4-4-3-3 margins, Times New Roman 12pt, and perfect 1.5 line spacing built into the core.",
        icon: Eye,
        images: ["/screenshots/halaman Live Document Preview.png"],
        highlights: [
            "WYSIWYG real-time rendering",
            "Standard academic margin preset",
            "TNR 12pt with 1.5 line spacing",
            "Instant chapter navigation"
        ]
    },
    {
        title: "Premium DOCX Pipeline",
        desc: "The only IDE that exports a 'Ready to Submit' DOCX. Automatic Table of Contents, List of Figures, and Roman numeral sectioning with one click.",
        icon: Quote,
        images: ["/screenshots/Halaman Export.png"],
        highlights: [
            "One-click professional DOCX export",
            "Auto-generated TOC & List of Figures",
            "Roman + Arabic page numbering",
            "PDF export via Word automation"
        ],
        badge: "PRO"
    },
    {
        title: "Smart Asset Management",
        desc: "Centralized management for Figures, Tables, and Equations. Drag, drop, and auto-number your assets while maintaining strict academic labeling standards.",
        icon: ImageIcon,
        images: ["/screenshots/UI insert Gambar.png", "/screenshots/UI Insert Tabel.png", "/screenshots/UI Insert Equation.png"],
        highlights: [
            "Figures with auto-captioning",
            "Tables with header row support",
            "LaTeX equations → MathML export",
            "Academic auto-numbering (Gambar 1, Tabel 2...)"
        ]
    },
    {
        title: "5-Zone Document Architecture",
        desc: "A smart zone system that automatically manages page numbering across your entire document — from Cover to Appendix, each zone gets its own rules.",
        icon: Layers,
        images: ["/screenshots/Settingan nomor halaman Untuk setiap Zone.png"],
        highlights: [
            "Zone 1: Cover (No page number)",
            "Zone 2: Preliminaries (Roman: i, ii, iii)",
            "Zone 3: Content (Arabic: 1, 2, 3)",
            "Zone 4-5: Appendix & Special Pages"
        ]
    },
    {
        title: "Auto-Generated Lists",
        desc: "Automatically generate Abbreviation Lists, Symbol Lists, and Glossaries. No more manual tables — Scriptora builds them from your entries and exports perfectly.",
        icon: BookOpen,
        images: ["/screenshots/List untuk Daftar Pustaka dll.png", "/screenshots/Halaman Dokumen List.png"],
        highlights: [
            "Daftar Singkatan (Abbreviations)",
            "Daftar Simbol (Symbols)",
            "Glosarium (Glossary)",
            "Exported as formatted DOCX sections"
        ]
    },
    {
        title: "Appendix Manager",
        desc: "Manage your thesis appendices with centralized auto-numbering and caption support. Upload documents, images, or write content — all organized in one panel.",
        icon: Paperclip,
        images: ["/screenshots/UI insert Lampiran.png"],
        highlights: [
            "Auto-numbered Lampiran 1, 2, 3...",
            "Support for images & text content",
            "Centralized caption management",
            "Exported with proper formatting"
        ]
    },
    {
        title: "Quick Notes & Drafting",
        desc: "A side panel for brainstorming and drafting ideas before they become part of your thesis body. Supports citation autocomplete so you never lose a reference.",
        icon: StickyNote,
        images: ["/screenshots/Tampilan Notes.png"],
        highlights: [
            "Side-panel quick notes",
            "Citation autocomplete ({{cite:key}})",
            "Per-project note storage",
            "Drag ideas into your main editor"
        ]
    },
    {
        title: "Guided Setup Wizard",
        desc: "Start your thesis in under 60 seconds. Choose a template (Skripsi, Tesis, Makalah, Proposal), fill in your metadata, and Scriptora builds the entire document structure for you.",
        icon: Settings,
        images: ["/screenshots/Tampilan Setup.png", "/screenshots/wizard setup.png"],
        highlights: [
            "Template selection (Skripsi, Tesis, etc.)",
            "Metadata auto-fill (Nama, NIM, Judul)",
            "University preset formatting",
            "Structure generated in seconds"
        ]
    }
]

export function FeaturesSection() {
    return (
        <section id="features" className="py-32 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 -z-10" />

            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="container px-4 mx-auto text-center mb-24"
            >
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-6">
                    <Sparkles className="w-3 h-3 mr-2" />
                    10 Powerful Features
                </div>
                <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tighter mb-4">
                    Everything You Need to <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8A2EFF] to-[#B57CFF]">Graduate.</span>
                </h2>
                <p className="text-lg text-muted-foreground/70 max-w-2xl mx-auto">
                    From your first draft to the final submission, Scriptora handles every detail of academic writing.
                </p>
            </motion.div>

            <div className="container px-4 mx-auto space-y-40">
                {features.map((f, i) => (
                    <FeatureBlock key={i} feature={f} index={i} />
                ))}
            </div>
        </section>
    )
}

interface FeatureData {
    title: string
    desc: string
    icon: React.ElementType
    images: string[]
    highlights: string[]
    badge?: string
}

function FeatureBlock({ feature: f, index: i }: { feature: FeatureData, index: number }) {
    const [activeImg, setActiveImg] = useState(0)

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={cn(
                "flex flex-col md:flex-row gap-16 items-center",
                i % 2 === 1 ? 'md:flex-row-reverse' : ''
            )}
        >
            {/* Text Content */}
            <div className="flex-1 space-y-6">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-[0_0_30px_rgba(138,46,255,0.15)]"
                >
                    <f.icon className="w-7 h-7 text-primary" />
                </motion.div>

                <div className="space-y-3">
                    <h3 className="text-3xl md:text-4xl font-heading font-black tracking-tighter flex items-center gap-3 flex-wrap">
                        {f.title}
                        {f.badge && (
                            <span className="text-[10px] bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full uppercase tracking-[0.2em] font-black shadow-[0_0_20px_rgba(138,46,255,0.3)]">{f.badge}</span>
                        )}
                    </h3>
                    <p className="text-lg text-muted-foreground/80 leading-relaxed font-medium max-w-xl">
                        {f.desc}
                    </p>
                </div>

                {/* Highlights replacing "Learn More" */}
                <div className="space-y-2.5 pt-2">
                    {f.highlights.map((h, j) => (
                        <motion.div
                            key={j}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + j * 0.1 }}
                            className="flex items-center gap-3 text-sm text-white/70"
                        >
                            <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                                <Check className="w-3 h-3 text-primary" />
                            </div>
                            {h}
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="flex-1 w-full relative group">
                {/* 3D Tilt Wrapper */}
                <TiltWrapper>
                    <MockupFrame title={f.title} className="shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                        <div className="relative aspect-[4/3] w-full flex items-center justify-center p-2 bg-gradient-to-br from-white/[0.02] to-transparent">
                            <Image
                                src={f.images[activeImg]}
                                alt={f.title}
                                width={800}
                                height={600}
                                loading="lazy"
                                className="rounded-lg shadow-2xl transition-transform duration-700"
                            />

                            {/* Inner Glow Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />
                        </div>

                        {/* Pagination for multi-image */}
                        {f.images.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                                {f.images.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={(e) => { e.stopPropagation(); setActiveImg(idx); }}
                                        className={cn(
                                            "w-2 h-2 rounded-full transition-all duration-300",
                                            activeImg === idx
                                                ? "bg-primary w-6 shadow-[0_0_10px_rgba(138,46,255,0.5)]"
                                                : "bg-white/20 hover:bg-white/40"
                                        )}
                                    />
                                ))}
                            </div>
                        )}
                    </MockupFrame>
                </TiltWrapper>

                {/* Floating Elements for depth */}
                <motion.div
                    animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-6 -right-6 z-30 pointer-events-none"
                >
                    <div className="bg-[#0B0613]/90 backdrop-blur-md border border-primary/30 rounded-xl p-3 px-4 shadow-xl">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">AI Enhanced</span>
                        </div>
                    </div>
                </motion.div>

                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/10 rounded-full blur-[100px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            </div>
        </motion.div>
    )
}

function TiltWrapper({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x)
    const mouseYSpring = useSpring(y)

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        const xPct = mouseX / width - 0.5
        const yPct = mouseY / height - 0.5
        x.set(xPct)
        y.set(yPct)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="w-full"
        >
            <div style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}>
                {children}
            </div>
        </motion.div>
    )
}
