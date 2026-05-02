import React, { useEffect, useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ArrowRightLeft, ArrowUpRight, Calendar, DollarSign, Search, TrendingDown } from 'lucide-react'
import { Badge, Button, Card, PageHeader, StatCard } from '../components'
import { financialService } from '../services/api'
import { calculateEarlyPaymentBenefit, calculateEMI, formatCurrency, formatNumber, generateAmortizationSchedule } from '../utils/financial'

const repaymentTips = [
  {
    title: 'Plan one extra payment during the year',
    description: 'A single extra payment can help reduce the balance earlier and soften the overall interest burden.',
  },
  {
    title: 'Make prepayments earlier if possible',
    description: 'Early-stage extra payments usually help more because a larger share of the EMI is going toward interest then.',
  },
  {
    title: 'Compare shorter tenure against monthly comfort',
    description: 'Sometimes a slightly higher EMI is worth it if it saves a meaningful amount across the full loan period.',
  },
  {
    title: 'Track interest versus principal',
    description: 'Understanding the split helps you decide when prepayment makes the biggest difference.',
  },
]

const currencyOptions = [
  { code: 'INR', label: 'India', symbol: 'Rs', rate: 1 },
  { code: 'CAD', label: 'Canada', symbol: 'C$', rate: 61.2 },
  { code: 'USD', label: 'United States', symbol: '$', rate: 83.5 },
  { code: 'GBP', label: 'United Kingdom', symbol: 'GBP', rate: 104.4 },
  { code: 'EUR', label: 'Europe', symbol: 'EUR', rate: 90.8 },
  { code: 'AUD', label: 'Australia', symbol: 'A$', rate: 55.1 },
  { code: 'SGD', label: 'Singapore', symbol: 'S$', rate: 61.8 },
  { code: 'CHF', label: 'Switzerland', symbol: 'CHF', rate: 93.6 },
]

