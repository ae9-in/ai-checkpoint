import { createFileRoute, Link } from "@tanstack/react-router";
import * as React from "react";
import { useState, useEffect } from "react";
import { getRegistrations, deleteRegistration } from "@/lib/db-actions";
import { motion, AnimatePresence } from "framer-motion";
import logoImage from "@/assets/logo.png";
import {
  Lock,
  Mail,
  Key,
  LogOut,
  RefreshCw,
  Search,
  Trash2,
  Download,
  User,
  Briefcase,
  Clock,
  Coins,
  Database,
  Users,
  MapPin,
  Calendar,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  FileText
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Portal — AI CheckPoint" },
      { name: "description", content: "Admin dashboard to manage registrations." },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = sessionStorage.getItem("aicp_admin_auth");
      if (auth === "true") {
        setIsAuthenticated(true);
      }
      setCheckingAuth(false);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("aicp_admin_auth");
    setIsAuthenticated(false);
    toast.info("Logged out successfully.");
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center text-soft">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-void text-soft selection:bg-cyan selection:text-void relative font-sans">
      {isAuthenticated ? (
        <AdminDashboard onLogout={handleLogout} />
      ) : (
        <AdminLoginForm onLoginSuccess={handleLoginSuccess} />
      )}
    </main>
  );
}

