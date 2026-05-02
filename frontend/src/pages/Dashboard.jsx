import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  AlertTriangle,
  ArrowRight,
  Calendar,
  DollarSign,
  GraduationCap,
  LineChart,
  Search,
  ShieldCheck,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react'
import { Badge, Button, Card, ProgressBar, StatCard } from '../components'
import SmartSearchBar from '../components/SmartSearchBar'
import { colleges } from '../data/colleges'
import { userService } from '../services/api'
import { useAuthStore, useCollegeStore } from '../store'
import { filterAndRankColleges, getTotalCost } from '../utils/collegeSearch'
import { buildWorkspaceAlerts, getAcademicStrength, getCurrentStage, getDocumentStrength, getProfileStrength, getScoreStrength, getSmartSuggestion } from '../utils/workspace'

export default function Dashboard() {
  const location = useLocation()
  const user = useAuthStore((state) => state.user)
  const { recentlyViewedIds } = useCollegeStore()
  const [dashboardSearch, setDashboardSearch] = useState('')
  const [profileCenter, setProfileCenter] = useState({ profile: null, documents: [] })
  const [shortlist, setShortlist] = useState([])

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const [{ data }, shortlistResponse] = await Promise.all([
          userService.getProfileCenter(),
          userService.getShortlist().catch(() => ({ data: { shortlist: [] } })),
        ])
        if (mounted) {
          setProfileCenter({
            profile: data.profile,
            documents: data.documents || [],
          })
          setShortlist(shortlistResponse.data.shortlist || [])
        }
      } catch {
        // Keep fallback dashboard state when backend profile data is not ready yet.
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [])

  const profileStrength = getProfileStrength(profileCenter.profile, profileCenter.documents)
  const missingDocs = profileCenter.documents.filter((doc) => doc.status === 'missing').length
  const loanEstimate = 47869
  const financialStress = Math.max(18, 100 - profileStrength + missingDocs * 4)
  const currentStage = getCurrentStage(location.pathname)

  const quickActions = [
    { icon: Search, title: 'Admission Planning', description: 'Search colleges, courses, and requirements', href: '/admission-planning' },
    { icon: Zap, title: 'EMI Calculator', description: 'Model repayment options', href: '/emi-calculator' },
    { icon: Target, title: 'Career Discovery', description: 'Refine role and destination fit', href: '/career-discovery' },
    { icon: Calendar, title: 'Profile Center', description: 'Finish profile and upload documents', href: '/profile-enhancer' },
  ]

  const recentActivities = [
    { label: 'Profile', action: 'Guided onboarding updates improve personalization', time: 'Now' },
    { label: 'Docs', action: `${profileCenter.documents.filter((doc) => doc.status === 'uploaded').length} documents ready for review`, time: 'Live' },
    { label: 'Finder', action: 'Smart search supports colleges, courses, and natural prompts', time: 'Ready' },
  ]

  const recommended = profileCenter.profile
    ? filterAndRankColleges(
        colleges,
        `${profileCenter.profile.preferences?.preferred_countries || ''} ${profileCenter.profile.preferences?.field_of_interest || ''} ${profileCenter.profile.preferences?.target_level || ''}`,
        {
          country: 'All',
          courseType: 'All',
          field: 'All',
          maxBudget: Number(profileCenter.profile.preferences?.budget_range || 70),
          ieltsRequired: 'Any',
          greRequired: 'Any',
          universityType: 'All',
          scholarship: 'Any',
        }
      ).slice(0, 3)
    : filterAndRankColleges(colleges, 'Canada MS data science high roi', {
        country: 'All',
        courseType: 'All',
        field: 'All',
        maxBudget: 70,
        ieltsRequired: 'Any',
        greRequired: 'Any',
        universityType: 'All',
        scholarship: 'Any',
      }).slice(0, 3)

  const saved = shortlist
    .map((item) => ({ ...colleges.find((college) => college.id === item.collegeId), applicationStatus: item.applicationStatus }))
    .filter((item) => item?.id)
    .slice(0, 3)
  const recent = recentlyViewedIds.map((id) => colleges.find((college) => college.id === id)).filter(Boolean).slice(0, 3)
  const workspaceAlerts = buildWorkspaceAlerts(profileCenter.profile, profileCenter.documents, saved)
  const smartSuggestion = getSmartSuggestion(profileCenter.profile, profileCenter.documents, location.pathname)

  return (
    <div className="min-h-screen soft-grid py-10 pb-24">
      <div className="page-shell">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="mb-10">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <Badge className="mb-5 px-4 py-1.5">Student command center</Badge>
              <h1 className="text-4xl font-semibold tracking-[-0.045em] text-[#0a2540] dark:text-white sm:text-5xl">Welcome back, {user?.name || 'Student'}</h1>
              <p className="mt-3 max-w-2xl text-[15px] leading-7 text-slate-600 dark:text-slate-300">
                Build your profile, upload documents, discover best-fit programs, and model the full financial plan from one workspace.
              </p>
            </div>
            <Link to="/profile-enhancer">
              <Button className="gap-2">Complete profile <Zap className="h-4 w-4" /></Button>
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
          <StatCard label="Profile Strength" value={profileStrength} unit="%" icon={Target} trend={`${missingDocs} missing documents`} trendUp={missingDocs === 0} />
          <StatCard label="Loan Estimate" value={loanEstimate} unit="Rs EMI" icon={DollarSign} trend="10-year repayment model" />
          <StatCard label="Admission Chances" value={recommended[0]?.admissionProbability || 0} unit="%" icon={Calendar} trend="Best current match" />
          <StatCard label="Stress Score" value={financialStress} unit="/100" icon={TrendingUp} trend={financialStress < 45 ? 'Manageable profile' : 'Needs planning'} trendUp={financialStress < 45} />
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-3">
          <Card hover={false}>
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Current Stage Indicator</p>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-[#0a2540] dark:text-white">
              Stage {currentStage.number} - {currentStage.label}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{currentStage.detail}</p>
          </Card>
          <Card hover={false}>
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Profile Completion Bar</p>
            <div className="mt-3">
              <ProgressBar value={profileStrength} max={100} animated={false} />
            </div>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{missingDocs} item{missingDocs === 1 ? '' : 's'} still blocking a stronger recommendation model.</p>
          </Card>
          <Card hover={false}>
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Smart Suggestion Card</p>
            <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">{smartSuggestion}</p>
            <Link to="/admission-planning" className="mt-4 inline-flex">
              <Button variant="outline" size="sm">Open admission planning</Button>
            </Link>
          </Card>
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card hover={false}>
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-[#0a2540] dark:text-white">Profile dashboard</h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">This score powers college ranking, affordability, and admission probability.</p>
              </div>
              <Link to="/profile-enhancer">
                <Button variant="outline">Open profile center</Button>
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <ProfileMetric label="Academics" value={getAcademicStrength(profileCenter.profile)} subtitle="Qualification, GPA, major" />
              <ProfileMetric label="Documents" value={getDocumentStrength(profileCenter.documents)} subtitle="Upload and review progress" />
              <ProfileMetric label="Test scores" value={getScoreStrength(profileCenter.profile)} subtitle="IELTS, TOEFL, GRE, GMAT" />
            </div>
            <div className="mt-6 rounded-2xl bg-gradient-to-br from-[#0a2540] to-[#173b5c] p-5 text-white">
              <p className="text-sm text-slate-300">Current study target</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight">{profileCenter.profile?.preferences?.field_of_interest || 'Computer Science'} {profileCenter.profile?.preferences?.target_level || 'PG'}</p>
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/10 p-4 text-sm font-medium text-slate-100">
                Next action: {missingDocs > 0 ? `Upload ${missingDocs} missing document${missingDocs > 1 ? 's' : ''}` : 'Compare recommended colleges and refine budget.'}
              </div>
            </div>
          </Card>

          <Card hover={false}>
            <h2 className="mb-4 text-xl font-semibold tracking-tight text-[#0a2540] dark:text-white">Smart alerts</h2>
            <div className="space-y-3">
              {workspaceAlerts.slice(0, 4).map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-white/60 p-4 dark:border-slate-800 dark:bg-slate-950/40">
                  <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />
                  <div>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{alert.title}</p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{alert.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <Card hover={false} className="overflow-hidden">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold tracking-[-0.025em] text-[#0a2540] dark:text-white">Best match right now</h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Personalized from study preferences, budget, and uploaded evidence.</p>
                </div>
                <Badge variant="success">{recommended[0]?.admissionProbability || 0}% chance</Badge>
              </div>

              <div className="grid gap-4 md:grid-cols-[1fr_0.8fr]">
                <div className="rounded-2xl bg-gradient-to-br from-[#0a2540] to-[#173b5c] p-5 text-white">
                  <p className="text-sm text-slate-300">Recommended college</p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight">{recommended[0]?.university || 'University recommendation pending'}</p>
                  <p className="mt-2 text-sm text-slate-300">{recommended[0]?.course || 'Complete profile fields for more precise matches.'}</p>
                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/10 p-4 text-sm font-medium text-slate-100">
                    Estimated total cost: Rs {recommended[0] ? recommended[0].feesLakhs + recommended[0].livingLakhs : 0}L
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200/70 bg-white/60 p-5 dark:border-slate-800 dark:bg-slate-950/40">
                  <ProgressBar label="Admission probability" value={recommended[0]?.admissionProbability || 0} max={100} animated={false} />
                  <Link to="/college-finder" className="mt-6 block">
                    <Button variant="outline" className="w-full">Open college finder</Button>
                  </Link>
                </div>
              </div>
            </Card>

            <Card hover={false}>
              <h2 className="mb-6 text-2xl font-semibold tracking-[-0.025em] text-[#0a2540] dark:text-white">Financial outlook</h2>
              <div className="grid gap-4 md:grid-cols-3">
                <FinancialMetric label="Loan estimate" value="Rs 45.0L" subtitle="Based on target shortlist" />
                <FinancialMetric label="Monthly EMI" value="Rs 47,869" subtitle="9.5% for 120 months" />
                <FinancialMetric label="Stress score" value={`${financialStress}/100`} subtitle="Profile and budget adjusted" />
              </div>
              <Link to="/emi-calculator" className="mt-6 inline-flex">
                <Button variant="outline">Open repayment simulator</Button>
              </Link>
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

            <Card hover={false}>
              <h2 className="mb-4 text-xl font-bold">Application tracker</h2>
              <div className="space-y-3">
                {shortlist.length ? shortlist.slice(0, 4).map((item) => (
                  <div key={item.collegeId} className="rounded-2xl bg-white/60 p-3 ring-1 ring-slate-200/70 dark:bg-slate-950/40 dark:ring-slate-800">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.university}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{item.course}</p>
                    <div className="mt-2 inline-flex rounded-full bg-[#635bff]/10 px-2.5 py-1 text-[11px] font-semibold text-[#635bff]">
                      {String(item.applicationStatus || 'saved').replaceAll('_', ' ')}
                    </div>
                  </div>
                )) : (
                  <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500 dark:bg-slate-900">Save colleges from the finder to start managing application status.</p>
                )}
              </div>
            </Card>

            <Card hover={false} className="border-[#635bff]/20 bg-[#635bff]/[0.06] dark:border-[#635bff]/30 dark:bg-[#635bff]/10">
              <h2 className="mb-3 flex items-center gap-2 text-xl font-bold"><ShieldCheck className="h-5 w-5 text-[#635bff]" /> AI insight</h2>
              <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                {profileStrength >= 75
                  ? 'Your profile is strong enough to unlock more selective programs. Add final financial documents to tighten scholarship and affordability guidance.'
                  : 'Completing profile fields and missing documents will improve recommendation quality, loan estimates, and admission probability scoring.'}
              </p>
              <Link to="/profile-enhancer" className="mt-4 block">
                <Button size="sm" className="w-full">Improve profile</Button>
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
                    <span className="font-semibold text-emerald-600">
                      {college.applicationStatus
                        ? college.applicationStatus.replaceAll('_', ' ')
                        : `${college.admissionProbability}% fit`}
                    </span>
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

function ProfileMetric({ label, value, subtitle }) {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-950/40">
      <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight">{value}%</p>
      <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
    </div>
  )
}

function FinancialMetric({ label, value, subtitle }) {
  return (
    <div className="rounded-2xl bg-white/70 p-4 ring-1 ring-slate-200/70 dark:bg-slate-950/40 dark:ring-slate-800">
      <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{label}</p>
      <p className="mt-2 text-xl font-semibold tracking-tight">{value}</p>
      <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
    </div>
  )
}