export default function EMICalculator() {
  const [formData, setFormData] = useState({ principal: 5000000, rate: 9.5, tenure: 120, extraPayment: 0 })
  const [showSchedule, setShowSchedule] = useState(false)
  const [bankPlans, setBankPlans] = useState([])
  const [bankSearch, setBankSearch] = useState('')
  const [selectedCurrency, setSelectedCurrency] = useState('CAD')
  const [conversionAmount, setConversionAmount] = useState(1000000)
  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: parseFloat(e.target.value) || 0 }))

  const emi = calculateEMI(formData.principal, formData.rate, formData.tenure)
  const totalInterest = emi * formData.tenure - formData.principal
  const totalPayment = emi * formData.tenure
  const optimization = useMemo(() => formData.extraPayment > 0 ? calculateEarlyPaymentBenefit(formData.principal, formData.rate, formData.tenure, formData.extraPayment) : null, [formData])
  const schedule = useMemo(() => generateAmortizationSchedule(formData.principal, formData.rate, formData.tenure), [formData.principal, formData.rate, formData.tenure])
  const chartData = useMemo(() => schedule.slice(0, Math.min(60, schedule.length)), [schedule])
  const splitData = [{ name: 'Principal', value: formData.principal, fill: '#0ea5e9' }, { name: 'Interest', value: totalInterest, fill: '#f97316' }]
  const currencyMeta = currencyOptions.find((item) => item.code === selectedCurrency) || currencyOptions[1]
  const convertedFromRupees = conversionAmount / currencyMeta.rate
  const convertedToRupees = conversionAmount * currencyMeta.rate
  const filteredBankPlans = useMemo(() => {
    const q = bankSearch.trim().toLowerCase()
    if (!q) return bankPlans
    return bankPlans.filter((plan) =>
      `${plan.bank} ${plan.planName} ${plan.providerType}`.toLowerCase().includes(q)
    )
  }, [bankPlans, bankSearch])

  useEffect(() => {
    financialService.getBankPlans({
      requiredAmountLakhs: Math.round(formData.principal / 100000),
      prefersLowInterest: true,
      needsLongMoratorium: true,
      prefersNoMargin: false,
      prefersUnsecured: formData.principal <= 4000000,
    })
      .then(({ data }) => setBankPlans(data.plans || []))
      .catch(() => setBankPlans([]))
  }, [formData.principal])

  return (
    <div className="min-h-screen py-8 pb-20">
      <div className="page-shell">
        <PageHeader
          eyebrow="Loan planning"
          title="Smart EMI calculator and repayment simulator"
          description="Model monthly payments, total interest, amortization, and early-payment scenarios before choosing a loan plan."
        />

        <Card hover={false} className="mb-8">
          <h2 className="mb-6 text-2xl font-bold">Loan inputs</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-3 block text-sm font-semibold">Loan amount (Rs)</label>
              <input type="range" name="principal" value={formData.principal} onChange={handleChange} min="1000000" max="10000000" step="100000" className="w-full" />
              <p className="mt-2 text-lg font-bold text-sky-600">{formatNumber(formData.principal)}</p>
            </div>
            <div>
              <label className="mb-3 block text-sm font-semibold">Interest rate</label>
              <select name="rate" value={formData.rate} onChange={handleChange} className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900">
                {[7, 8, 8.5, 9, 9.5, 10, 10.5, 11].map((r) => <option key={r} value={r}>{r}%</option>)}
              </select>
            </div>
            <div>
              <label className="mb-3 block text-sm font-semibold">Tenure</label>
              <select name="tenure" value={formData.tenure} onChange={handleChange} className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900">
                {[60, 84, 120, 180, 240].map((m) => <option key={m} value={m}>{m} months ({(m / 12).toFixed(1)} years)</option>)}
              </select>
            </div>
            <div>
              <label className="mb-3 block text-sm font-semibold">Extra monthly payment (Rs)</label>
              <input type="number" name="extraPayment" value={formData.extraPayment} onChange={handleChange} className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900" />
            </div>
          </div>
        </Card>

        <div className="mb-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <Card hover={false}>
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-[#635bff]/10 p-3 text-[#635bff]">
                <DollarSign className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Repayment strategy tips</h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Small planning moves that usually help students borrow more safely.</p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {repaymentTips.map((tip) => (
                <div key={tip.title} className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-950/40">
                  <p className="text-base font-semibold text-slate-900 dark:text-white">{tip.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{tip.description}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card hover={false}>
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-600">
                <ArrowRightLeft className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Currency converter</h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Compare your budget in rupees and destination-country currency.</p>
              </div>
            </div>
            <div className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">Country / currency</span>
                <select value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900">
                  {currencyOptions.map((item) => (
                    <option key={item.code} value={item.code}>{item.label} ({item.code})</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">Amount</span>
                <input type="number" value={conversionAmount} onChange={(e) => setConversionAmount(Number(e.target.value) || 0)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900" />
              </label>
              <div className="grid gap-3">
                <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-950/40">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-400">From Rupees</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
                    Rs {formatNumber(conversionAmount)} = {currencyMeta.symbol} {convertedFromRupees.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-950/40">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-400">To Rupees</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
                    {currencyMeta.symbol} {formatNumber(conversionAmount)} = Rs {convertedToRupees.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <Card hover={false} className="mb-8">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Banks and loan plans</h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Ranked loan options for your current funding need with tenure, moratorium, and pricing context.</p>
            </div>
            <Badge variant="success">{filteredBankPlans.length} plans</Badge>
          </div>
          <div className="mb-5 relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={bankSearch}
              onChange={(e) => setBankSearch(e.target.value)}
              placeholder="Search banks or loan plans"
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#635bff]/30 dark:border-slate-700 dark:bg-slate-900"
            />
          </div>
          <div className="grid gap-4 xl:grid-cols-2">
            {filteredBankPlans.map((plan) => (
              <div key={plan.id} className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-950/40">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold">{plan.bank}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{plan.planName} - {plan.providerType}</p>
                  </div>
                  <Badge>{plan.recommendationScore} score</Badge>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <PlanMetric label="Interest" value={`${plan.interestRate}%`} />
                  <PlanMetric label="Max amount" value={`Rs ${plan.maxAmountLakhs}L`} />
                  <PlanMetric label="Moratorium" value={`${plan.moratoriumMonths} mo`} />
                  <PlanMetric label="Tenure" value={`${Math.round(plan.tenureMonths / 12)} yrs`} />
                </div>
                <div className="mt-4 rounded-2xl bg-slate-50 p-3 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                  <p className="font-semibold text-slate-900 dark:text-white">Highlights</p>
                  <ul className="mt-2 space-y-1">
                    {plan.highlights.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                <a href={plan.officialLink} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#635bff]">
                  Visit official plan <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
          {!filteredBankPlans.length && (
            <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500 dark:bg-slate-900 dark:text-slate-400">
              No bank plans matched your search. Try a bank name like `SBI`, `Axis`, `ICICI`, or `Credila`.
            </div>
          )}
        </Card>

        <div className="mb-8 grid gap-6 md:grid-cols-4">
          <StatCard label="Monthly EMI" value={emi} unit="Rs" icon={DollarSign} />
          <StatCard label="Total Interest" value={totalInterest} unit="Rs" icon={TrendingDown} trend="over tenure" />
          <StatCard label="Total Payment" value={totalPayment} unit="Rs" icon={Calendar} />
          <StatCard label="Loan Duration" value={formData.tenure} unit="months" icon={Calendar} trend={`${(formData.tenure / 12).toFixed(1)} years`} />
        </div>

        <div className="mb-8 grid gap-8 lg:grid-cols-2">
          <Card hover={false}>
            <h3 className="mb-6 text-xl font-bold">Payment breakdown</h3>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={splitData} cx="50%" cy="50%" outerRadius={85} dataKey="value" label={({ name, value }) => `${name}: ${formatNumber(value)}`}>
                  {splitData.map((entry) => <Cell key={entry.name} fill={entry.fill} />)}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          <Card hover={false}>
            <h3 className="mb-6 text-xl font-bold">Repayment schedule: first 5 years</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Bar dataKey="principal" stackId="a" fill="#0ea5e9" name="Principal" />
                <Bar dataKey="interest" stackId="a" fill="#f97316" name="Interest" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <Card hover={false} className="mb-8">
          <h3 className="mb-6 text-xl font-bold">Outstanding balance over time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Line type="monotone" dataKey="balance" stroke="#0ea5e9" dot={false} strokeWidth={3} name="Remaining Balance" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {optimization && (
          <Card hover={false} className="mb-8 border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold">Extra payment optimization</h3>
                <p className="mt-1 text-slate-600 dark:text-slate-300">With Rs {formatNumber(formData.extraPayment)} extra monthly payment</p>
              </div>
              <Badge variant="success">Recommended</Badge>
            </div>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="rounded-lg bg-white p-4 dark:bg-slate-950"><p className="text-sm text-slate-500">New tenure</p><p className="text-2xl font-bold text-emerald-600">{optimization.newTenure} months</p></div>
              <div className="rounded-lg bg-white p-4 dark:bg-slate-950"><p className="text-sm text-slate-500">Interest saved</p><p className="text-2xl font-bold text-emerald-600">Rs {formatNumber(optimization.interestSaved)}</p></div>
              <div className="rounded-lg bg-white p-4 dark:bg-slate-950"><p className="text-sm text-slate-500">New total</p><p className="text-2xl font-bold text-sky-600">Rs {formatNumber(optimization.newTotal)}</p></div>
              <div className="rounded-lg bg-white p-4 dark:bg-slate-950"><p className="text-sm text-slate-500">Yearly extra EMI</p><p className="text-2xl font-bold">Rs {formatNumber(emi * 1.5)}</p></div>
            </div>
          </Card>
        )}

        <Card hover={false}>
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-bold">Full amortization schedule</h3>
            <Button variant={showSchedule ? 'primary' : 'outline'} size="sm" onClick={() => setShowSchedule(!showSchedule)}>{showSchedule ? 'Hide' : 'Show'} details</Button>
          </div>
          {showSchedule && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-slate-200 dark:border-slate-800"><th className="px-4 py-2 text-left">Month</th><th className="px-4 py-2 text-right">EMI</th><th className="px-4 py-2 text-right">Principal</th><th className="px-4 py-2 text-right">Interest</th><th className="px-4 py-2 text-right">Balance</th></tr></thead>
                <tbody>
                  {schedule.slice(0, 12).map((row) => (
                    <tr key={row.month} className="border-b border-slate-100 dark:border-slate-800">
                      <td className="px-4 py-2">{row.month}</td><td className="px-4 py-2 text-right">Rs {formatNumber(row.emi)}</td><td className="px-4 py-2 text-right text-sky-600">Rs {formatNumber(row.principal)}</td><td className="px-4 py-2 text-right text-orange-600">Rs {formatNumber(row.interest)}</td><td className="px-4 py-2 text-right font-semibold">Rs {formatNumber(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

function PlanMetric({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-3 dark:border-slate-800 dark:bg-slate-950/30">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  )
}
