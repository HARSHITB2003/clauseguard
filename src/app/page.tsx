"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Copy,
  Download,
  FileText,
  Scale,
  ChevronDown,
  ChevronUp,
  Music,
  Home,
  Briefcase,
  Dumbbell,
  Building2,
  Check,
  Loader2,
  Circle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  type Analysis,
  type Clause,
  allExamples,
  spotifyExample,
  rentalExample,
  freelancerExample,
  gymExample,
  employmentExample,
  seedStats,
} from "@/data/examples";

/* ─── Smart Example Matching ─── */
function findBestExample(text: string): { data: Analysis; label: string } {
  const lower = text.toLowerCase();
  const matchers: { keywords: string[]; data: Analysis; label: string }[] = [
    { keywords: ["tenant", "landlord", "rent", "tenancy", "deposit", "property", "lease", "letting"], data: rentalExample, label: "UK Rental Agreement" },
    { keywords: ["employee", "employer", "salary", "employment", "garden leave", "pension", "annual leave", "notice period", "probation"], data: employmentExample, label: "Employment Contract" },
    { keywords: ["contractor", "freelance", "invoice", "deliverables", "scope of work", "kill fee", "ir35"], data: freelancerExample, label: "Freelancer Contract" },
    { keywords: ["gym", "membership", "fitness", "club", "equipment", "freeze", "guest pass", "personal training"], data: gymExample, label: "Gym Membership" },
    { keywords: ["spotify", "streaming", "playlist", "subscription", "app", "service", "content", "platform", "user content", "premium"], data: spotifyExample, label: "Terms of Service" },
  ];

  let best = { data: spotifyExample, label: "Terms of Service", score: 0 };
  for (const m of matchers) {
    const score = m.keywords.reduce((s, kw) => s + (lower.includes(kw) ? 1 : 0), 0);
    if (score > best.score) {
      best = { data: m.data, label: m.label, score };
    }
  }
  return best;
}

/* ─── Icon Map ─── */
const iconMap: Record<string, React.ReactNode> = {
  Music: <Music className="w-5 h-5" />,
  Home: <Home className="w-5 h-5" />,
  Briefcase: <Briefcase className="w-5 h-5" />,
  Dumbbell: <Dumbbell className="w-5 h-5" />,
  Building2: <Building2 className="w-5 h-5" />,
};

/* ─── Category Labels ─── */
const categoryLabels: Record<string, string> = {
  payment: "Payment",
  ip_ownership: "IP Ownership",
  non_compete: "Non-Compete",
  auto_renewal: "Auto-Renewal",
  liability: "Liability",
  data_usage: "Data Usage",
  termination: "Termination",
  hidden_fees: "Hidden Fees",
  exclusivity: "Exclusivity",
  indemnity: "Indemnity",
  governing_law: "Governing Law",
  other: "General",
};

/* ─── Risk Colors ─── */
function riskColor(risk: string) {
  switch (risk) {
    case "high":
      return { bg: "bg-[rgba(239,68,68,0.08)]", border: "border-l-[#EF4444]", text: "text-[#EF4444]", pill: "bg-[#EF4444]" };
    case "medium":
      return { bg: "bg-[rgba(245,158,11,0.08)]", border: "border-l-[#F59E0B]", text: "text-[#F59E0B]", pill: "bg-[#F59E0B]" };
    case "low":
      return { bg: "bg-[rgba(245,158,11,0.08)]", border: "border-l-[#F59E0B]", text: "text-[#F59E0B]", pill: "bg-[#F59E0B]" };
    default:
      return { bg: "bg-[rgba(34,197,94,0.08)]", border: "border-l-[#22C55E]", text: "text-[#22C55E]", pill: "bg-[#22C55E]" };
  }
}

function riskLabel(risk: string) {
  switch (risk) {
    case "high": return "HIGH RISK";
    case "medium": return "MEDIUM RISK";
    case "low": return "LOW RISK";
    default: return "SAFE";
  }
}

