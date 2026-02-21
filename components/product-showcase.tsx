"use client"
import { GlassCard } from "@/components/ui/glass-card"
import { motion } from "framer-motion"

export function ProductShowcase() {
    return (
        <section className="py-24 container mx-auto px-4">
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
            >
                <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full -z-10" />

                {/* Main Container */}
                <GlassCard className="p-2 border-primary/30 bg-[#0B0613]/90 shadow-[0_0_80px_rgba(138,46,255,0.2)]">
                    <div className="aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden border border-white/10 bg-[#050510] flex flex-col md:flex-row relative">
                        {/* Toolbar */}
                        <div className="absolute top-0 left-0 w-full h-10 border-b border-white/5 bg-white/5 flex items-center px-4 justify-between z-10">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/20" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                                <div className="w-3 h-3 rounded-full bg-green-500/20" />
                            </div>
                            <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">Scriptora v1.0</div>
                        </div>

                        {/* Editor Side */}
                        <div className="w-full md:w-1/2 pt-14 p-8 space-y-4 border-r border-white/5 font-mono text-sm text-gray-400">
                            <div className="flex gap-4">
                                <span className="opacity-30">1</span>
                                <span className="text-purple-400"># The Impact of Generative AI</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="opacity-30">2</span>
                                <div>
                                    Recent studies <span className="text-yellow-500/50">{"{Smith, 2023}"}</span> suggest that large language models...
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <span className="opacity-30">3</span>
                                <div className="pl-4 border-l-2 border-primary/50 bg-primary/5 p-2 rounded-r">
                                    <span className="text-primary text-xs block mb-1">Writing Assistant</span>
                                    Suggestion: Rephrase for better flow.
                                </div>
                            </div>
                        </div>

                        {/* Preview Side */}
                        <div className="hidden md:block w-1/2 bg-white text-black pt-14 p-12 overflow-hidden relative">
                            <div className="max-w-[400px] mx-auto shadow-2xl bg-white min-h-[500px] p-8">
                                <div className="font-bold text-center text-xl mb-8">The Impact of Generative AI</div>
                                <div className="text-justify text-[10px] leading-relaxed space-y-4 font-serif">
                                    <p>
                                        Recent studies (Smith, 2023) suggest that large language models have fundamentally altered the landscape of academic research.
                                    </p>
                                    <p>
                                        However, the integration of these tools remains a subject of intense debate...
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>
        </section>
    )
}
