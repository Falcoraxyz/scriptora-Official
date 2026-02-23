"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { detectPlatform, getDownloadUrl, Platform, DOWNLOAD_LINKS } from "@/lib/downloads"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export function CTASection() {
    const [platform, setPlatform] = useState<Platform>('unknown');

    useEffect(() => {
        setPlatform(detectPlatform());
    }, []);

    const handleDownload = () => {
        const url = getDownloadUrl(platform);
        window.location.href = url;
    };

    return (
        <section className="py-40 relative text-center overflow-hidden">
            {/* Background Glow Layers */}
            <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-primary/10 via-primary/5 to-transparent pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[200px] rounded-full -z-10" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2">
                        <Sparkles className="w-3 h-3 mr-2 animate-pulse" />
                        Free Forever
                    </div>

                    <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight leading-tight">
                        Stop Fighting Formatting. <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8A2EFF] to-[#B57CFF]">Start Writing.</span>
                    </h2>

                    <p className="text-lg text-muted-foreground/60 max-w-md mx-auto">
                        Download Scriptora for free. Write your thesis with zero formatting stress. Pay only when you're ready to export.
                    </p>

                    <div className="pt-4">
                        <Button
                            variant="glow"
                            size="lg"
                            className="h-14 px-12 text-lg rounded-full shadow-[0_0_60px_rgba(138,46,255,0.4)] hover:shadow-[0_0_80px_rgba(138,46,255,0.5)] transition-shadow duration-500"
                            onClick={handleDownload}
                        >
                            Start Writing with Scriptora
                        </Button>
                    </div>

                    <div className="flex justify-center gap-8 mt-4 text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground/40">
                        <a href={DOWNLOAD_LINKS.windows} className="hover:text-primary transition-colors duration-300">Windows</a>
                        <a href={DOWNLOAD_LINKS.macos_arm} className="hover:text-primary transition-colors duration-300">macOS</a>
                        <a href={DOWNLOAD_LINKS.linux_deb} className="hover:text-primary transition-colors duration-300">Linux</a>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