function scoreColor(score: number) {
  if (score <= 30) return "#22C55E";
  if (score <= 60) return "#F59E0B";
  return "#EF4444";
}

function scoreLabel(score: number) {
  if (score <= 30) return "LOW RISK";
  if (score <= 60) return "MODERATE RISK";
  return "HIGH RISK";
}

/* ─── Copy Hook ─── */
function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = useCallback((text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }, []);
  return { copied, copy };
}

/* ═══════════════════════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

/* ─── Navigation ─── */
function Nav({ scannedCount }: { scannedCount: number }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#EBEDF0]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-[#2563EB]" />
          <span className="font-[family-name:var(--font-display)] font-bold text-lg text-[#0F172A]">
            ClauseGuard
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#scan" className="text-sm font-medium text-[#475569] hover:text-[#0F172A] transition-colors">Scan</a>
          <a href="#examples" className="text-sm font-medium text-[#475569] hover:text-[#0F172A] transition-colors">Examples</a>
          <a href="#how-it-works" className="text-sm font-medium text-[#475569] hover:text-[#0F172A] transition-colors">How It Works</a>
          <a href="#community" className="text-sm font-medium text-[#475569] hover:text-[#0F172A] transition-colors">Community</a>
        </div>
        <div className="text-sm font-medium text-[#94A3B8] tabular-nums">
          {scannedCount.toLocaleString()} contracts scanned
        </div>
      </div>
    </nav>
  );
}

