import React, { useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Calendar, DollarSign, TrendingDown } from 'lucide-react'
import { Badge, Button, Card, PageHeader, StatCard } from '../components'
import { calculateEarlyPaymentBenefit, calculateEMI, formatCurrency, formatNumber, generateAmortizationSchedule } from '../utils/financial'

export default function EMICalculator() {
  const [formData, setFormData] = useState({ principal: 5000000, rate: 9.5, tenure: 120, extraPayment: 0 })
  const [showSchedule, setShowSchedule] = useState(false)
  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: parseFloat(e.target.value) || 0 }))

  const emi = calculateEMI(formData.principal, formData.rate, formData.tenure)
  const totalInterest = emi * formData.tenure - formData.principal
  const totalPayment = emi * formData.tenure
  const optimization = useMemo(() => formData.extraPayment > 0 ? calculateEarlyPaymentBenefit(formData.principal, formData.rate, formData.tenure, formData.extraPayment) : null, [formData])
  const schedule = useMemo(() => generateAmortizationSchedule(formData.principal, formData.rate, formData.tenure), [formData.principal, formData.rate, formData.tenure])
  const chartData = useMemo(() => schedule.slice(0, Math.min(60, schedule.length)), [schedule])
  const splitData = [{ name: 'Principal', value: formData.principal, fill: '#0ea5e9' }, { name: 'Interest', value: totalInterest, fill: '#f97316' }]

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