function AdminLoginForm({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      if (email === "admin@gmail.com" && password === "admin123") {
        sessionStorage.setItem("aicp_admin_auth", "true");
        toast.success("Successfully authenticated as Admin.");
        onLoginSuccess();
      } else {
        setError("Invalid email address or password.");
        toast.error("Authentication failed. Please check credentials.");
      }
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="w-full min-h-screen md:grid md:grid-cols-2">
      {/* Left Column: Form */}
      <div className="flex flex-col justify-between p-6 md:p-12 lg:p-16 min-h-screen">
        {/* Top logo */}
        <Link to="/" className="flex items-center gap-2.5 group w-fit">
          <img src={logoImage} alt="AI CheckPoint Logo" className="h-8 w-auto transition-transform group-hover:scale-105" />
          <span className="font-display text-lg font-bold tracking-tight text-white transition-colors group-hover:text-cyan">
            AI.CheckPoint
          </span>
        </Link>

        {/* Central form */}
        <div className="my-auto w-full max-w-sm mx-auto">
          <div className="flex flex-col gap-2 text-center mb-8">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-cyan/5 border border-cyan/10 text-cyan mb-2">
              <Lock className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Admin Portal Access</h1>
            <p className="text-sm text-muted-foreground">Authenticate to review system registrations</p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="email" className="font-mono-acc text-[11px] uppercase tracking-wider text-soft/50">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-soft/40">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="admin@gmail.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-indigo/20 bg-surface pl-10 pr-3 py-2.5 text-sm text-soft placeholder:text-soft/30 focus:border-cyan focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label htmlFor="password" className="font-mono-acc text-[11px] uppercase tracking-wider text-soft/50">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-soft/40">
                  <Key className="h-4 w-4" />
                </span>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-indigo/20 bg-surface pl-10 pr-3 py-2.5 text-sm text-soft placeholder:text-soft/30 focus:border-cyan focus:outline-none transition-colors"
                />
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-400 font-medium bg-red-950/20 border border-red-500/10 rounded-lg p-2.5 mt-1">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full flex h-10 items-center justify-center rounded-lg bg-gradient-primary font-medium text-void transition-all hover:opacity-90 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-void"></div>
              ) : (
                "Verify Identity →"
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-soft/30">
          Authorized operations personnel only. Logins are registered.
        </div>
      </div>

      {/* Right Column: Visual side */}
      <div className="hidden md:flex relative flex-col justify-between p-12 overflow-hidden bg-void border-l border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(201,162,107,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-void via-transparent to-transparent opacity-80" />
        <div className="absolute inset-x-0 bottom-0 h-[200px] bg-gradient-to-t from-void to-transparent z-10" />

        {/* Floating Astronaut Image */}
        <div className="absolute inset-0 flex items-center justify-center p-16 pb-36 z-0">
          <motion.img
            src="https://i.ibb.co/XrkdGrrv/original-ccdd6d6195fff2386a31b684b7abdd2e-removebg-preview.png"
            alt="AI CheckPoint Admin Astronaut"
            className="w-full h-full object-contain drop-shadow-[0_0_40px_rgba(201,162,107,0.2)]"
            initial={{ y: 0 }}
            animate={{ y: [-10, 10, -10] }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Branding banner */}
        <div className="relative z-20 flex flex-col gap-2 max-w-xs bg-void/75 backdrop-blur-md border border-white/10 p-5 rounded-2xl self-end">
          <h4 className="font-mono-acc text-[10px] uppercase tracking-wider text-cyan flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5" /> Secure Operations
          </h4>
          <p className="text-xs text-soft/80 leading-relaxed">
            Database access is encrypted and authenticated through Neon serverless protocols.
          </p>
        </div>

        {/* Typewriter Block */}
        <div className="relative z-20 flex flex-col items-center justify-end flex-grow pb-8">
          <blockquote className="space-y-3 text-center text-white backdrop-blur-sm bg-black/45 p-6 rounded-2xl border border-white/10 max-w-sm">
            <p className="text-sm font-light text-soft/90 leading-relaxed">
              “Administrative control interface. Review registrations, export files, and update business statuses.”
            </p>
          </blockquote>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getRegistrations();
      setRegistrations(data);
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to load registration records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const res = await deleteRegistration({ data: id });
      if (res && res.success) {
        toast.success("Registration deleted successfully.");
        setRegistrations((prev) => prev.filter((r) => r.id !== id));
      } else {
        toast.error("Failed to delete record.");
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Error occurred while deleting registration.");
    } finally {
      setDeletingId(null);
    }
  };

  const exportToCSV = () => {
    if (registrations.length === 0) {
      toast.warning("No registration records available to export.");
      return;
    }

    const headers = [
      "ID",
      "Full Name",
      "Phone",
      "Email",
      "City",
      "Business Name",
      "Industry",
      "Size",
      "Revenue Min",
      "Revenue Max",
      "Repetitive Staff",
      "Goals",
      "Source",
      "Best Contact Time",
      "Notes",
      "Created At"
    ];

    const rows = registrations.map((r) => [
      r.id,
      `"${(r.fullName || "").replace(/"/g, '""')}"`,
      `"${r.phone || ""}"`,
      `"${r.email || ""}"`,
      `"${r.city || ""}"`,
      `"${(r.businessName || "").replace(/"/g, '""')}"`,
      `"${r.industry || ""}"`,
      `"${r.size || ""}"`,
      (r.revenue && r.revenue[0]) !== undefined ? r.revenue[0] : 0,
      (r.revenue && r.revenue[1]) !== undefined ? r.revenue[1] : 0,
      r.manualStaff || 0,
      `"${(Array.isArray(r.goals) ? r.goals : []).join(", ")}"`,
      `"${r.source || ""}"`,
      `"${r.bestTime || ""}"`,
      `"${(r.notes || "").replace(/"/g, '""')}"`,
      r.createdAt ? new Date(r.createdAt).toISOString() : ""
    ]);

    const csvString = [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `aicp_registrations_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("CSV file downloaded successfully.");
  };

  // Filter logic
  const filtered = registrations.filter((r) => {
    const matchesSearch =
      r.fullName.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      r.businessName.toLowerCase().includes(search.toLowerCase()) ||
      r.city.toLowerCase().includes(search.toLowerCase());

    const matchesIndustry = selectedIndustry === "all" || r.industry === selectedIndustry;

    return matchesSearch && matchesIndustry;
  });

  // Extract unique industries for filter dropdown
  const uniqueIndustries = Array.from(new Set(registrations.map((r) => r.industry))).filter(Boolean);

  // Statistics calculation
  const totalSubscribers = registrations.length;
  const totalManualStaff = registrations.reduce((acc, r) => acc + (r.manualStaff || 0), 0);
  const avgStaffSavings = totalSubscribers > 0 ? (totalManualStaff / totalSubscribers).toFixed(1) : 0;
  
  // Estimate value pipeline: 2500 founders offer per sign up
  const valuePipeline = totalSubscribers * 2500;

  const toggleRow = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(val);
  };

  const fmtRevenueRange = (rev: any) => {
    if (!rev || !Array.isArray(rev) || rev.length < 2) return "N/A";
    const fmt = (n: number) => {
      if (typeof n !== "number" || isNaN(n)) return "0";
      return n >= 1000000
        ? `₹${(n / 1000000).toFixed(1)}M`
        : n >= 100000
        ? `₹${(n / 100000).toFixed(0)}L`
        : `₹${(n / 1000).toFixed(0)}K`;
    };
    return `${fmt(rev[0])} - ${fmt(rev[1])}`;
  };

  return (
    <div className="min-h-screen bg-void flex flex-col">
      {/* Header */}
      <header className="border-b border-white/5 bg-surface/30 backdrop-blur-md px-6 py-4 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={logoImage} alt="AI CheckPoint Logo" className="h-8 w-auto" />
            <span className="font-display text-lg font-bold tracking-tight text-white">
              AI.CheckPoint
            </span>
          </Link>
          <span className="text-[10px] font-mono-acc uppercase tracking-wider bg-cyan/5 text-cyan border border-cyan/15 px-2.5 py-0.5 rounded-full">
            Admin console
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 hover:bg-white/5 transition-colors disabled:opacity-50 text-soft/80 hover:text-white"
            title="Refresh database records"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin text-cyan" : ""}`} />
          </button>

          <button
            onClick={exportToCSV}
            className="hidden sm:flex h-9 items-center gap-2 px-3.5 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium text-soft/80 hover:text-white"
          >
            <Download className="h-4 w-4" /> Export CSV
          </button>

          <button
            onClick={onLogout}
            className="flex h-9 items-center gap-1.5 px-3.5 rounded-lg bg-white/5 border border-white/10 hover:bg-red-950/20 hover:border-red-500/20 hover:text-red-400 transition-colors text-sm font-medium"
          >
            <LogOut className="h-4 w-4" /> <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-white/5 bg-surface/20 p-5">
            <div className="flex items-center justify-between text-soft/50 mb-2">
              <span className="text-xs font-mono-acc uppercase tracking-wider">Total Audits</span>
              <Database className="h-4 w-4 text-cyan" />
            </div>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-display font-bold">{totalSubscribers}</span>
              <span className="text-[10px] text-green-400 font-mono flex items-center gap-0.5">
                <TrendingUp className="h-3 w-3" /> Live Neon DB
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-surface/20 p-5">
            <div className="flex items-center justify-between text-soft/50 mb-2">
              <span className="text-xs font-mono-acc uppercase tracking-wider">Revenue Pipeline</span>
              <Coins className="h-4 w-4 text-gold" />
            </div>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-display font-bold text-gold">
                {formatCurrency(valuePipeline)}
              </span>
              <span className="text-[10px] text-soft/40 font-mono">₹2.5K package</span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-surface/20 p-5">
            <div className="flex items-center justify-between text-soft/50 mb-2">
              <span className="text-xs font-mono-acc uppercase tracking-wider">Manual Workers</span>
              <Users className="h-4 w-4 text-indigo" />
            </div>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-display font-bold">{totalManualStaff}</span>
              <span className="text-[10px] text-cyan font-mono">Avg: {avgStaffSavings}/biz</span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-surface/20 p-5">
            <div className="flex items-center justify-between text-soft/50 mb-2">
              <span className="text-xs font-mono-acc uppercase tracking-wider">Database Size</span>
              <FileText className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-display font-bold">1 Table</span>
              <span className="text-[10px] text-emerald-400/80 font-mono">15 columns</span>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch justify-between">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-soft/40 pointer-events-none">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Search by name, email, business name, or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-white/5 bg-surface/30 pl-10 pr-4 py-2.5 text-sm text-soft placeholder:text-soft/30 focus:border-cyan focus:outline-none transition-colors"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="rounded-xl border border-white/5 bg-surface/30 px-4 py-2.5 text-sm text-soft focus:border-cyan focus:outline-none transition-colors"
            >
              <option value="all">All Industries</option>
              {uniqueIndustries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>

            <button
              onClick={exportToCSV}
              className="flex sm:hidden items-center justify-center w-11 rounded-xl border border-white/5 bg-surface/30 text-soft hover:bg-white/5 transition-colors"
              title="Export CSV"
            >
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Main List/Table section */}
        <div className="rounded-2xl border border-white/5 bg-surface/10 overflow-hidden">
          {loading ? (
            <div className="py-24 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan mb-4"></div>
              <p className="text-sm text-soft/50 font-mono-acc">Retrieving records from Neon DB...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-24 text-center text-soft/40">
              <Database className="h-8 w-8 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-medium">No registrations match your criteria.</p>
              <p className="text-xs mt-1">Try clearing searches or check back later.</p>
            </div>
          ) : (
            <div className="w-full text-sm">
              {/* Header row */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 bg-white/[0.02] text-soft/50 font-mono-acc text-[11px] uppercase tracking-wider items-center">
                <div className="col-span-1"></div>
                <div className="col-span-3">Company / Name</div>
                <div className="col-span-2">Industry / Size</div>
                <div className="col-span-3">Contact details</div>
                <div className="col-span-2">Date Registered</div>
                <div className="col-span-1 text-right">Actions</div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-white/5">
                {filtered.map((item) => {
                  const isExpanded = expandedId === item.id;
                  const isConfirmingDelete = deletingId === item.id;
                  const createdDate = new Date(item.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                  });
                  const goals = Array.isArray(item.goals) ? item.goals : [];

                  return (
                    <div
                      key={item.id}
                      className={`transition-colors hover:bg-white/[0.01] ${
                        isExpanded ? "bg-white/[0.01]" : ""
                      }`}
                    >
                      {/* Main row grid */}
                      <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
                        {/* Toggle chevron */}
                        <div className="col-span-1 flex items-center justify-start">
                          <button
                            onClick={() => toggleRow(item.id)}
                            className="p-1 rounded-md hover:bg-white/5 text-soft/60 hover:text-white transition-colors"
                          >
                            {isExpanded ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </button>
                        </div>

                        {/* Company / Name */}
                        <div className="col-span-11 md:col-span-3">
                          <div>
                            <div className="font-semibold text-white truncate">{item.businessName || "N/A"}</div>
                            <div className="text-xs text-soft/65 flex items-center gap-1.5 mt-0.5 truncate">
                              <User className="h-3 w-3 opacity-60 flex-shrink-0" /> {item.fullName || "N/A"}
                            </div>
                          </div>
                        </div>

                        {/* Industry / Size */}
                        <div className="col-span-6 md:col-span-2 mt-2 md:mt-0">
                          <div>
                            <div className="text-soft font-medium truncate">{item.industry || "N/A"}</div>
                            <div className="text-xs text-soft/65 flex items-center gap-1.5 mt-0.5 truncate">
                              <Briefcase className="h-3 w-3 opacity-60 flex-shrink-0" /> Size: {item.size || "N/A"}
                            </div>
                          </div>
                        </div>

                        {/* Contact details */}
                        <div className="col-span-6 md:col-span-3 mt-2 md:mt-0">
                          <div>
                            <div className="text-soft font-mono-acc text-xs truncate">{item.email || "N/A"}</div>
                            <div className="text-xs text-soft/65 mt-0.5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
                              {item.phone && <span className="font-mono-acc">+91 {item.phone}</span>}
                              {item.phone && item.city && <span>·</span>}
                              {item.city && (
                                <span className="flex items-center gap-0.5 truncate">
                                  <MapPin className="h-3 w-3 opacity-60 flex-shrink-0" /> {item.city}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Date Registered */}
                        <div className="col-span-6 md:col-span-2 mt-2 md:mt-0 text-soft/75">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 opacity-60 flex-shrink-0" />
                            <span>{createdDate}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="col-span-6 md:col-span-1 mt-2 md:mt-0 text-right flex items-center justify-end">
                          {isConfirmingDelete ? (
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="text-xs bg-red-950 border border-red-500/30 text-red-400 hover:bg-red-900 px-2 py-1 rounded transition-colors"
                              >
                                Yes
                              </button>
                              <button
                                onClick={() => setDeletingId(null)}
                                className="text-xs bg-white/5 border border-white/10 hover:bg-white/10 px-2 py-1 rounded transition-colors text-soft/80"
                              >
                                No
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeletingId(item.id)}
                              className="p-2 rounded-lg text-soft/40 hover:text-red-400 hover:bg-red-950/20 transition-all"
                              title="Delete Registration"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Collapsible details layout */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 md:px-12 py-6 bg-white/[0.003] border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-6">
                              {/* Column 1: Financial & Scale */}
                              <div className="space-y-4">
                                <h4 className="font-mono-acc text-[10px] uppercase tracking-wider text-cyan">
                                  Operational Scale
                                </h4>
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between text-xs border-b border-white/5 pb-1.5">
                                    <span className="text-soft/50 flex items-center gap-1.5">
                                      <Coins className="h-3.5 w-3.5 opacity-60" /> Est. Monthly Revenue
                                    </span>
                                    <span className="font-semibold text-soft">
                                      {fmtRevenueRange(item.revenue)}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between text-xs border-b border-white/5 pb-1.5">
                                    <span className="text-soft/50 flex items-center gap-1.5">
                                      <Users className="h-3.5 w-3.5 opacity-60" /> Repetitive Staff
                                    </span>
                                    <span className="font-semibold text-soft">
                                      {item.manualStaff || 0} workers
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between text-xs pb-1.5">
                                    <span className="text-soft/50 flex items-center gap-1.5">
                                      <Clock className="h-3.5 w-3.5 opacity-60" /> Best Time to Call
                                    </span>
                                    <span className="font-semibold text-cyan capitalize">
                                      {item.bestTime || "N/A"}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Column 2: Goals */}
                              <div className="space-y-3">
                                <h4 className="font-mono-acc text-[10px] uppercase tracking-wider text-cyan">
                                  Automation Goals
                                </h4>
                                {goals.length === 0 ? (
                                  <p className="text-xs text-soft/40 italic">No specific goals selected.</p>
                                ) : (
                                  <div className="flex flex-wrap gap-1.5">
                                    {goals.map((g: string) => (
                                      <span
                                        key={g}
                                        className="text-[11px] bg-cyan/5 text-cyan border border-cyan/15 rounded-full px-2.5 py-0.5"
                                      >
                                        ✓ {g}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>

                              {/* Column 3: Source and Notes */}
                              <div className="space-y-3">
                                <h4 className="font-mono-acc text-[10px] uppercase tracking-wider text-cyan">
                                  Referral & Notes
                                </h4>
                                <div className="space-y-2">
                                  <div className="text-xs flex gap-2">
                                    <span className="text-soft/50 w-20">Discovery:</span>
                                    <span className="font-semibold text-soft">{item.source || "Unknown"}</span>
                                  </div>
                                  <div className="text-xs">
                                    <span className="text-soft/50 block mb-1">Additional Notes:</span>
                                    <p className="text-soft/80 leading-relaxed bg-surface/50 border border-white/5 p-2 rounded-lg min-h-[50px] italic whitespace-pre-wrap">
                                      {item.notes || "No notes provided by client."}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
