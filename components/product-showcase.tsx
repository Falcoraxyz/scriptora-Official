"use client"

import { MockupFrame } from "@/components/ui/mockup-frame"
import { GlassCard } from "@/components/ui/glass-card"
import { motion } from "framer-motion"
import Image from "next/image"

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
                    <MockupFrame title="Scriptora Live Interface" className="w-full">
                        <div className="relative aspect-video md:aspect-[21/9] overflow-hidden">
                            <Image
                                src="/screenshots/halaman Live Document Preview.png"
                                alt="Scriptora Real Split View Interface"
                                fill
                                className="object-cover object-top"
                                loading="lazy"
                            />
                        </div>
                    </MockupFrame>
                </GlassCard>
            </motion.div>
        </section>
    )
}
