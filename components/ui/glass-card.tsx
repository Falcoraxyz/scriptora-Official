import { cn } from "@/lib/utils"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    className?: string
}

export function GlassCard({ children, className, ...props }: GlassCardProps) {
    return (
        <div
            className={cn(
                "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl",
                "hover:border-primary/20 transition-all duration-300",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}
