"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, XCircle, Clock, ShieldCheck, RefreshCw, Trash2, Search } from "lucide-react"
import { useState, useEffect } from "react"
import { getSalesRecords, verifySale, deleteSale, SaleRecord } from "@/lib/sales-tracking"
import { useAuth } from "@/lib/auth"
import { Lock, Mail } from "lucide-react"

export default function AdminVerifyPage() {
    const { user, login, logout, isAdmin, loading: authLoading } = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [records, setRecords] = useState<SaleRecord[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        if (isAdmin) {
            loadRecords()
        }
    }, [isAdmin])

    const handleAdminLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        try {
            await login(email, password)
        } catch (err: any) {
            setError(err.message || "Gagal login admin.")
        }
    }

    if (!mounted || authLoading) return <div className="min-h-screen bg-[#06030A]" />

    if (!isAdmin) {
        return (
            <main className="min-h-screen bg-[#06030A] flex items-center justify-center">
                <Navbar />
                <div className="container mx-auto px-4 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10" />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-md mx-auto"
                    >
                        <GlassCard className="p-10 border-white/10 shadow-2xl">
                            <div className="text-center space-y-4 mb-8">
                                <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <Lock className="text-red-500 w-8 h-8" />
                                </div>
                                <h1 className="text-3xl font-heading font-bold">Admin Portal</h1>
                                <p className="text-muted-foreground text-sm font-medium border-l-2 border-red-500/50 pl-3">
                                    Restricted to pre-configured accounts. Registration is disabled.
                                </p>
                            </div>

                            <form onSubmit={handleAdminLogin} className="space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Admin Email</label>
                                        <div className="relative group">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                            <input
                                                type="email"
                                                placeholder="admin@scriptora.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all"
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
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {error && (
                                    <p className="text-red-500 text-xs text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20">
                                        {error}
                                    </p>
                                )}

                                <Button type="submit" variant="glow" className="w-full py-6 rounded-xl text-md font-bold">
                                    Verify Identity
                                </Button>
                            </form>

                            {user && !isAdmin && (
                                <p className="text-red-500 text-xs text-center mt-4 bg-red-500/10 py-2 rounded-lg border border-red-500/20">
                                    Access Denied: <strong>{user.email}</strong> is not authorized.
                                </p>
                            )}
                        </GlassCard>
                    </motion.div>
                </div>
            </main>
        )
    }

    const loadRecords = async () => {
        setLoading(true)
        const res = await getSalesRecords()
        setRecords(res)
        setLoading(false)
    }

    const handleVerify = async (id: string) => {
        await verifySale(id)
        await loadRecords()
    }

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this record?")) {
            await deleteSale(id)
            await loadRecords()
        }
    }

    const filteredRecords = records.filter(r =>
        r.refId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.id.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp))

    return (
        <main className="min-h-screen bg-[#06030A]">
            <Navbar />

            <section className="pt-32 pb-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto space-y-8">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-xs">
                                    <ShieldCheck className="w-4 h-4" /> Secure Admin Portal
                                </div>
                                <h1 className="text-4xl font-heading font-bold">Payment <span className="text-primary">Verification</span></h1>
                                <p className="text-muted-foreground">Manual filter to confirm affiliate sales and activate commissions.</p>
                            </div>
                            <div className="flex gap-4 w-full md:w-auto items-center">
                                <div className="relative flex-1 md:w-64">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <input
                                        type="text"
                                        placeholder="Search Ref ID..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-all"
                                    />
                                </div>
                                <Button variant="outline" size="icon" onClick={loadRecords} className="border-white/10">
                                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={logout} className="text-muted-foreground hover:text-white border border-white/5 rounded-xl">
                                    Logout
                                </Button>
                            </div>
                        </div>

                        {/* Status Summary */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <GlassCard className="p-6 border-blue-500/10 bg-blue-500/5">
                                <p className="text-xs text-blue-400 font-bold uppercase tracking-widest mb-1">Total Attempts</p>
                                <p className="text-3xl font-bold">{records.length}</p>
                            </GlassCard>
                            <GlassCard className="p-6 border-yellow-500/10 bg-yellow-500/5">
                                <p className="text-xs text-yellow-400 font-bold uppercase tracking-widest mb-1">Pending Filter</p>
                                <p className="text-3xl font-bold">{records.filter(r => r.status === 'pending').length}</p>
                            </GlassCard>
                            <GlassCard className="p-6 border-green-500/10 bg-green-500/5">
                                <p className="text-xs text-green-400 font-bold uppercase tracking-widest mb-1">Verified Sales</p>
                                <p className="text-3xl font-bold">{records.filter(r => r.status === 'verified').length}</p>
                            </GlassCard>
                        </div>

                        {/* Inventory Table */}
                        <GlassCard className="overflow-hidden border-white/10">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-white/10 bg-white/5">
                                            <th className="p-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Timestamp</th>
                                            <th className="p-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Ref ID</th>
                                            <th className="p-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Sale ID</th>
                                            <th className="p-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Status</th>
                                            <th className="p-4 text-xs font-bold uppercase tracking-widest text-muted-foreground text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        <AnimatePresence>
                                            {filteredRecords.length === 0 ? (
                                                <tr>
                                                    <td colSpan={5} className="p-10 text-center text-muted-foreground italic">
                                                        No records found.
                                                    </td>
                                                </tr>
                                            ) : (
                                                filteredRecords.map((record) => (
                                                    <motion.tr
                                                        key={record.id}
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        className="hover:bg-white/[0.02] transition-colors"
                                                    >
                                                        <td className="p-4 text-sm font-mono text-muted-foreground">
                                                            {new Date(record.timestamp).toLocaleString()}
                                                        </td>
                                                        <td className="p-4">
                                                            <span className="text-primary font-bold">{record.refId}</span>
                                                        </td>
                                                        <td className="p-4 text-xs font-mono text-muted-foreground/60">
                                                            {record.id}
                                                        </td>
                                                        <td className="p-4">
                                                            {record.status === 'verified' ? (
                                                                <span className="flex items-center gap-1.5 text-xs font-bold text-green-400 bg-green-400/10 py-1 px-3 rounded-full w-fit">
                                                                    <CheckCircle2 className="w-3 h-3" /> Verified
                                                                </span>
                                                            ) : (
                                                                <span className="flex items-center gap-1.5 text-xs font-bold text-yellow-400 bg-yellow-400/10 py-1 px-3 rounded-full w-fit">
                                                                    <Clock className="w-3 h-3" /> Pending
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td className="p-4 text-right">
                                                            <div className="flex justify-end gap-2">
                                                                {record.status === 'pending' && (
                                                                    <Button
                                                                        size="sm"
                                                                        variant="glow"
                                                                        onClick={() => handleVerify(record.id)}
                                                                        className="h-8 px-3 text-xs"
                                                                    >
                                                                        Verify Payment
                                                                    </Button>
                                                                )}
                                                                <Button
                                                                    size="sm"
                                                                    variant="ghost"
                                                                    onClick={() => handleDelete(record.id)}
                                                                    className="h-8 w-8 p-0 text-muted-foreground hover:text-red-400 hover:bg-red-400/10"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </Button>
                                                            </div>
                                                        </td>
                                                    </motion.tr>
                                                ))
                                            )}
                                        </AnimatePresence>
                                    </tbody>
                                </table>
                            </div>
                        </GlassCard>

                        {/* Instructions */}
                        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-sm text-muted-foreground">
                            <p className="font-bold text-white mb-2">💡 How to use this panel:</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>Every time a user clicks "Chat for Activation" in the pricing section, a <strong>Pending</strong> entry appears here.</li>
                                <li>Check your WhatsApp and bank account to ensure the user with the corresponding <strong>Ref ID</strong> has paid.</li>
                                <li>Click <strong>"Verify Payment"</strong> to approve the sale.</li>
                                <li>The affiliate's dashboard will instantly update with their new commission.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
