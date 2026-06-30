import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { StepProgress } from "./StepProgress";
import { SuccessState } from "./SuccessState";
import { step1Schema, step2Schema, step3Schema, fullSchema } from "@/lib/registration-schema";
import { submitRegistration } from "@/lib/db-actions";
import { industries } from "@/lib/industries";
import { ChevronDown } from "lucide-react";

type State = {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  businessName: string;
  industry: string;
  size: "solo" | "2-10" | "11-50" | "50+";
  revenue: [number, number];
  manualStaff: number;
  goals: string[];
  source: string;
  bestTime: "morning" | "afternoon" | "evening";
  notes: string;
};

const initial: State = {
  fullName: "",
  phone: "",
  email: "",
  city: "",
  businessName: "",
  industry: "",
  size: "solo",
  revenue: [0, 1000000],
  manualStaff: 0,
  goals: [],
  source: "",
  bestTime: "morning",
  notes: "",
};

const goalsList = [
  "Reduce labor costs",
  "Save time",
  "Reduce errors",
  "Better customer service",
  "Automate reports",
  "Inventory management",
  "Improve delivery",
  "Scale faster",
];

const sources = ["Social media", "Referral", "Walk-in pitch", "Google", "Other"];

const sizes: Array<{ v: State["size"]; label: string }> = [
  { v: "solo", label: "Just me" },
  { v: "2-10", label: "2–10 people" },
  { v: "11-50", label: "11–50 people" },
  { v: "50+", label: "50+ people" },
];

const times: Array<{ v: State["bestTime"]; label: string }> = [
  { v: "morning", label: "Morning · 9–12" },
  { v: "afternoon", label: "Afternoon · 12–4" },
  { v: "evening", label: "Evening · 4–7" },
];

const inputCls =
  "w-full rounded-xl border border-indigo/30 bg-surface px-4 py-3 text-sm text-soft placeholder:text-soft/35 focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/30 transition-colors";

const fmtRevenue = (n: number) =>
  n >= 1000000
    ? "₹10L+"
    : n >= 100000
      ? `₹${(n / 100000).toFixed(1)}L`
      : `₹${(n / 1000).toFixed(0)}K`;

