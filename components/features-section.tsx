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
        desc: "Akses jurnal ilmiah dan paper akademik langsung dari editor. Cari referensi dari Perplexity, Consensus, hingga Google Scholar tanpa perlu pindah tab.",
        icon: Bot,
        images: ["/screenshots/ai.webp"],
        highlights: [
            "Multi-engine search terpadu",
            "Paper summarizer otomatis",
            "Insert citation langsung dari hasil cari",
            "Verifikasi sumber akademik otomatis"
        ]
    },
    {
        title: "Smart Citation Engine",
        desc: "Manajemen referensi tingkat lanjut. Masukkan sitasi dengan standar APA 7 atau IEEE secara instan. Scriptora mengurus formatnya, Anda fokus pada konten.",
        icon: ListTree,
        images: ["/screenshots/bibliography-manager.webp"],
        highlights: [
            "Import dari DOI, PDF, atau BibTeX",
            "Auto-format APA 7 & IEEE",
            "Validasi sitasi 6-lapis",
            "Organisasi via Groups & Tags"
        ]
    },
    {
        title: "Live Academic Preview",
        desc: "Lihat hasil skripsi Anda secara real-time tepat saat Anda mengetik. Rendering standar 4-4-3-3 dengan font Times New Roman dan spasi 1.5.",
        icon: Eye,
        images: ["/screenshots/tampilan-preview.webp"],
        highlights: [
            "WYSIWYG real-time rendering",
            "Preset margin akademik standar",
            "Font TNR 12pt & Spasi 1.5",
            "Navigasi antar bab yang instan"
        ]
    },
    {
        title: "Premium DOCX Pipeline",
        desc: "Satu-satunya IDE yang menghasilkan DOCX 'Siap Sidang'. Dilengkapi dengan Table of Contents, List of Figures, dan sectioning otomatis yang presisi.",
        icon: Quote,
        images: ["/screenshots/tampilan-export-dark-mode.webp", "/screenshots/tampilan-export-day-mode.webp"],
        highlights: [
            "Export DOCX profesional sekali klik",
            "Otomasi TOC & Tabel Gambar",
            "Penomoran Romawi & Arab otomatis",
            "Support PDF via Word automation"
        ],
        badge: "PRO"
    },
    {
        title: "Smart Asset Management",
        desc: "Kelola Gambar, Tabel, dan Persamaan Matematika di satu tempat. Penomoran otomatis (Gambar 1, Tabel 2) sesuai standar penulisan karya ilmiah.",
        icon: ImageIcon,
        images: ["/screenshots/tampilan-input.webp"],
        highlights: [
            "Auto-captioning untuk Gambar",
            "Tabel dengan header row support",
            "Persamaan LaTeX ke MathML",
            "Manajemen aset terpusat"
        ]
    },
    {
        title: "5-Zone Document Architecture",
        desc: "Sistem zona pintar yang mengatur penomoran halaman secara otomatis mulai dari Cover, Kata Pengantar, hingga Lampiran dokumen Anda.",
        icon: Layers,
        images: ["/screenshots/tampilan-setting-halaman.webp"],
        highlights: [
            "Zona 1: Cover (Tanpa nomor)",
            "Zona 2: Preliminaries (Romawi: i, ii, iii)",
            "Zona 3: Konten Utama (Arab: 1, 2, 3)",
            "Zona 4-5: Lampiran & Halaman Khusus"
        ]
    },
    {
        title: "Auto-Generated Lists",
        desc: "Hasilkan Daftar Singkatan, Daftar Simbol, dan Glosarium secara otomatis. Tidak perlu lagi membuat tabel manual yang melelahkan.",
        icon: BookOpen,
        images: ["/screenshots/document-lists.webp"],
        highlights: [
            "Daftar Singkatan otomatis",
            "Daftar Simbol terintegrasi",
            "Glosarium pintar",
            "Export sebagai section DOCX"
        ]
    },
    {
        title: "User Guide & Appendices",
        desc: "Kelola lampiran skripsi Anda dengan mudah. Lengkap dengan panduan penggunaan yang terintegrasi untuk membantu menyelesaikan naskah lebih cepat.",
        icon: Paperclip,
        images: ["/screenshots/user-guide.webp"],
        highlights: [
            "Manajemen Lampiran (Appendix)",
            "Panduan interaktif GitBook style",
            "Support dokumen & gambar lampiran",
            "Organisasi file pendukung terpusat"
        ]
    },
    {
        title: "Quick Notes & Drafting",
        desc: "Panel samping untuk mencatat ide dan draft kasar sebelum dimasukkan ke naskah utama. Mendukung autocomplete kutipan agar referensi tidak hilang.",
        icon: StickyNote,
        images: ["/screenshots/notes.webp"],
        highlights: [
            "Quick notes di panel samping",
            "Autocomplete sitasi ({{cite:key}})",
            "Penyimpanan per-project",
            "Drag & Drop ide ke editor"
        ]
    },
    {
        title: "Guided Setup Wizard",
        desc: "Mulai naskah Anda dalam 60 detik. Pilih template (Skripsi, Tesis, Makalah), isi metadata, dan Scriptora akan membangun seluruh struktur dokumen untuk Anda.",
        icon: Settings,
        images: ["/screenshots/tampilan-project-initialization.webp", "/screenshots/tampilan-wizard.webp"],
        highlights: [
            "Pilihan Template (Skripsi, Tesis, dll)",
            "Isi Metadata otomatis (NIM, Nama, Judul)",
            "Preset universitas Indonesia",
            "Struktur dokumen instan"
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
