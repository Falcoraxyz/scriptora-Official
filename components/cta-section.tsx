"use client"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { detectPlatform, getDownloadUrl, Platform, DOWNLOAD_LINKS } from "@/lib/downloads"

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
        <section className="py-32 relative text-center overflow-hidden">
            <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
            <div className="container mx-auto px-4 relative z-10">
                <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8 tracking-tight">
                    Stop Fighting Formatting. <br />
                    <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-[#8A2EFF] to-[#B57CFF]">Start Writing.</span>
                </h2>
                <Button
                    variant="glow"
                    size="lg"
                    className="h-14 px-10 text-lg rounded-full shadow-[0_0_50px_rgba(138,46,255,0.4)]"
                    onClick={handleDownload}
                >
                    Start Writing with Scriptora
                </Button>

                <div className="flex justify-center gap-8 mt-6 text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground/50">
                    <a href={DOWNLOAD_LINKS.windows} className="hover:text-primary transition-colors">Windows</a>
                    <a href={DOWNLOAD_LINKS.macos_arm} className="hover:text-primary transition-colors">macOS</a>
                    <a href={DOWNLOAD_LINKS.linux_deb} className="hover:text-primary transition-colors">Linux</a>
                </div>
            </div>
        </section>
    )
}
