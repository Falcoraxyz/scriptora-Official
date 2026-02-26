"use client"

import { cn } from "@/lib/utils"

interface MockupFrameProps {
    children: React.ReactNode
    className?: string
    title?: string
}

export function MockupFrame({ children, className, title }: MockupFrameProps) {
    return (
        <div className={cn(
            "relative rounded-xl overflow-hidden border border-white/10 bg-[#0B0613]/80 backdrop-blur-xl shadow-2xl group/frame",
            "before:absolute before:inset-0 before:bg-gradient-to-tr before:from-white/5 before:to-transparent before:pointer-events-none",
            className
        )}>
            {/* Window Header */}
            <div className="h-9 border-b border-white/5 bg-white/[0.03] flex items-center px-4 justify-between">
                <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/20 group-hover/frame:bg-red-400/40 transition-colors" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/20 group-hover/frame:bg-yellow-400/40 transition-colors" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/20 group-hover/frame:bg-green-400/40 transition-colors" />
                </div>
                {title && (
                    <div className="text-[10px] text-muted-foreground/30 uppercase tracking-[0.2em] font-mono leading-none">
                        {title}
                    </div>
                )}
                <div className="w-12" /> {/* Balancing spacer */}
            </div>

            {/* Content Area */}
            <div className="relative">
                {children}

                {/* Subtle Inner Highlight */}
                <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.05] rounded-b-xl pointer-events-none" />
            </div>
        </div>
    )
}
