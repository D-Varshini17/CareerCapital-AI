import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BarChart3,
  Brain,
  CalendarCheck,
  CheckCircle2,
  GraduationCap,
  LineChart,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from 'lucide-react'
import { Badge, Button, Card, ProgressBar } from '../components'

export default function LandingPage() {
  const features = [
    {
      icon: Brain,
      title: 'Career intelligence',
      description: 'Match programs, roles, countries, and budgets with a structured decision engine.',
    },
    {
      icon: WalletCards,
      title: 'Loan planning',
      description: 'Model principal, interest, tenure, prepayments, and repayment scenarios before you commit.',
    },
    {
      icon: ShieldCheck,
      title: 'Risk readiness',
      description: 'Track visa, affordability, profile, and living-cost readiness from one command center.',
    },
  ]

  const journey = [
    'Career fit',
    'Program shortlist',
    'Profile gaps',
    'Cost plan',
    'Loan strategy',
    'Repayment plan',
    'Visa readiness',
    'Mentor support',
    'Living setup',
    'Progress review',
  ]

  const stats = [
    { label: 'Projected interest saved', value: 'Rs 5.2L' },
    { label: 'Readiness score', value: '82%' },
    { label: 'Months reduced', value: '24' },
  ]

  return (
    <div className="min-h-screen">
      <section className="overflow-hidden py-16 sm:py-20 lg:py-24">
        <div className="page-shell grid items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-6 gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              AI planning workspace for ambitious students
            </Badge>
            <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
              Plan the career, loan, and move abroad decision in one place.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              CareerCapital brings career discovery, education financing, visa readiness, and repayment strategy into a single professional dashboard.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/signup">
                <Button size="lg" className="w-full gap-2 sm:w-auto">
                  Start planning <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/emi-calculator">
                <Button variant="outline" size="lg" className="w-full gap-2 sm:w-auto">
                  Open EMI calculator
                </Button>
              </Link>
            </div>

            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-lg border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-900/70">
                  <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.55 }}
            className="relative"
          >
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-sky-200/60 via-white to-teal-100/60 blur-2xl dark:from-sky-950/50 dark:via-slate-950 dark:to-teal-950/40" />
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-300/30 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/30">
              <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                <div>
                  <p className="text-sm font-semibold text-slate-950 dark:text-white">Student strategy dashboard</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Fall 2026 intake plan</p>
                </div>
                <Badge variant="success">On track</Badge>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-slate-950 p-5 text-white dark:bg-white dark:text-slate-950">
                  <GraduationCap className="mb-5 h-8 w-8 text-sky-300 dark:text-sky-600" />
                  <p className="text-sm text-slate-300 dark:text-slate-500">Recommended path</p>
                  <p className="mt-2 text-2xl font-bold">MS Data Science</p>
                  <p className="mt-4 text-sm text-slate-300 dark:text-slate-600">Canada or Germany, 18-24 month program</p>
                </div>

                <div className="space-y-4">
                  <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">Funding readiness</p>
                      <LineChart className="h-5 w-5 text-sky-600" />
                    </div>
                    <ProgressBar value={78} max={100} animated={false} className="mt-4" />
                  </div>
                  <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">Visa confidence</p>
                      <ShieldCheck className="h-5 w-5 text-emerald-600" />
                    </div>
                    <p className="mt-3 text-3xl font-bold">86%</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {[
                  ['Loan amount', 'Rs 45L'],
                  ['Monthly EMI', 'Rs 47,869'],
                  ['ROI score', '8.2/10'],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-lg bg-slate-50 p-4 dark:bg-slate-900">
                    <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
                    <p className="mt-1 text-lg font-bold">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-lg border border-slate-200 p-4 dark:border-slate-800">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold">Next recommended actions</p>
                  <CalendarCheck className="h-5 w-5 text-sky-600" />
                </div>
                <div className="space-y-3">
                  {['Complete skill assessment', 'Compare 3 loan offers', 'Prepare visa finance proof'].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="features" className="py-16">
        <div className="page-shell">
          <div className="max-w-2xl">
            <p className="section-kicker">Platform</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Built for decisions with real financial weight.</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              Replace scattered spreadsheets and guesswork with focused tools for each stage of the student journey.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Card className="h-full">
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                      <Icon className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                    </div>
                    <h3 className="text-lg font-bold">{feature.title}</h3>
                    <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{feature.description}</p>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="page-shell grid gap-10 lg:grid-cols-[0.85fr_1fr]">
          <div>
            <p className="section-kicker">Journey</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">A complete roadmap from ambition to arrival.</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              The app breaks a complex international education decision into visible, measurable stages.
            </p>
            <Link to="/progress" className="mt-6 inline-flex">
              <Button variant="outline" className="gap-2">
                View tracker <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {journey.map((stage, index) => (
              <div key={stage} className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold dark:bg-slate-800">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <p className="font-medium">{stage}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 pt-10">
        <div className="page-shell">
          <div className="rounded-2xl bg-slate-950 p-8 text-white shadow-xl dark:bg-white dark:text-slate-950 sm:p-10">
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <BarChart3 className="mb-5 h-9 w-9 text-sky-300 dark:text-sky-600" />
                <h2 className="text-3xl font-bold tracking-tight">Make the numbers visible before the decision gets expensive.</h2>
                <p className="mt-4 max-w-2xl text-slate-300 dark:text-slate-600">
                  Start with the EMI simulator, then connect career ROI, visa readiness, and profile progress into one plan.
                </p>
              </div>
              <Link to="/signup">
                <Button size="lg" className="w-full gap-2 bg-white text-slate-950 hover:bg-slate-200 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-800 sm:w-auto">
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