export function RegisterForm() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [state, setState] = useState<State>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [dir, setDir] = useState<1 | -1>(1);
  const [industryOpen, setIndustryOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const services = params.get("services");
      if (services) {
        setState((s) => ({
          ...s,
          notes: s.notes
            ? `${s.notes}\n\nSelected checkpoints: ${services}`
            : `Selected checkpoints: ${services}`,
        }));
      }
    }
  }, []);

  const set = <K extends keyof State>(k: K, v: State[K]) => setState((s) => ({ ...s, [k]: v }));

  const next = async () => {
    const schema = step === 1 ? step1Schema : step === 2 ? step2Schema : step3Schema;
    const result = schema.safeParse(state);
    if (!result.success) {
      const errs: Record<string, string> = {};
      for (const issue of result.error.issues) errs[issue.path.join(".")] = issue.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    if (step < 3) {
      setDir(1);
      setStep((s) => (s + 1) as 1 | 2 | 3);
    } else {
      const full = fullSchema.safeParse(state);
      if (!full.success) return;

      setIsSubmitting(true);
      setSubmitError(null);
      try {
        localStorage.setItem("aicp.registration", JSON.stringify(full.data));
        const res = await submitRegistration({ data: full.data });
        if (res && res.success) {
          setSubmitted(true);
        } else {
          setSubmitError("Failed to save registration. Please try again.");
        }
      } catch (err: any) {
        console.error("Failed to submit registration:", err);
        setSubmitError(err.message || "Failed to submit. Please check your internet connection.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const back = () => {
    if (step > 1 && !isSubmitting) {
      setDir(-1);
      setStep((s) => (s - 1) as 1 | 2 | 3);
    }
  };

  if (submitted) return <SuccessState />;

  return (
    <div className="relative">
      <StepProgress step={step} />

      <div className="relative mt-10 overflow-hidden">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div
            key={step}
            custom={dir}
            initial={{ opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 1 && (
              <div>
                <h2 className="font-display text-2xl font-bold text-soft">
                  Tell us about yourself
                </h2>
                <div className="mt-6 grid gap-4">
                  <Field label="Full name" error={errors.fullName}>
                    <input
                      className={inputCls}
                      placeholder="Rajesh Kumar"
                      value={state.fullName}
                      onChange={(e) => set("fullName", e.target.value)}
                    />
                  </Field>
                  <Field label="Phone number" error={errors.phone}>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono-acc text-xs text-soft/55">
                        +91
                      </span>
                      <input
                        className={`${inputCls} pl-14`}
                        placeholder="98765 43210"
                        value={state.phone}
                        onChange={(e) => set("phone", e.target.value)}
                      />
                    </div>
                  </Field>
                  <Field label="Email address" error={errors.email}>
                    <input
                      type="email"
                      className={inputCls}
                      placeholder="you@yourbusiness.com"
                      value={state.email}
                      onChange={(e) => set("email", e.target.value)}
                    />
                  </Field>
                  <Field label="City" error={errors.city}>
                    <input
                      className={inputCls}
                      placeholder="Bengaluru, Mumbai, Delhi…"
                      value={state.city}
                      onChange={(e) => set("city", e.target.value)}
                    />
                  </Field>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="font-display text-2xl font-bold text-soft">About your business</h2>
                <div className="mt-6 grid gap-4">
                  <Field label="Business name" error={errors.businessName}>
                    <input
                      className={inputCls}
                      placeholder="Sharma Supermart"
                      value={state.businessName}
                      onChange={(e) => set("businessName", e.target.value)}
                    />
                  </Field>

                  <Field label="Industry" error={errors.industry}>
                    <button
                      type="button"
                      onClick={() => setIndustryOpen((v) => !v)}
                      className={`${inputCls} flex items-center justify-between text-left`}
                    >
                      {state.industry || <span className="text-soft/40">Select your industry</span>}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${industryOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence>
                      {industryOpen && (
                        <motion.ul
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          className="mt-2 max-h-64 overflow-y-auto rounded-xl border border-indigo/30 bg-surface p-2"
                        >
                          {industries.map((ind) => {
                            const Icon = ind.icon;
                            return (
                              <li key={ind.name}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    set("industry", ind.name);
                                    setIndustryOpen(false);
                                  }}
                                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-soft hover:bg-soft/5"
                                >
                                  <Icon className="h-4 w-4 text-soft/70" strokeWidth={1.5} />{" "}
                                  {ind.name}
                                </button>
                              </li>
                            );
                          })}
                          <li>
                            <button
                              type="button"
                              onClick={() => {
                                set("industry", "Other");
                                setIndustryOpen(false);
                              }}
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-soft hover:bg-soft/5"
                            >
                              Other
                            </button>
                          </li>
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </Field>

                  <Field label="Business size">
                    <div className="flex flex-wrap gap-2">
                      {sizes.map((s) => (
                        <button
                          key={s.v}
                          type="button"
                          onClick={() => set("size", s.v)}
                          className={`rounded-full px-4 py-2 text-sm transition-all ${state.size === s.v ? "bg-gradient-primary text-void" : "border border-indigo/30 bg-surface text-soft/70 hover:border-cyan/50"}`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </Field>

                  <Field
                    label={`Monthly revenue · ${fmtRevenue(state.revenue[0])} – ${fmtRevenue(state.revenue[1])}`}
                  >
                    <div className="flex flex-col gap-3 rounded-xl border border-indigo/30 bg-surface p-4">
                      <input
                        type="range"
                        min={0}
                        max={1000000}
                        step={10000}
                        value={state.revenue[0]}
                        onChange={(e) =>
                          set("revenue", [
                            Math.min(+e.target.value, state.revenue[1]),
                            state.revenue[1],
                          ])
                        }
                        className="accent-cyan"
                      />
                      <input
                        type="range"
                        min={0}
                        max={1000000}
                        step={10000}
                        value={state.revenue[1]}
                        onChange={(e) =>
                          set("revenue", [
                            state.revenue[0],
                            Math.max(+e.target.value, state.revenue[0]),
                          ])
                        }
                        className="accent-cyan"
                      />
                    </div>
                  </Field>

                  <Field label="Staff doing manual / repetitive tasks" error={errors.manualStaff}>
                    <input
                      type="number"
                      min={0}
                      max={200}
                      className={inputCls}
                      value={state.manualStaff}
                      onChange={(e) => set("manualStaff", +e.target.value)}
                    />
                  </Field>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="font-display text-2xl font-bold text-soft">
                  What do you want to improve?
                </h2>
                <div className="mt-6 grid gap-5">
                  <Field label="Pick your goals (select all that apply)" error={errors.goals}>
                    <div className="grid grid-cols-2 gap-2">
                      {goalsList.map((g) => {
                        const sel = state.goals.includes(g);
                        return (
                          <button
                            key={g}
                            type="button"
                            onClick={() =>
                              set(
                                "goals",
                                sel ? state.goals.filter((x) => x !== g) : [...state.goals, g],
                              )
                            }
                            className={`rounded-xl px-3 py-2.5 text-left text-sm transition-all ${sel ? "bg-gradient-primary text-void" : "border border-indigo/30 bg-surface text-soft/75 hover:border-cyan/50"}`}
                          >
                            <span className="mr-2">{sel ? "✓" : "+"}</span>
                            {g}
                          </button>
                        );
                      })}
                    </div>
                  </Field>

                  <Field label="How did you hear about us?" error={errors.source}>
                    <select
                      value={state.source}
                      onChange={(e) => set("source", e.target.value)}
                      className={inputCls}
                    >
                      <option value="">Select…</option>
                      {sources.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Best time to call?">
                    <div className="flex flex-wrap gap-2">
                      {times.map((t) => (
                        <button
                          key={t.v}
                          type="button"
                          onClick={() => set("bestTime", t.v)}
                          className={`rounded-full px-4 py-2 text-sm transition-all ${state.bestTime === t.v ? "bg-gradient-primary text-void" : "border border-indigo/30 bg-surface text-soft/70 hover:border-cyan/50"}`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </Field>

                  <Field label="Anything else?">
                    <textarea
                      rows={4}
                      value={state.notes}
                      onChange={(e) => set("notes", e.target.value)}
                      placeholder="Tell us anything else…"
                      className={inputCls}
                    />
                  </Field>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex items-center justify-between gap-3">
        {step > 1 ? (
          <button
            type="button"
            onClick={back}
            disabled={isSubmitting}
            className={`inline-flex h-12 items-center rounded-full border border-soft/25 px-5 text-sm text-soft/80 hover:border-cyan hover:text-cyan ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            ← Back
          </button>
        ) : (
          <span />
        )}
        <button
          type="button"
          onClick={next}
          disabled={isSubmitting}
          data-cursor="cta"
          className={`pulse-glow inline-flex h-14 flex-1 items-center justify-center rounded-full bg-gradient-primary font-semibold text-void transition-transform hover:scale-[1.01] ${step > 1 ? "max-w-[60%]" : ""} ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-void"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Saving...
            </span>
          ) : step === 3 ? (
            "Submit & Book My Free Audit →"
          ) : (
            "Next →"
          )}
        </button>
      </div>
      {submitError && (
        <p className="mt-4 text-center text-sm text-red-400 font-medium">{submitError}</p>
      )}
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="font-mono-acc mb-2 block text-[11px] uppercase tracking-wider text-soft/55">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}
