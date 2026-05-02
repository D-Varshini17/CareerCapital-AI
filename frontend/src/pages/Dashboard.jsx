import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, DollarSign, GraduationCap, LineChart, Search, Target, TrendingUp, Zap } from 'lucide-react'
import { Badge, Button, Card, ProgressBar, StatCard } from '../components'
import SmartSearchBar from '../components/SmartSearchBar'
import { colleges } from '../data/colleges'
import { useAuthStore } from '../store'
import { useCollegeStore } from '../store'
import { filterAndRankColleges, getTotalCost } from '../utils/collegeSearch'

export default function Dashboard() {
  const user = useAuthStore((state) => state.user)
  const { savedCollegeIds, recentlyViewedIds } = useCollegeStore()
  const [dashboardSearch, setDashboardSearch] = React.useState('')

  const dashboardData = {
    career: {
      target: 'Software engineer - US/Canada',
      progress: 65,
      nextAction: 'Complete skill assessment',
    },
    loan: {
      total: 4500000,
      available: 1200000,
      interest_rate: 9.5,
      tenure_months: 120,
      emi: 47869,
    },
    financial: {
      savings: 250000,
      monthly_expense: 35000,
      roi_score: 8.2,
    },
  }

  const quickActions = [
    { icon: Zap, title: 'EMI Calculator', description: 'Optimize your loan repayment', href: '/emi-calculator' },
    { icon: Target, title: 'Career Discovery', description: 'Explore role and country fit', href: '/career-discovery' },
    { icon: LineChart, title: 'Profile Enhancer', description: 'Prioritize high-impact gaps', href: '/profile-enhancer' },
    { icon: Calendar, title: 'Progress Tracker', description: 'Review your journey stages', href: '/progress' },
  ]

  const recentActivities = [
    { label: 'Profile', action: 'Updated career profile', time: '2 hours ago' },
    { label: 'EMI', action: 'Calculated repayment strategy', time: '1 day ago' },
    { label: 'Skills', action: 'Completed skill assessment', time: '3 days ago' },
  ]

  const utilized = dashboardData.loan.total - dashboardData.loan.available
  const recommended = filterAndRankColleges(colleges, 'Canada MS data science high roi', {
    country: 'All',
    courseType: 'All',
    field: 'All',
    maxBudget: 70,
    ieltsRequired: 'Any',
    greRequired: 'Any',
    universityType: 'All',
    scholarship: 'Any',
  }).slice(0, 3)
  const saved = colleges.filter((college) => savedCollegeIds.includes(college.id)).slice(0, 3)
  const recent = recentlyViewedIds.map((id) => colleges.find((college) => college.id === id)).filter(Boolean).slice(0, 3)

  return (
    <div className="min-h-screen soft-grid py-10 pb-24">
      <div className="page-shell">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="mb-10">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <Badge className="mb-5 px-4 py-1.5">Student command center</Badge>
              <h1 className="text-4xl font-semibold tracking-[-0.045em] text-[#0a2540] dark:text-white sm:text-5xl">Welcome back, {user?.name || 'Student'}</h1>
              <p className="mt-3 max-w-2xl text-[15px] leading-7 text-slate-600 dark:text-slate-300">
                Your career, funding, and readiness overview for the next application milestone.
              </p>
            </div>
            <Link to="/emi-calculator">
              <Button className="gap-2">
                Optimize repayment <Zap className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>

        <div className="mb-8 rounded-[1.75rem] border border-white/70 bg-white/75 p-4 shadow-[0_20px_70px_rgba(10,37,64,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
          <div className="mb-3 flex items-center gap-2 px-2 text-sm font-semibold text-[#0a2540] dark:text-white">
            <Search className="h-4 w-4 text-[#635bff]" />
            Global smart search
          </div>
          <SmartSearchBar
            value={dashboardSearch}
            onChange={setDashboardSearch}
            onSubmit={(value) => {
              const encoded = encodeURIComponent(value || '')
              window.location.href = `/college-finder?q=${encoded}`
            }}
            compact
          />
        </div>

        <div className="mb-8 grid gap-5 md:grid-cols-4">
          <StatCard label="Career Progress" value={dashboardData.career.progress} unit="%" icon={Target} trend="+5% this month" />
          <StatCard label="Total Loan" value={(dashboardData.loan.total / 100000).toFixed(1)} unit="L" icon={DollarSign} trend="9.5% interest" trendUp={false} />
          <StatCard label="Monthly EMI" value={dashboardData.loan.emi} unit="Rs" icon={Calendar} trend="120 months tenure" />
          <StatCard label="ROI Score" value={dashboardData.financial.roi_score} unit="/10" icon={TrendingUp} trend="Good financial health" />
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <Card hover={false} className="overflow-hidden">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold tracking-[-0.025em] text-[#0a2540] dark:text-white">Career recommendation</h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Based on your current profile and budget</p>
                </div>
                <Badge variant="success">On track</Badge>
              </div>

              <div className="grid gap-4 md:grid-cols-[1fr_0.8fr]">
                <div className="rounded-2xl bg-gradient-to-br from-[#0a2540] to-[#173b5c] p-5 text-white">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Target career</p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight">{dashboardData.career.target}</p>
                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/10 p-4 text-sm font-medium text-slate-100">
                    Next action: {dashboardData.career.nextAction}
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200/70 bg-white/60 p-5 dark:border-slate-800 dark:bg-slate-950/40">
                  <ProgressBar label="Development progress" value={dashboardData.career.progress} max={100} animated={false} />
                  <Link to="/career-discovery" className="mt-6 block">
                    <Button variant="outline" className="w-full">Update profile</Button>
                  </Link>
                </div>
              </div>
            </Card>

            <Card hover={false}>
              <h2 className="mb-6 text-2xl font-semibold tracking-[-0.025em] text-[#0a2540] dark:text-white">Loan intelligence</h2>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-white/70 p-4 ring-1 ring-slate-200/70 dark:bg-slate-950/40 dark:ring-slate-800">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Loan amount</p>
                  <p className="mt-1 text-xl font-bold">Rs {(dashboardData.loan.total / 100000).toFixed(1)}L</p>
                </div>
                <div className="rounded-2xl bg-white/70 p-4 ring-1 ring-slate-200/70 dark:bg-slate-950/40 dark:ring-slate-800">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Interest rate</p>
                  <p className="mt-1 text-xl font-bold">{dashboardData.loan.interest_rate}%</p>
                </div>
                <div className="rounded-2xl bg-white/70 p-4 ring-1 ring-slate-200/70 dark:bg-slate-950/40 dark:ring-slate-800">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Savings available</p>
                  <p className="mt-1 text-xl font-bold">Rs {(dashboardData.financial.savings / 100000).toFixed(1)}L</p>
                </div>
              </div>
              <ProgressBar className="mt-6" label="Loan utilization" value={utilized} max={dashboardData.loan.total} animated={false} />
            </Card>
          </div>

          <div className="space-y-8">
            <Card hover={false}>
              <h2 className="mb-4 text-xl font-bold">Quick actions</h2>
              <div className="space-y-3">
                {quickActions.map((action) => {
                  const Icon = action.icon
                  return (
                    <Link key={action.title} to={action.href} className="block">
                      <div className="group flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-white/50 p-3 hover:bg-white hover:shadow-sm dark:border-slate-800 dark:bg-slate-950/30 dark:hover:bg-slate-900">
                        <div className="rounded-xl bg-[#635bff]/10 p-2 text-[#635bff]">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold group-hover:text-sky-600">{action.title}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{action.description}</p>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </Card>

            <Card hover={false}>
              <h2 className="mb-4 text-xl font-bold">Recent activity</h2>
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div key={activity.action} className="flex items-start gap-3 rounded-2xl bg-white/60 p-3 ring-1 ring-slate-200/70 dark:bg-slate-950/40 dark:ring-slate-800">
                    <span className="rounded-md bg-white px-2 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700">
                      {activity.label}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card hover={false} className="border-[#635bff]/20 bg-[#635bff]/[0.06] dark:border-[#635bff]/30 dark:bg-[#635bff]/10">
              <h2 className="mb-3 text-xl font-bold">AI insight</h2>
              <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                Based on your profile, extra payments could save up to Rs 5L in interest and reduce your loan timeline from 120 months to about 96 months.
              </p>
              <Link to="/emi-calculator" className="mt-4 block">
                <Button size="sm" className="w-full">See optimization</Button>
              </Link>
            </Card>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <DashboardCollegeSection title="Recommended colleges" items={recommended} empty="Recommendations will appear after profile setup." />
          <DashboardCollegeSection title="Saved colleges" items={saved} empty="Save colleges from the finder to build a shortlist." />
          <DashboardCollegeSection title="Recently viewed" items={recent} empty="Official website visits and applications will appear here." />
        </div>
      </div>
    </div>
  )
}

function DashboardCollegeSection({ title, items, empty }) {
  return (
    <Card hover={false}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight text-[#0a2540] dark:text-white">{title}</h2>
        <Link to="/college-finder" className="text-xs font-semibold text-[#635bff]">Open finder</Link>
      </div>
      {items.length ? (
        <div className="space-y-3">
          {items.map((college) => (
            <Link key={college.id} to="/college-finder" className="block rounded-2xl border border-slate-200/70 bg-white/60 p-4 hover:bg-white hover:shadow-sm dark:border-slate-800 dark:bg-slate-950/40">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-[#635bff]/10 p-2 text-[#635bff]">
                  <GraduationCap className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{college.university}</p>
                  <p className="truncate text-xs text-slate-500">{college.course}</p>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span>Rs {getTotalCost(college)}L total</span>
                    <span className="font-semibold text-emerald-600">{college.admissionProbability}% fit</span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400" />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500 dark:bg-slate-900">{empty}</p>
      )}
    </Card>
  )
}
