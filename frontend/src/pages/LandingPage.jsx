import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle2,
  CircleDollarSign,
  GraduationCap,
  LineChart,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from 'lucide-react'
import { Badge, Button, Card, ProgressBar } from '../components'

/* ── animation variants ─────────────────────────────────────────── */
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
}

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

const cardReveal = {
  hidden:  { opacity: 0, y: 32, rotateX: 6 },
  visible: { opacity: 1, y: 0,  rotateX: 0,
    transition: { delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

/* ── once-per-mount page-reveal style ───────────────────────────── */
const PAGE_CSS = `
  @keyframes lp-reveal {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .lp-enter { animation: lp-reveal 0.55s cubic-bezier(0.22,1,0.36,1) both; }
`

export default function LandingPage() {
  const styleRef = useRef(false)
  useEffect(() => {
    if (styleRef.current) return
    styleRef.current = true
    const el = document.createElement('style')
    el.textContent = PAGE_CSS
    document.head.appendChild(el)
  }, [])

  const features = [
    { icon: Brain,       title: 'Decision intelligence',
      description: 'Unify career fit, country strategy, program ROI, and readiness scores in one planning model.' },
    { icon: WalletCards, title: 'Loan command center',
      description: 'Compare repayment paths, monthly cash flow, interest exposure, and prepayment impact.' },
    { icon: ShieldCheck, title: 'Readiness controls',
      description: 'Track visa, profile, funding, living setup, and mentorship milestones with clear ownership.' },
  ]

  const metrics = [
    ['Funding readiness', 78, 'Rs 45L plan'],
    ['Visa confidence',   86, 'Low risk'],
    ['Profile strength',  72, '3 gaps left'],
  ]

  const workflow = [
    'Career fit', 'Program shortlist', 'Funding model',
    'Visa readiness', 'Mentor review', 'Arrival plan',
  ]

  return (
    <div className="lp-enter overflow-hidden">

      {/* ════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════ */}
      <section
        className="relative"
        style={{
          /* Light-blue gradient + subtle dot-grid — matches reference */
          background:
            'linear-gradient(160deg, #e8f4ff 0%, #dbeeff 28%, #e4f0fb 55%, #f0f7ff 78%, #ffffff 100%)',
        }}
      >
        {/* Dot-grid overlay */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, zIndex: 0,
            backgroundImage:
              'radial-gradient(circle, rgba(100,130,200,0.18) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            pointerEvents: 'none',
          }}
        />

        {/* Soft colour blooms */}
        <div aria-hidden="true" style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none' }}>
          <div style={{
            position:'absolute', top:'-8%', right:'5%',
            width:'42vw', height:'42vw', borderRadius:'50%',
            background:'radial-gradient(circle, rgba(99,91,255,0.10) 0%, transparent 65%)',
            filter:'blur(50px)',
          }}/>
          <div style={{
            position:'absolute', bottom:'-10%', left:'10%',
            width:'38vw', height:'38vw', borderRadius:'50%',
            background:'radial-gradient(circle, rgba(0,180,240,0.10) 0%, transparent 65%)',
            filter:'blur(60px)',
          }}/>
        </div>

        <div
          className="page-shell relative z-10 grid min-h-[calc(100vh-5rem)] items-center
                     gap-14 py-20 lg:grid-cols-[0.92fr_1.08fr] lg:py-24"
        >
          {/* ── Left: Hero copy ── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {/* Pill / kicker */}
            <motion.div variants={fadeUp}>
              <span
                className="mb-7 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold"
                style={{
                  background: 'rgba(99,91,255,0.10)',
                  color: '#635bff',
                  border: '1px solid rgba(99,91,255,0.22)',
                }}
              >
                <Sparkles className="h-3.5 w-3.5" />
                AI operating system for student decisions
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="max-w-xl text-5xl font-semibold tracking-[-0.05em] text-[#0a2540]
                         sm:text-6xl lg:text-[3.6rem] xl:text-7xl"
              style={{ lineHeight: 1.08 }}
            >
              Financial clarity for every career move abroad.
            </motion.h1>

            {/* Sub-text */}
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-lg text-base leading-7 text-slate-500 sm:text-lg"
            >
              CareerCapital turns admissions, loans, visa readiness, mentorship,
              and living-cost planning into a single executive-grade workspace.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Link to="/signup">
                <Button
                  size="lg"
                  className="w-full gap-2 sm:w-auto"
                  style={{
                    background: '#0a2540',
                    color: '#fff',
                    borderRadius: '99px',
                    fontWeight: 600,
                    padding: '0.75rem 1.75rem',
                  }}
                >
                  Start free <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full gap-2 sm:w-auto"
                  style={{
                    borderRadius: '99px',
                    fontWeight: 600,
                    padding: '0.75rem 1.75rem',
                    background: 'rgba(255,255,255,0.70)',
                    border: '1.5px solid rgba(10,37,64,0.14)',
                    color: '#0a2540',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  View dashboard
                </Button>
              </Link>
            </motion.div>

            {/* Benefit points */}
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap gap-x-7 gap-y-2.5 text-sm font-medium text-slate-500"
            >
              {[
                'No scattered spreadsheets',
                'AI-guided next steps',
                'Built for repeat planning',
              ].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Workspace card preview ── */}
          <motion.div
            variants={cardReveal}
            initial="hidden"
            animate="visible"
            className="relative perspective-1000"
          >
            {/* Bloom behind card */}
            <div
              aria-hidden="true"
              className="absolute -inset-8 -z-10 rounded-[2.5rem] blur-2xl"
              style={{
                background:
                  'radial-gradient(circle at 20% 20%, rgba(99,91,255,0.20), transparent 40%),' +
                  'radial-gradient(circle at 80% 20%, rgba(0,212,255,0.18), transparent 38%),' +
                  'radial-gradient(circle at 55% 80%, rgba(0,200,150,0.14), transparent 38%)',
              }}
            />

            {/* Card shell */}
            <div
              className="rounded-[1.75rem] p-3 shadow-[0_30px_110px_rgba(10,37,64,0.18)]"
              style={{
                background: 'rgba(255,255,255,0.80)',
                border: '1px solid rgba(255,255,255,0.80)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div
                className="rounded-[1.35rem] p-4"
                style={{
                  background: '#f7fafc',
                  border: '1px solid rgba(203,213,225,0.55)',
                }}
              >
                {/* Card header */}
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#0a2540]">
                      CareerCapital workspace
                    </p>
                    <p className="text-xs text-slate-400">Fall 2026 planning board</p>
                  </div>
                  <span
                    className="rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      background: 'rgba(16,185,129,0.12)',
                      color: '#059669',
                      border: '1px solid rgba(16,185,129,0.25)',
                    }}
                  >
                    Live plan
                  </span>
                </div>

                {/* Main grid */}
                <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                  {/* MS Data Science card */}
                  <div
                    className="rounded-2xl p-5 text-white shadow-[0_18px_60px_rgba(10,37,64,0.22)]"
                    style={{ background: '#0a2540' }}
                  >
                    <div className="mb-7 flex items-center justify-between">
                      <GraduationCap className="h-8 w-8 text-cyan-300" />
                      <span
                        className="rounded-full px-3 py-1 text-xs font-semibold"
                        style={{ background: 'rgba(255,255,255,0.12)' }}
                      >
                        82% ready
                      </span>
                    </div>
                    <p className="text-sm text-slate-300">Recommended path</p>
                    <p className="mt-2 text-3xl font-semibold tracking-tight">
                      MS Data Science
                    </p>
                    <p className="mt-4 max-w-xs text-sm leading-6 text-slate-300">
                      Canada or Germany, 18-24 month route with strong repayment potential.
                    </p>
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <div
                        className="rounded-xl p-3"
                        style={{ background: 'rgba(255,255,255,0.10)' }}
                      >
                        <p className="text-xs text-slate-300">ROI score</p>
                        <p className="text-xl font-semibold">8.2</p>
                      </div>
                      <div
                        className="rounded-xl p-3"
                        style={{ background: 'rgba(255,255,255,0.10)' }}
                      >
                        <p className="text-xs text-slate-300">Timeline</p>
                        <p className="text-xl font-semibold">24 mo</p>
                      </div>
                    </div>
                  </div>

                  {/* Metric cards */}
                  <div className="space-y-4">
                    {metrics.map(([label, value, note]) => (
                      <div
                        key={label}
                        className="rounded-2xl border border-slate-200 bg-white p-4"
                      >
                        <div className="mb-3 flex items-center justify-between">
                          <p className="text-sm font-semibold text-[#0a2540]">{label}</p>
                          <p className="text-sm font-bold text-[#635bff]">{value}%</p>
                        </div>
                        <ProgressBar value={value} max={100} animated={false} />
                        <p className="mt-3 text-xs text-slate-400">{note}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom stat row */}
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  {[
                    ['Monthly EMI', 'Rs 47,869', CircleDollarSign],
                    ['Interest saved', 'Rs 5.2L', LineChart],
                    ['Visa risk', 'Low', ShieldCheck],
                  ].map(([label, value, Icon]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-slate-200 bg-white p-4"
                    >
                      <Icon className="mb-3 h-5 w-5 text-[#635bff]" />
                      <p className="text-xs text-slate-400">{label}</p>
                      <p className="mt-1 text-lg font-semibold tracking-tight text-[#0a2540]">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FEATURES
      ═══════════════════════════════════════════════ */}
      <section id="features" className="py-24 bg-white">
        <div className="page-shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-kicker">Platform</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#0a2540] sm:text-5xl">
              A SaaS-grade workspace for high-stakes student planning.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-500">
              Every module is designed to reduce ambiguity, improve financial decisions,
              and keep the journey moving.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: index * 0.08, duration: 0.45 }}
                >
                  <Card className="group h-full p-7">
                    <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#635bff]/10 text-[#635bff] transition-colors group-hover:bg-[#635bff] group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight text-[#0a2540]">
                      {feature.title}
                    </h3>
                    <p className="mt-4 leading-7 text-slate-500">{feature.description}</p>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          WORKFLOW
      ═══════════════════════════════════════════════ */}
      <section className="py-24 bg-[#f7fafc]">
        <div className="page-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="section-kicker">Workflow</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#0a2540]">
              From first shortlist to first month abroad.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-500">
              CareerCapital converts a messy process into a clean operating rhythm
              with visible ownership and readiness states.
            </p>
            <Link to="/progress" className="mt-8 inline-flex">
              <Button variant="outline" className="gap-2">
                Open roadmap <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {workflow.map((stage, index) => (
              <motion.div
                key={stage}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0a2540] text-sm font-semibold text-white flex-shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <p className="font-semibold text-[#0a2540]">{stage}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CTA BANNER
      ═══════════════════════════════════════════════ */}
      <section className="pb-24 pt-8 bg-white">
        <div className="page-shell">
          <div
            className="relative overflow-hidden rounded-[2rem] p-8 text-white
                       shadow-[0_30px_100px_rgba(10,37,64,0.20)] sm:p-12"
            style={{ background: '#0a2540' }}
          >
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#635bff]/30 blur-3xl" />
            <div className="absolute bottom-0 left-1/2 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <BarChart3 className="mb-6 h-10 w-10 text-cyan-300" />
                <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
                  Make the numbers visible before the decision gets expensive.
                </h2>
                <p className="mt-5 max-w-2xl leading-7 text-slate-300">
                  Start with the EMI simulator, then connect career ROI, visa readiness,
                  profile progress, and living costs into one plan.
                </p>
              </div>
              <Link to="/signup">
                <Button
                  size="lg"
                  className="w-full gap-2 sm:w-auto"
                  style={{
                    background: '#fff',
                    color: '#0a2540',
                    borderRadius: '99px',
                    fontWeight: 600,
                  }}
                >
                  Create free account <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
