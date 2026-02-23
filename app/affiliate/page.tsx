"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Copy, Users, DollarSign, Trophy, Share2, TrendingUp, Mail, LogOut, Lock } from "lucide-react"
import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth"
import { getAffiliateStats, getLeaderboardData } from "@/lib/affiliate-data"

export default function AffiliatePage() {
    const { user, login, register, logout, loading } = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isRegister, setIsRegister] = useState(false)
    const [authError, setAuthError] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [copied, setCopied] = useState(false)
    const [statsData, setStatsData] = useState<any>(null)
    const [leaderboard, setLeaderboard] = useState<any[]>([])
    const [statsLoading, setStatsLoading] = useState(true)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!user) return

        const fetchData = async () => {
            setStatsLoading(true)
            try {
                const s = await getAffiliateStats(user.email)
                setStatsData(s)

                const l = await getLeaderboardData({
                    name: user.email.split('@')[0],
                    sales: s.salesRaw
                })
                setLeaderboard(l)
            } catch (error) {
                console.error('[Scriptora] Fetch Error:', error)
            } finally {
                setStatsLoading(false)
            }
        }

        fetchData()
    }, [user])

    if (!mounted || loading) return <div className="min-h-screen bg-[#06030A]" />

    const affiliateLink = user ? `https://scriptora-official.vercel.app?ref=${user.refId}` : ""

    const handleCopy = () => {
        navigator.clipboard.writeText(affiliateLink)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault()
        setAuthError("")
        if (!email.includes("@")) return

        try {
            if (isRegister) {
                await register(email, password)
                setSuccessMessage("Akun berhasil dibuat! Silakan login.")
                setIsRegister(false)
                setPassword("")
            } else {
                await login(email, password)
            }
        } catch (err: any) {
            setAuthError(err.message)
        }
    }

    const stats = [
        { label: "Total Clicks", value: statsLoading ? "..." : (statsData?.clicks || "0"), icon: Share2, color: "text-blue-400" },
        { label: "Active Users", value: statsLoading ? "..." : (statsData?.activeUsers || "0"), icon: Users, color: "text-primary" },
        { label: "Total Sales", value: statsLoading ? "..." : (statsData?.sales || "0"), icon: TrendingUp, color: "text-green-400" },
        { label: "Total Commission", value: statsLoading ? "..." : (statsData?.commission || "Rp 0"), icon: DollarSign, color: "text-yellow-400" },
    ]

    return (
        <main className="min-h-screen bg-[#06030A]">
            <Navbar />

            <section className="pt-32 pb-20 overflow-hidden min-h-[80vh] flex items-center">
                <div className="container mx-auto px-4 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10" />

                    <AnimatePresence mode="wait">
                        {!user ? (
                            <motion.div
                                key="login"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                className="max-w-md mx-auto"
                            >
                                <GlassCard className="p-10 border-white/10 shadow-2xl">
                                    <div className="text-center space-y-4 mb-8">
                                        <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                            <Trophy className="text-primary w-8 h-8" />
                                        </div>
                                        <h1 className="text-3xl font-heading font-bold">{isRegister ? "Join Affiliate" : "Affiliate Login"}</h1>
                                        <p className="text-muted-foreground">{isRegister ? "Start earning 28% commission today." : "Access your referral dashboard."}</p>
                                    </div>

                                    <form onSubmit={handleAuth} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
                                            <div className="relative group">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                                <input
                                                    type="email"
                                                    placeholder="name@university.edu"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/30"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Password</label>
                                            <div className="relative group">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                                <input
                                                    type="password"
                                                    placeholder="••••••••"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/30"
                                                />
                                            </div>
                                        </div>
                                        <Button type="submit" variant="glow" className="w-full py-6 rounded-xl text-md font-bold">
                                            {isRegister ? "Create Account" : "Login Dashboard"}
                                        </Button>

                                        {authError && (
                                            <p className="text-red-500 text-xs text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20">
                                                {authError}
                                            </p>
                                        )}

                                        {successMessage && (
                                            <p className="text-green-500 text-xs text-center bg-green-500/10 py-2 rounded-lg border border-green-500/20">
                                                {successMessage}
                                            </p>
                                        )}

                                        <div className="text-center">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setIsRegister(!isRegister);
                                                    setAuthError("");
                                                    setSuccessMessage("");
                                                }}
                                                className="text-xs text-primary font-bold uppercase tracking-widest hover:underline"
                                            >
                                                {isRegister ? "Already have an account? Login" : "New here? Create an Account"}
                                            </button>
                                        </div>
                                    </form>

                                    <p className="text-[10px] text-center text-muted-foreground mt-8 uppercase tracking-widest opacity-40">
                                        Secured with Scriptora Guard
                                    </p>
                                </GlassCard>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="dashboard"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="max-w-6xl mx-auto space-y-12"
                            >
                                {/* Header */}
                                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                                    <div className="text-center md:text-left space-y-2">
                                        <h1 className="text-4xl md:text-5xl font-heading font-bold">
                                            Welcome, <span className="text-primary">{user.email.split('@')[0]}</span>
                                        </h1>
                                        <p className="text-muted-foreground">Your real-time performance overview.</p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        onClick={logout}
                                        className="text-muted-foreground hover:text-white border border-white/5 hover:bg-white/5 rounded-xl"
                                    >
                                        <LogOut className="w-4 h-4 mr-2" /> Logout
                                    </Button>
                                </div>

                                {/* Referral Link Card */}
                                <GlassCard className="p-8 border-primary/20 bg-primary/5">
                                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                        <div className="space-y-1">
                                            <h2 className="text-xl font-bold flex items-center gap-2">Your Referral Link</h2>
                                            <p className="text-sm text-muted-foreground">Tracking ID: <strong>{user.refId}</strong></p>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <div className="flex w-full md:w-auto items-center gap-2 bg-black/40 p-2 pl-4 rounded-xl border border-white/10 group focus-within:border-primary/50 transition-colors">
                                                <code className="text-primary text-sm md:text-base font-mono">{affiliateLink}</code>
                                                <Button size="sm" variant="glow" onClick={handleCopy}>
                                                    {copied ? "Copied!" : "Copy"}
                                                </Button>
                                            </div>
                                            <p className="text-[10px] text-muted-foreground/60 uppercase tracking-tighter">
                                                ⚠️ Sales are filtered & verified manually via WhatsApp logs.
                                            </p>
                                        </div>
                                    </div>
                                </GlassCard>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {stats.map((stat, i) => (
                                        <GlassCard key={i} className="p-6 space-y-4 hover:border-primary/30 transition-colors">
                                            <div className={`p-3 rounded-xl bg-white/5 w-fit ${stat.color}`}>
                                                <stat.icon className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                                                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                                            </div>
                                        </GlassCard>
                                    ))}
                                </div>

                                <div className="grid lg:grid-cols-3 gap-8">
                                    <div className="lg:col-span-2 space-y-8">
                                        <GlassCard className="p-8 overflow-hidden relative">
                                            <h3 className="text-2xl font-bold mb-6">Commission Tier</h3>
                                            <div className="space-y-6">
                                                <div className="flex justify-between items-end">
                                                    <div>
                                                        <p className="text-muted-foreground text-sm uppercase font-bold">Standard Rate</p>
                                                        <h4 className="text-5xl font-bold text-primary mt-2">28.11%</h4>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-muted-foreground text-sm">Next Tier: <span className="text-white">50 Sales</span></p>
                                                        <div className="w-32 h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
                                                            <div className="w-[15%] h-full bg-primary" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm">
                                                    📌 <strong>Bonus Leaderboard:</strong> Peringkat 5 teratas setiap bulan akan mendapatkan bonus cash tambahan Rp 500rb - Rp 2jt.
                                                </div>
                                            </div>
                                        </GlassCard>

                                        <GlassCard className="p-8">
                                            <h3 className="text-2xl font-bold mb-6">Payout Status</h3>
                                            <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/10">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center text-yellow-400">
                                                        <DollarSign className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Pending Payout</p>
                                                        <p className="text-xl font-bold">Rp 0</p>
                                                    </div>
                                                </div>
                                                <Button disabled variant="outline" className="border-white/10 opacity-50">Request Payout</Button>
                                            </div>
                                        </GlassCard>
                                    </div>

                                    <GlassCard className="p-8 border-yellow-400/20">
                                        <div className="flex items-center gap-3 mb-8">
                                            <Trophy className="text-yellow-400 w-6 h-6" />
                                            <h3 className="text-xl font-bold">Monthly Leaderboard</h3>
                                        </div>
                                        <div className="space-y-6">
                                            {statsLoading ? (
                                                <div className="p-10 text-center text-muted-foreground animate-pulse text-xs uppercase tracking-widest">Loading competition...</div>
                                            ) : leaderboard.length === 0 ? (
                                                <div className="p-10 text-center text-muted-foreground italic text-xs">No active competition yet.</div>
                                            ) : (
                                                leaderboard.map((item: any, i: number) => (
                                                    <div key={i} className={`flex items-center gap-4 p-2 rounded-xl transition-colors ${item.isUser ? "bg-primary/10 border border-primary/20 shadow-[0_0_15px_rgba(138,46,255,0.1)]" : "border border-transparent"}`}>
                                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${i === 0 ? "bg-yellow-400 text-black shadow-[0_0_10px_rgba(250,204,21,0.3)]" :
                                                            i === 1 ? "bg-slate-300 text-black" :
                                                                i === 2 ? "bg-orange-400 text-black" :
                                                                    item.isUser ? "bg-primary text-white" : "bg-white/10 text-white/60"
                                                            }`}>{i + 1}</div>
                                                        <div className="flex-1">
                                                            <p className={`text-sm font-bold ${item.isUser ? "text-primary" : "text-white"}`}>
                                                                {item.name} {item.isUser && <span className="text-xs text-muted-foreground">(You)</span>}
                                                            </p>
                                                            <p className="text-[10px] text-muted-foreground uppercase">{item.sales} Sales</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className={`text-xs font-mono font-bold ${item.isUser ? "text-primary" : "text-white/80"}`}>{item.reward}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </GlassCard>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            <Footer />
        </main>
    )
}