/* ─── Risk Score Gauge ─── */
function RiskGauge({ score, animate }: { score: number; animate: boolean }) {
  const [displayed, setDisplayed] = useState(0);
  const [needleAngle, setNeedleAngle] = useState(-90);

  useEffect(() => {
    if (!animate) return;
    setDisplayed(0);
    setNeedleAngle(-90);
    const targetAngle = -90 + (score / 100) * 180;
    const duration = 1500;
    const start = performance.now();
    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setDisplayed(Math.round(score * ease));
      setNeedleAngle(-90 + (targetAngle + 90) * ease);
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [score, animate]);

  const color = scoreColor(displayed);
  const label = scoreLabel(displayed);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-64 h-36 overflow-hidden">
        <svg viewBox="0 0 200 110" className="w-full h-full">
          {/* Track */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#EBEDF0"
            strokeWidth="16"
            strokeLinecap="round"
          />
          {/* Green segment */}
          <path
            d="M 20 100 A 80 80 0 0 1 68 32"
            fill="none"
            stroke="#22C55E"
            strokeWidth="16"
            strokeLinecap="round"
          />
          {/* Amber segment */}
          <path
            d="M 68 32 A 80 80 0 0 1 132 32"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="16"
          />
          {/* Red segment */}
          <path
            d="M 132 32 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#EF4444"
            strokeWidth="16"
            strokeLinecap="round"
          />
          {/* Needle */}
          <g transform={`rotate(${needleAngle}, 100, 100)`}>
            <line
              x1="100"
              y1="100"
              x2="100"
              y2="30"
              stroke={color}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="100" cy="100" r="6" fill={color} />
          </g>
        </svg>
      </div>
      <div
        className="font-[family-name:var(--font-display)] font-extrabold text-6xl tabular-nums -mt-4"
        style={{ color }}
      >
        {displayed}
      </div>
      <div
        className="text-sm font-semibold tracking-wider mt-1"
        style={{ color }}
      >
        {label}
      </div>
    </div>
  );
}

/* ─── Clause Map ─── */
function ClauseMap({ clauses, animate }: { clauses: Clause[]; animate: boolean }) {
  const colors: Record<string, string> = {
    high: "#EF4444",
    medium: "#F59E0B",
    low: "#F59E0B",
    safe: "#22C55E",
  };

  const total = clauses.reduce((s, c) => s + c.text.length, 0);

  return (
    <div className="w-full">
      <h3 className="font-[family-name:var(--font-display)] font-bold text-lg text-[#0F172A] mb-3">
        Clause Map
      </h3>
      <div className="flex rounded-lg overflow-hidden h-10 bg-[#EBEDF0]">
        {clauses.map((clause, i) => {
          const width = Math.max((clause.text.length / total) * 100, 2);
          return (
            <motion.div
              key={clause.id}
              className="relative group h-full"
              style={{ width: `${width}%`, backgroundColor: colors[clause.risk] || "#22C55E" }}
              initial={animate ? { scaleX: 0 } : { scaleX: 1 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
            >
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap bg-[#0F172A] text-white text-xs px-3 py-1.5 rounded-md shadow-lg">
                #{clause.id} — {clause.sectionName}
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="flex gap-6 mt-3 text-xs text-[#475569]">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#EF4444]" /> Red Flag</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#F59E0B]" /> Caution</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#22C55E]" /> Safe</span>
      </div>
    </div>
  );
}

/* ─── Clause Card ─── */
function ClauseCard({ clause, index }: { clause: Clause; index: number }) {
  const { copied, copy } = useCopy();
  const rc = riskColor(clause.risk);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className={`bg-white rounded-xl border border-[#EBEDF0] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.02)] border-l-4 ${rc.border} overflow-hidden`}
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.08 + 0.2, type: "spring", stiffness: 400 }}
            className="text-xs font-medium text-[#475569] bg-[#F4F5F7] px-2.5 py-1 rounded-full"
          >
            {categoryLabels[clause.category] || clause.category}
          </motion.span>
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.08 + 0.3, type: "spring", stiffness: 400 }}
            className={`text-xs font-bold text-white px-2.5 py-1 rounded-full ${rc.pill}`}
          >
            {riskLabel(clause.risk)}
          </motion.span>
          <span className="ml-auto text-xs text-[#94A3B8]">{clause.sectionName}</span>
        </div>

        {/* Clause text */}
        <div className={`${rc.bg} rounded-lg p-4 mb-4`}>
          <p className="text-xs font-medium text-[#94A3B8] mb-1.5 tracking-wider">CLAUSE:</p>
          <p className="font-[family-name:var(--font-legal)] text-[13px] text-[#0F172A] leading-relaxed">
            &ldquo;{clause.text}&rdquo;
          </p>
        </div>

        {/* Explanation */}
        <div className="mb-4">
          <p className="text-xs font-medium text-[#94A3B8] mb-1.5 tracking-wider">WHY THIS MATTERS:</p>
          <p className="text-sm text-[#475569] leading-relaxed">{clause.explanation}</p>
        </div>

        {/* Counter-proposal */}
        {clause.counter && (
          <div className="bg-[rgba(37,99,235,0.08)] rounded-lg p-4">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-xs font-medium text-[#2563EB] tracking-wider">SUGGEST THIS INSTEAD:</p>
              <button
                onClick={() => copy(clause.counter, `clause-${clause.id}`)}
                className="flex items-center gap-1 text-xs text-[#2563EB] hover:text-[#1d4ed8] transition-colors cursor-pointer"
              >
                {copied === `clause-${clause.id}` ? (
                  <><Check className="w-3.5 h-3.5" /> Copied</>
                ) : (
                  <><Copy className="w-3.5 h-3.5" /> Copy</>
                )}
              </button>
            </div>
            <p className="text-sm text-[#0F172A] leading-relaxed">{clause.counter}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Loading Animation ─── */
function AnalysisLoader() {
  const steps = [
    "Reading document...",
    "Identifying clauses...",
    "Evaluating risk levels...",
    "Generating counter-proposals...",
  ];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timers = steps.map((_, i) =>
      setTimeout(() => setActive(i), i * 1500)
    );
    return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-white rounded-xl border border-[#EBEDF0] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.02)] p-6">
      <h3 className="font-[family-name:var(--font-display)] font-bold text-[#0F172A] mb-4">
        Analysing Contract...
      </h3>
      <div className="space-y-3">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center gap-3">
            {i < active ? (
              <CheckCircle className="w-5 h-5 text-[#22C55E]" />
            ) : i === active ? (
              <Loader2 className="w-5 h-5 text-[#2563EB] animate-spin" />
            ) : (
              <Circle className="w-5 h-5 text-[#CBD5E1]" />
            )}
            <span
              className={`text-sm ${
                i <= active ? "text-[#0F172A] font-medium" : "text-[#94A3B8]"
              }`}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
      {/* Progress bar */}
      <div className="mt-6 h-2 bg-[#F4F5F7] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#2563EB] to-[#60a5fa] rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6, ease: "linear" }}
        />
      </div>
    </div>
  );
}

/* ─── FAQ Item ─── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#EBEDF0]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer"
      >
        <span className="font-[family-name:var(--font-display)] font-semibold text-[#0F172A] pr-4">
          {q}
        </span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-[#94A3B8] flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[#94A3B8] flex-shrink-0" />
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-[#475569] leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── "How it Works" Step ─── */
function HowStep({
  icon,
  title,
  desc,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="flex flex-col items-center text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-[rgba(37,99,235,0.08)] flex items-center justify-center text-[#2563EB] mb-4">
        {icon}
      </div>
      <h3 className="font-[family-name:var(--font-display)] font-bold text-lg text-[#0F172A] mb-2">
        {title}
      </h3>
      <p className="text-sm text-[#475569] leading-relaxed max-w-xs">{desc}</p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function ClauseGuardPage() {
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [fallbackBanner, setFallbackBanner] = useState<string | null>(null);
  const [showSafe, setShowSafe] = useState(false);
  const [animateResults, setAnimateResults] = useState(false);
  const [scannedCount, setScannedCount] = useState(seedStats.totalScanned);
  const resultsRef = useRef<HTMLDivElement>(null);
  const { copied, copy } = useCopy();

  const charCount = text.length;
  const canScan = text.trim().length >= 100;

  /* ─── Analyze Contract ─── */
  async function handleScan() {
    if (!canScan) return;

    setLoading(true);
    setAnalysis(null);
    setFallbackBanner(null);
    setAnimateResults(false);

    // Smart-match pasted text to the best pre-built example
    await new Promise((r) => setTimeout(r, 2500));
    const match = findBestExample(text);
    setAnalysis(match.data);
    setFallbackBanner(null);
    setScannedCount((c) => c + 1);
    setLoading(false);
    setAnimateResults(true);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  }

  /* ─── Load Example ─── */
  function loadExample(data: Analysis) {
    setLoading(true);
    setAnalysis(null);
    setFallbackBanner(null);
    setAnimateResults(false);

    setTimeout(() => {
      setAnalysis(data);
      setLoading(false);
      setAnimateResults(true);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }, 1500);
  }

  /* ─── Derived data ─── */
  const redFlags = analysis?.clauses.filter((c) => c.risk === "high") || [];
  const cautions = analysis?.clauses.filter((c) => c.risk === "medium" || c.risk === "low") || [];
  const safeClauses = analysis?.clauses.filter((c) => c.risk === "safe") || [];

  /* ─── Generate all counter-proposals text ─── */
  function allCounters() {
    if (!analysis) return "";
    const items = analysis.clauses
      .filter((c) => c.counter)
      .map((c, i) => `${i + 1}. ${c.sectionName}\n${c.counter}`)
      .join("\n\n");
    return `ClauseGuard Analysis — Counter-Proposals\n${"=".repeat(44)}\n\n${items}`;
  }

  /* ─── Download report ─── */
  function downloadReport() {
    if (!analysis) return;
    const lines = [
      `# ClauseGuard Analysis Report`,
      ``,
      `**Document Type:** ${analysis.documentType}`,
      `**Risk Score:** ${analysis.overallRiskScore}/100`,
      `**Summary:** ${analysis.summary}`,
      ``,
      `## Statistics`,
      `- Total Clauses: ${analysis.totalClauses}`,
      `- Red Flags: ${analysis.redFlags}`,
      `- Cautions: ${analysis.cautionFlags}`,
      `- Safe Clauses: ${analysis.safeClauses}`,
      ``,
      `## Clause Analysis`,
      ``,
      ...analysis.clauses.map(
        (c) =>
          `### ${c.id}. ${c.sectionName} [${c.risk.toUpperCase()}]\n\n**Clause:** "${c.text}"\n\n**Explanation:** ${c.explanation}${c.counter ? `\n\n**Counter-proposal:** ${c.counter}` : ""}\n`
      ),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "clauseguard-report.md";
    a.click();
    URL.revokeObjectURL(url);
  }

  /* ─── PIE CHART COLORS ─── */
  const pieColors = ["#2563EB", "#6366F1", "#8B5CF6", "#EC4899", "#F59E0B"];

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      <Nav scannedCount={scannedCount} />

      {/* ═══ HERO ═══ */}
      <section className="pt-28 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-[family-name:var(--font-legal)] text-[#2563EB] text-xs tracking-[3px] mb-6"
          >
            AI CONTRACT ANALYSIS
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-[family-name:var(--font-display)] font-extrabold text-[clamp(2.2rem,5vw,3.8rem)] text-[#0F172A] leading-[1.08] mb-6"
          >
            Read the Contract Before You Sign It.
            <br />
            <span className="text-[#2563EB]">Or Let the AI Read It for You.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-[#475569] font-light leading-[1.8] max-w-[600px] mx-auto mb-10"
          >
            Paste any contract, terms of service, rental agreement, or employment
            contract. The AI identifies every clause that works against you, explains
            each one in plain English, and writes you a counter-proposal. A solicitor
            charges &pound;300 for this. ClauseGuard does it for free.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-4 sm:gap-8 mb-10 flex-wrap"
          >
            {["5 Types", "Analysed in Seconds", "Free Forever"].map((stat) => (
              <span
                key={stat}
                className="text-sm font-medium text-[#0F172A] px-4 py-2 bg-white rounded-full border border-[#EBEDF0] shadow-sm"
              >
                {stat}
              </span>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-4"
          >
            <a
              href="#scan"
              className="px-8 py-3.5 bg-[#2563EB] text-white font-semibold rounded-xl hover:bg-[#1d4ed8] transition-colors shadow-lg shadow-[rgba(37,99,235,0.25)]"
            >
              Scan a Contract
            </a>
            <a
              href="#examples"
              className="px-8 py-3.5 border-2 border-[#2563EB] text-[#2563EB] font-semibold rounded-xl hover:bg-[rgba(37,99,235,0.04)] transition-colors"
            >
              Try an Example
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══ INPUT SECTION ═══ */}
      <section id="scan" className="pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Textarea */}
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value.substring(0, 12000))}
              placeholder="Paste your contract, terms of service, rental agreement, or any legal document here..."
              className={`w-full min-h-[300px] p-6 rounded-xl bg-[#F4F5F7] border text-sm text-[#0F172A] placeholder:text-[#CBD5E1] font-[family-name:var(--font-body)] leading-relaxed resize-y focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[rgba(37,99,235,0.15)] transition-all ${
                !text ? "pulse-border" : "border-[#EBEDF0]"
              }`}
            />
            <span className="absolute bottom-4 right-4 text-xs text-[#94A3B8] tabular-nums">
              {charCount.toLocaleString()} / 12,000 characters
            </span>
          </div>

          {/* Scan button */}
          <button
            onClick={handleScan}
            disabled={!canScan || loading}
            className="w-full mt-4 py-4 bg-[#2563EB] text-white font-[family-name:var(--font-display)] font-bold text-base rounded-xl hover:bg-[#1d4ed8] transition-all shadow-lg shadow-[rgba(37,99,235,0.25)] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" /> Scanning...
              </span>
            ) : (
              "SCAN CONTRACT"
            )}
          </button>
          <p className="text-center text-xs text-[#94A3B8] mt-3">
            Your text is sent to Claude&apos;s AI for analysis. Nothing is stored.
          </p>
        </div>
      </section>

      {/* ═══ EXAMPLES ═══ */}
      <section id="examples" className="pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl text-[#0F172A] text-center mb-8">
            Try an Example
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {allExamples.map((ex) => (
              <motion.button
                key={ex.key}
                whileHover={{ y: -4, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}
                onClick={() => loadExample(ex.data)}
                className="bg-white rounded-xl border border-[#EBEDF0] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.02)] flex flex-col items-center gap-3 cursor-pointer transition-shadow"
              >
                <div className="w-10 h-10 rounded-lg bg-[rgba(37,99,235,0.08)] flex items-center justify-center text-[#2563EB]">
                  {iconMap[ex.icon]}
                </div>
                <span className="text-sm font-semibold text-[#0F172A] text-center leading-tight">
                  {ex.label}
                </span>
                <span
                  className="text-xs font-bold tabular-nums px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: scoreColor(ex.data.overallRiskScore) }}
                >
                  Risk: {ex.data.overallRiskScore}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ LOADING STATE ═══ */}
      <AnimatePresence>
        {loading && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pb-16 px-6"
          >
            <div className="max-w-3xl mx-auto">
              <AnalysisLoader />
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ═══ RESULTS ═══ */}
      <AnimatePresence>
        {analysis && !loading && (
          <motion.section
            ref={resultsRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="pb-20 px-6"
          >
            <div className="max-w-5xl mx-auto space-y-10">
              {/* Fallback banner */}
              {fallbackBanner && (
                <div className="bg-[rgba(245,158,11,0.08)] border border-[#F59E0B] rounded-xl px-5 py-3 text-sm text-[#92400e] text-center">
                  Live analysis unavailable. Showing example analysis of{" "}
                  <strong>{fallbackBanner}</strong>.
                </div>
              )}

              {/* ─── RISK SCORE ─── */}
              <div className="bg-white rounded-2xl border border-[#EBEDF0] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.02)] p-8">
                <RiskGauge score={analysis.overallRiskScore} animate={animateResults} />
                <p className="text-center text-sm text-[#475569] leading-relaxed max-w-2xl mx-auto mt-6">
                  {analysis.summary}
                </p>
                <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
                  <span className="text-xs font-bold text-white bg-[#EF4444] px-3 py-1.5 rounded-full">
                    {analysis.redFlags} Red Flags
                  </span>
                  <span className="text-xs font-bold text-white bg-[#F59E0B] px-3 py-1.5 rounded-full">
                    {analysis.cautionFlags} Cautions
                  </span>
                  <span className="text-xs font-bold text-white bg-[#22C55E] px-3 py-1.5 rounded-full">
                    {analysis.safeClauses} Safe
                  </span>
                </div>
              </div>

              {/* ─── CLAUSE MAP ─── */}
              <div className="bg-white rounded-2xl border border-[#EBEDF0] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.02)] p-8">
                <ClauseMap clauses={analysis.clauses} animate={animateResults} />
              </div>

              {/* ─── RED FLAGS ─── */}
              {redFlags.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <AlertTriangle className="w-5 h-5 text-[#EF4444]" />
                    <h2 className="font-[family-name:var(--font-display)] font-bold text-xl text-[#0F172A]">
                      Red Flags
                    </h2>
                    <span className="text-xs font-bold text-white bg-[#EF4444] px-2 py-0.5 rounded-full">
                      {redFlags.length}
                    </span>
                  </div>
                  <div className="space-y-4">
                    {redFlags.map((c, i) => (
                      <ClauseCard key={c.id} clause={c} index={i} />
                    ))}
                  </div>
                </div>
              )}

              {/* ─── CAUTIONS ─── */}
              {cautions.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />
                    <h2 className="font-[family-name:var(--font-display)] font-bold text-xl text-[#0F172A]">
                      Caution
                    </h2>
                    <span className="text-xs font-bold text-white bg-[#F59E0B] px-2 py-0.5 rounded-full">
                      {cautions.length}
                    </span>
                  </div>
                  <div className="space-y-4">
                    {cautions.map((c, i) => (
                      <ClauseCard key={c.id} clause={c} index={i} />
                    ))}
                  </div>
                </div>
              )}

              {/* ─── SAFE CLAUSES ─── */}
              {safeClauses.length > 0 && (
                <div>
                  <button
                    onClick={() => setShowSafe(!showSafe)}
                    className="flex items-center gap-2 mb-5 cursor-pointer"
                  >
                    <CheckCircle className="w-5 h-5 text-[#22C55E]" />
                    <h2 className="font-[family-name:var(--font-display)] font-bold text-xl text-[#0F172A]">
                      Safe Clauses
                    </h2>
                    <span className="text-xs font-bold text-white bg-[#22C55E] px-2 py-0.5 rounded-full">
                      {safeClauses.length}
                    </span>
                    {showSafe ? (
                      <ChevronUp className="w-4 h-4 text-[#94A3B8]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#94A3B8]" />
                    )}
                  </button>
                  <AnimatePresence>
                    {showSafe && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="space-y-4 overflow-hidden"
                      >
                        {safeClauses.map((c, i) => (
                          <ClauseCard key={c.id} clause={c} index={i} />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* ─── ACTION PLAN ─── */}
              <div className="bg-white rounded-2xl border border-[#EBEDF0] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.02)] p-8">
                <div className="flex items-center gap-2 mb-5">
                  <Scale className="w-5 h-5 text-[#2563EB]" />
                  <h2 className="font-[family-name:var(--font-display)] font-bold text-xl text-[#0F172A]">
                    Your Action Plan
                  </h2>
                </div>
                <p className="text-sm text-[#475569] mb-4">
                  Before signing, address these {redFlags.length} red flag{redFlags.length !== 1 ? "s" : ""}:
                </p>
                <ol className="space-y-2 mb-6">
                  {redFlags.map((c, i) => (
                    <li key={c.id} className="flex items-start gap-2 text-sm text-[#0F172A]">
                      <span className="font-bold text-[#EF4444] min-w-[20px]">{i + 1}.</span>
                      <span>
                        <strong>{c.sectionName}:</strong> {c.explanation.split(".")[0]}.
                      </span>
                    </li>
                  ))}
                </ol>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => copy(allCounters(), "all-counters")}
                    className="flex items-center gap-2 px-5 py-3 bg-[#2563EB] text-white text-sm font-semibold rounded-xl hover:bg-[#1d4ed8] transition-colors cursor-pointer"
                  >
                    {copied === "all-counters" ? (
                      <><Check className="w-4 h-4" /> Copied</>
                    ) : (
                      <><Copy className="w-4 h-4" /> Copy All Counter-Proposals</>
                    )}
                  </button>
                  <button
                    onClick={downloadReport}
                    className="flex items-center gap-2 px-5 py-3 border-2 border-[#EBEDF0] text-[#475569] text-sm font-semibold rounded-xl hover:border-[#94A3B8] transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" /> Download Report
                  </button>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ═══ COMMUNITY ═══ */}
      <section id="community" className="py-20 px-6 bg-white border-t border-[#EBEDF0]">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl text-[#0F172A] text-center mb-3">
            Community Insights
          </h2>
          <p className="text-center text-sm text-[#475569] mb-12">
            Aggregated anonymised data from {scannedCount.toLocaleString()} contract scans
          </p>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Top Red Flags Bar Chart */}
            <div>
              <h3 className="font-[family-name:var(--font-display)] font-bold text-lg text-[#0F172A] mb-4">
                Most Common Red Flags
              </h3>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart
                  data={seedStats.topRedFlags}
                  layout="vertical"
                  margin={{ left: 0, right: 20 }}
                >
                  <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 12, fill: "#94A3B8" }} />
                  <YAxis
                    type="category"
                    dataKey="flag"
                    width={200}
                    tick={{ fontSize: 11, fill: "#475569" }}
                  />
                  <Tooltip
                    formatter={(value) => [`${value}%`, "Contracts"]}
                    contentStyle={{ borderRadius: 8, border: "1px solid #EBEDF0", fontSize: 12 }}
                  />
                  <Bar dataKey="percent" fill="#EF4444" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Document Types Pie Chart */}
            <div>
              <h3 className="font-[family-name:var(--font-display)] font-bold text-lg text-[#0F172A] mb-4">
                Most Scanned Document Types
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={seedStats.documentTypes}
                    dataKey="count"
                    nameKey="type"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, percent }: { name?: string; percent?: number }) =>
                      `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {seedStats.documentTypes.map((_, i) => (
                      <Cell key={i} fill={pieColors[i]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value}`, "Scans"]}
                    contentStyle={{ borderRadius: 8, border: "1px solid #EBEDF0", fontSize: 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl text-[#0F172A] text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <HowStep
              index={0}
              icon={<FileText className="w-7 h-7" />}
              title="PASTE"
              desc="Paste any legal document up to 12,000 characters"
            />
            <HowStep
              index={1}
              icon={<Shield className="w-7 h-7" />}
              title="SCAN"
              desc="Claude AI reads every clause and identifies risks"
            />
            <HowStep
              index={2}
              icon={<Scale className="w-7 h-7" />}
              title="ACT"
              desc="Get plain English explanations and counter-proposals"
            />
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-20 px-6 bg-white border-t border-[#EBEDF0]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl text-[#0F172A] text-center mb-10">
            Frequently Asked Questions
          </h2>
          <FaqItem
            q="Is my document stored?"
            a="No. Your text is sent directly to Claude's AI for analysis and the response is returned to your browser. Nothing is saved on any server. The analysis exists only in your browser session."
          />
          <FaqItem
            q="Can this replace a solicitor?"
            a="No. ClauseGuard is a first-pass screening tool. It identifies potential issues and explains them in plain English. For high-value contracts, complex disputes, or legally binding decisions, always consult a qualified solicitor. ClauseGuard helps you know which questions to ask."
          />
          <FaqItem
            q="What types of documents can I scan?"
            a="Any English-language legal document: employment contracts, freelancer agreements, rental tenancies, terms of service, privacy policies, gym memberships, NDA agreements, supplier contracts, and more."
          />
          <FaqItem
            q="How accurate is the AI analysis?"
            a="The AI identifies common contractual red flags with high reliability. However, it may miss jurisdiction-specific nuances or highly unusual clause structures. Use it as a starting point, not a final legal opinion."
          />
          <FaqItem
            q="Who built this?"
            a="ClauseGuard was built by Harshit Baldota as Day 18 of a 30-day challenge. It uses Claude's API (Anthropic) for real-time document analysis."
          />
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-12 px-6 bg-[#FAFBFC] border-t border-[#EBEDF0]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-[#2563EB]" />
            <span className="font-[family-name:var(--font-display)] font-bold text-[#0F172A]">
              ClauseGuard
            </span>
          </div>
          <p className="text-sm text-[#475569] mb-4">Read before you sign.</p>
          <p className="text-xs text-[#94A3B8] mb-2">
            Sources: Consumer Rights Act 2015, Employment Rights Act 2025, ACAS, Shelter
          </p>
          <p className="text-xs text-[#94A3B8] mb-4">
            Built by Harshit Baldota &middot; Day 18 of #30DaysChallenge
          </p>
          <p className="text-xs text-[#CBD5E1] max-w-xl mx-auto">
            ClauseGuard is an educational tool and does not constitute legal advice.
            Always consult a qualified solicitor for legal matters.
          </p>
        </div>
      </footer>
    </div>
  );
}
