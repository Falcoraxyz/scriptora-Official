"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { motion } from "framer-motion"

export function ProductShowcase() {
    return (
        <section className="py-28 container mx-auto px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-3">
                    Write on the Left. <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8A2EFF] to-[#B57CFF]">Preview on the Right.</span>
                </h2>
                <p className="text-muted-foreground/60 max-w-lg mx-auto">Real-time split view that shows exactly how your thesis will look when printed.</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
            >
                <div className="absolute inset-0 bg-primary/15 blur-[120px] rounded-full -z-10" />

                {/* Main Container */}
                <GlassCard className="p-2 border-primary/30 bg-[#0B0613]/90 shadow-[0_0_100px_rgba(138,46,255,0.15)]">
                    <div className="aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden border border-white/10 bg-[#050510] flex flex-col md:flex-row relative">
                        {/* Toolbar */}
                        <div className="absolute top-0 left-0 w-full h-10 border-b border-white/5 bg-white/[0.03] flex items-center px-4 justify-between z-10">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/30" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/30" />
                                <div className="w-3 h-3 rounded-full bg-green-500/30" />
                            </div>
                            <div className="text-[10px] text-muted-foreground/40 uppercase tracking-widest font-mono">Scriptora v1.0</div>
                        </div>

                        {/* Editor Side */}
                        <div className="w-full md:w-1/2 pt-14 p-8 space-y-4 border-r border-white/5 font-mono text-sm text-gray-400">
                            <div className="flex gap-4">
                                <span className="opacity-20 w-4 text-right">1</span>
                                <span className="text-purple-400 font-semibold"># The Impact of Generative AI</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="opacity-20 w-4 text-right">2</span>
                                <div>
                                    Recent studies <span className="text-yellow-500/60 bg-yellow-500/5 px-1 rounded">{"{Smith, 2023}"}</span> suggest that large language models...
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <span className="opacity-20 w-4 text-right">3</span>
                                <div className="pl-4 border-l-2 border-primary/50 bg-primary/5 p-3 rounded-r text-xs">
                                    <span className="text-primary font-bold block mb-1">💡 Writing Assistant</span>
                                    <span className="text-muted-foreground">Suggestion: Rephrase for better academic tone and flow.</span>
                                </div>
                            </div>
                            <div className="flex gap-4 opacity-60">
                                <span className="opacity-20 w-4 text-right">4</span>
                                <div className="text-gray-600">The implications extend beyond traditional research...</div>
                            </div>
                        </div>

                        {/* Preview Side */}
                        <div className="hidden md:block w-1/2 bg-white text-black pt-14 p-12 overflow-hidden relative">
                            <div className="max-w-[400px] mx-auto shadow-2xl bg-white min-h-[500px] p-8 border border-gray-100">
                                <div className="font-bold text-center text-xl mb-8 font-serif">The Impact of Generative AI</div>
                                <div className="text-justify text-[10px] leading-[1.8] space-y-4 font-serif text-gray-800">
                                    <p>
                                        Recent studies (Smith, 2023) suggest that large language models have fundamentally altered the landscape of academic research.
                                    </p>
                                    <p>
                                        However, the integration of these tools remains a subject of intense debate within the scholarly community, particularly concerning...
                                    </p>
                                </div>
                                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[8px] text-gray-300 font-mono">— Page 1 —</div>
                            </div>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>
        </section>
    )
}
