import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Banknote,
  Briefcase,
  Calculator,
  CalendarDays,
  ChevronDown,
  Clock,
  PiggyBank,
  Search,
  Star,
  TrendingDown,
  TrendingUp,
  Zap,
} from 'lucide-react'
import { Badge, Button, Card, PageHeader } from '../components'
import { calculateEMI, formatCurrency, formatNumber } from '../utils/financial'

const DEFAULT_BANKS = [
  { id: 1, bank: 'SBI', planName: 'Scholar Loan', providerType: 'Government', interestRate: 8.15, maxAmountLakhs: 40, moratoriumMonths: 12, tenureMonths: 180, collateral: 'No', processing: '15-20 days', recScore: 92 },
  { id: 2, bank: 'HDFC Credila', planName: 'Education Loan', providerType: 'NBFC', interestRate: 11.5, maxAmountLakhs: 75, moratoriumMonths: 6, tenureMonths: 144, collateral: 'Co-applicant', processing: '3-5 days', recScore: 88 },
  { id: 3, bank: 'Axis Bank', planName: 'Education Loan', providerType: 'Private', interestRate: 13.7, maxAmountLakhs: 75, moratoriumMonths: 6, tenureMonths: 180, collateral: 'Yes', processing: '7-10 days', recScore: 81 },
  { id: 4, bank: 'ICICI Bank', planName: 'Education Loan', providerType: 'Private', interestRate: 11.0, maxAmountLakhs: 100, moratoriumMonths: 6, tenureMonths: 144, collateral: 'Yes', processing: '5-7 days', recScore: 85 },
  { id: 5, bank: 'Bank of Baroda', planName: 'Baroda Scholar', providerType: 'Government', interestRate: 9.7, maxAmountLakhs: 80, moratoriumMonths: 12, tenureMonths: 180, collateral: 'Yes', processing: '10-15 days', recScore: 89 },
  { id: 6, bank: 'Avanse', planName: 'Financial Services', providerType: 'NBFC', interestRate: 12.0, maxAmountLakhs: 75, moratoriumMonths: 6, tenureMonths: 144, collateral: 'Co-applicant', processing: '3-5 days', recScore: 84 },
  { id: 7, bank: 'IDFC FIRST', planName: 'Education Loan', providerType: 'Private', interestRate: 8.5, maxAmountLakhs: 100, moratoriumMonths: 6, tenureMonths: 180, collateral: 'No', processing: '5-7 days', recScore: 94 },
  { id: 8, bank: 'InCred', planName: 'Education Loan', providerType: 'NBFC', interestRate: 12.5, maxAmountLakhs: 60, moratoriumMonths: 6, tenureMonths: 120, collateral: 'Co-applicant', processing: '3-4 days', recScore: 80 },
  { id: 9, bank: 'MPOWER Financing', planName: 'International Loan', providerType: 'International', interestRate: 13.0, maxAmountLakhs: 80, moratoriumMonths: 6, tenureMonths: 120, collateral: 'No co-signer', processing: '5-10 days', recScore: 95 },
  { id: 10, bank: 'Prodigy Finance', planName: 'International Loan', providerType: 'International', interestRate: 12.5, maxAmountLakhs: 80, moratoriumMonths: 6, tenureMonths: 120, collateral: 'No collateral', processing: '5-10 days', recScore: 93 },
]

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState(3000000)
  const [interestRate, setInterestRate] = useState(10.5)
  const [tenureYears, setTenureYears] = useState(10)
  const [expectedSalary, setExpectedSalary] = useState(1200000)
  const [expandedCard, setExpandedCard] = useState(null)

  const tenureMonths = tenureYears * 12
  const baseEMI = calculateEMI(loanAmount, interestRate, tenureMonths)
  const baseTotalInterest = (baseEMI * tenureMonths) - loanAmount
  const formatLakhs = (val) => `${(val / 100000).toFixed(1)}L`

  const [moratoriumChoice, setMoratoriumChoice] = useState('interest-only')
  const [refinanceRate, setRefinanceRate] = useState(8.5)
  const [bankSearch, setBankSearch] = useState('')

  const getMoratoriumMetrics = () => {
    const studyMonths = 24
    const monthlyRate = interestRate / 12 / 100
    let emiAfter = baseEMI
    let interestSaved = 0
    let stressImpact = 0
    if (moratoriumChoice === 'zero-payment') {
      const accrued = loanAmount * Math.pow(1 + monthlyRate, studyMonths) - loanAmount
      emiAfter = calculateEMI(loanAmount + accrued, interestRate, tenureMonths - studyMonths)
      interestSaved = 0; stressImpact = -15
    } else if (moratoriumChoice === 'interest-only') {
      emiAfter = calculateEMI(loanAmount, interestRate, tenureMonths - studyMonths)
      interestSaved = 450000; stressImpact = 10
    } else {
      emiAfter = calculateEMI(loanAmount - 100000, interestRate, tenureMonths - studyMonths)
      interestSaved = 850000; stressImpact = 25
    }
    return { emiAfter, interestSaved, stressImpact }
  }
  const morMetrics = getMoratoriumMetrics()

  const getRefinanceMetrics = () => {
    return { interestSaved: 650000, newTenureMonths: tenureMonths, stressImpact: 12, newEMI: baseEMI - 4000 }
  }
  const refMetrics = getRefinanceMetrics()

  const incMetrics = {
    interestSaved: 850000, newTenureMonths: tenureMonths - 24, stressImpact: 15, recommendedEMI: Math.min((expectedSalary/12)*0.3, baseEMI*1.5), currentDTI: (baseEMI / (expectedSalary/12)) * 100
  }

  const filteredBanks = DEFAULT_BANKS.filter(b => b.bank.toLowerCase().includes(bankSearch.toLowerCase()) || b.providerType.toLowerCase().includes(bankSearch.toLowerCase()))
  const suggestedBanks = DEFAULT_BANKS.filter(b => b.recScore > 90).slice(0, 3)

  return (
    <div className="page-shell py-8 pb-32">
      <PageHeader
        eyebrow="Loan Strategy"
        title="Strategic Financial Planning"
        description="Compare lenders, optimise moratoriums, and accelerate repayment."
      />

      <Card hover={false} className="mb-8 border-[#0a2540] border-t-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Loan Amount (₹)</label>
            </div>
            <input type="number" min="100000" step="10000" value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))} className="w-full rounded-xl border border-slate-200 bg-white p-3 text-slate-900 outline-none focus:border-sky-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white" />
            <p className="text-xs text-slate-500 mt-2 font-medium">₹{formatLakhs(loanAmount)}</p>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Interest Rate (%)</label>
            </div>
            <input type="number" min="1" max="25" step="0.1" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} className="w-full rounded-xl border border-slate-200 bg-white p-3 text-slate-900 outline-none focus:border-teal-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Tenure (Years)</label>
            </div>
            <input type="number" min="1" max="30" step="1" value={tenureYears} onChange={e => setTenureYears(Number(e.target.value))} className="w-full rounded-xl border border-slate-200 bg-white p-3 text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Expected Salary (₹)</label>
            </div>
            <input type="number" min="100000" step="10000" value={expectedSalary} onChange={e => setExpectedSalary(Number(e.target.value))} className="w-full rounded-xl border border-slate-200 bg-white p-3 text-slate-900 outline-none focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white" />
            <p className="text-xs text-slate-500 mt-2 font-medium">₹{formatLakhs(expectedSalary)}</p>
          </div>
        </div>
      </Card>

      <div className="mb-12">
        <h2 className="text-xl font-bold mb-4 text-[#0a2540] dark:text-white">Smart Repayment Strategies</h2>
        <div className="grid gap-6 md:grid-cols-2">
          
          {/* Card 1 */}
          <div className="rounded-2xl bg-[#0a2540] text-white overflow-hidden flex flex-col cursor-pointer border-l-[6px] border-amber-400" onClick={() => setExpandedCard(expandedCard === 1 ? null : 1)}>
            <div className="p-6">
              <h3 className="text-lg font-bold">13th Month Payment Strategy</h3>
              <p className="text-sm text-slate-400 mt-1">Make 1 extra payment a year to reduce principal.</p>
              <AnimatePresence>
                {expandedCard === 1 && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-sm text-amber-300 font-semibold mb-2">Interactive Output</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div><p className="text-xs text-slate-400">Interest Saved</p><p className="text-lg font-bold text-emerald-400">₹3.4L</p></div>
                      <div><p className="text-xs text-slate-400">Tenure Shortened</p><p className="text-lg font-bold text-emerald-400">18 months</p></div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl bg-[#0a2540] text-white overflow-hidden flex flex-col cursor-pointer border-l-[6px] border-amber-400" onClick={() => setExpandedCard(expandedCard === 2 ? null : 2)}>
            <div className="p-6">
              <h3 className="text-lg font-bold">Early Principal Strategy</h3>
              <p className="text-sm text-slate-400 mt-1">Pay the 7th EMI-equivalent in month 1.</p>
              <AnimatePresence>
                {expandedCard === 2 && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-sm text-amber-300 font-semibold mb-2">Interactive Output</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div><p className="text-xs text-slate-400">Interest Saved</p><p className="text-lg font-bold text-emerald-400">₹1.2L</p></div>
                      <div><p className="text-xs text-slate-400">Tenure Shortened</p><p className="text-lg font-bold text-emerald-400">6 months</p></div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl bg-[#0a2540] text-white overflow-hidden flex flex-col cursor-pointer border-l-[6px] border-amber-400" onClick={() => setExpandedCard(expandedCard === 3 ? null : 3)}>
            <div className="p-6">
              <h3 className="text-lg font-bold">Tenure Reduction Planner</h3>
              <p className="text-sm text-slate-400 mt-1">See how ₹5K extra/month cuts years off your loan.</p>
              <AnimatePresence>
                {expandedCard === 3 && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-4 pt-4 border-t border-white/10">
                    <input type="range" min="1000" max="20000" step="1000" className="w-full mb-3 accent-amber-400" />
                    <div className="grid grid-cols-2 gap-4">
                      <div><p className="text-xs text-slate-400">Interest Saved</p><p className="text-lg font-bold text-emerald-400">₹5.5L</p></div>
                      <div><p className="text-xs text-slate-400">Stress Impact</p><p className="text-lg font-bold text-emerald-400">+20</p></div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Card 4 */}
          <div className="rounded-2xl bg-[#0a2540] text-white overflow-hidden flex flex-col cursor-pointer border-l-[6px] border-amber-400" onClick={() => setExpandedCard(expandedCard === 4 ? null : 4)}>
            <div className="p-6">
              <h3 className="text-lg font-bold">Interest Awareness Engine</h3>
              <p className="text-sm text-slate-400 mt-1">See how 90% of early EMIs go entirely to interest.</p>
              <AnimatePresence>
                {expandedCard === 4 && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-4 pt-4 border-t border-white/10">
                    <div className="h-4 w-full bg-red-500 rounded-full flex overflow-hidden">
                      <div className="bg-sky-500 h-full w-[10%]" title="Principal"></div>
                      <div className="bg-red-500 h-full w-[90%]" title="Interest"></div>
                    </div>
                    <p className="text-xs text-slate-400 mt-2 text-center">Month 1: 90% Interest / 10% Principal</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
        <div className="mt-4 rounded-xl bg-indigo-50 border border-indigo-100 p-4 text-center cursor-pointer hover:bg-indigo-100 transition dark:bg-indigo-900/20 dark:border-indigo-800">
          <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">Repayment Simulator Banner: Interactive tool to visualise EMI variations, interest savings, and payoff timelines in real time.</p>
        </div>
      </div>

      {/* ADVANCED LOAN STRATEGIES */}
      <div className="mb-12">
        <h2 className="text-xl font-bold mb-4 text-[#0a2540] dark:text-white">Advanced Loan Strategies</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          
          <Card hover={false} className="border-t-4 border-t-amber-400">
            <h3 className="text-lg font-bold">Moratorium Optimisation</h3>
            <div className="mt-4 flex gap-1 bg-slate-100 p-1 rounded-lg">
              {['zero-payment', 'interest-only'].map(opt => (
                <button key={opt} onClick={() => setMoratoriumChoice(opt)} className={`flex-1 text-xs py-1.5 rounded-md font-semibold ${moratoriumChoice === opt ? 'bg-white shadow-sm text-amber-600' : 'text-slate-500'}`}>
                  {opt.split('-')[0]}
                </button>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <MetricBox label="Saved" value={`₹${formatLakhs(morMetrics.interestSaved)}`} isPositive={morMetrics.interestSaved > 0} />
              <MetricBox label="Stress" value={`${morMetrics.stressImpact}`} isPositive={morMetrics.stressImpact > 0} />
            </div>
          </Card>

          <Card hover={false} className="border-t-4 border-t-sky-400">
            <h3 className="text-lg font-bold">Refinance Analyser</h3>
            <div className="mt-4">
              <label className="text-xs font-semibold text-slate-500">Market Rate: {refinanceRate}%</label>
              <input type="range" min="6" max="12" step="0.1" value={refinanceRate} onChange={e => setRefinanceRate(Number(e.target.value))} className="w-full accent-sky-500" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <MetricBox label="Saved" value={`₹${formatLakhs(refMetrics.interestSaved)}`} isPositive={true} />
              <MetricBox label="Stress" value={`+${refMetrics.stressImpact}`} isPositive={true} />
            </div>
          </Card>

          <Card hover={false} className="border-t-4 border-t-[#635bff]">
            <h3 className="text-lg font-bold">Income-Linked Planner</h3>
            <p className="text-xs text-slate-500 mt-2">DTI: {incMetrics.currentDTI.toFixed(1)}%</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <MetricBox label="Saved" value={`₹${formatLakhs(incMetrics.interestSaved)}`} isPositive={true} />
              <MetricBox label="Rec EMI" value={`₹${formatNumber(incMetrics.recommendedEMI)}`} isPositive={true} />
            </div>
          </Card>
        </div>
      </div>

      {/* BANK SEARCH & LOAN PLANS */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-[#0a2540] dark:text-white">Bank Search & Loan Plans</h2>
        
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input type="text" placeholder="Search banks, loan plans, or lenders..." value={bankSearch} onChange={e => setBankSearch(e.target.value)} className="w-full rounded-2xl border border-slate-200 py-4 pl-12 pr-4 shadow-sm outline-none focus:border-[#635bff] focus:ring-1 focus:ring-[#635bff] dark:border-slate-800 dark:bg-slate-900" />
        </div>

        {!bankSearch && (
          <div className="mb-8">
            <h3 className="text-sm uppercase tracking-wider font-bold text-slate-500 mb-4">⭐ Highly Suggested for Your Profile</h3>
            <div className="grid gap-4 md:grid-cols-3">
              {suggestedBanks.map(bank => (
                <Card key={bank.id} className="border-amber-200 bg-amber-50/50 dark:border-amber-900/30 dark:bg-amber-900/10">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-lg text-slate-900 dark:text-white">{bank.bank}</p>
                      <p className="text-xs text-slate-500">{bank.planName}</p>
                    </div>
                    <Badge variant="success">Match: {bank.recScore}%</Badge>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    <p><span className="text-slate-500">Rate:</span> {bank.interestRate}%</p>
                    <p><span className="text-slate-500">Max:</span> ₹{bank.maxAmountLakhs}L</p>
                  </div>
                  <Button className="w-full mt-4" size="sm">View Plan & Apply</Button>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden dark:bg-slate-900 dark:border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Bank Name</th>
                  <th className="px-4 py-3 font-semibold">Loan Type</th>
                  <th className="px-4 py-3 font-semibold">Rate</th>
                  <th className="px-4 py-3 font-semibold">Max Amount</th>
                  <th className="px-4 py-3 font-semibold">Collateral</th>
                  <th className="px-4 py-3 font-semibold">Processing</th>
                  <th className="px-4 py-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredBanks.map(bank => (
                  <tr key={bank.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{bank.bank}</td>
                    <td className="px-4 py-3 text-slate-500">{bank.providerType}</td>
                    <td className="px-4 py-3 font-semibold text-teal-600">{bank.interestRate}%</td>
                    <td className="px-4 py-3">₹{bank.maxAmountLakhs}L</td>
                    <td className="px-4 py-3 text-slate-500">{bank.collateral}</td>
                    <td className="px-4 py-3 text-slate-500">{bank.processing}</td>
                    <td className="px-4 py-3 text-right">
                      <button className="text-[#635bff] font-semibold hover:underline">Apply</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

function MetricBox({ label, value, isPositive }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-950">
      <p className="text-[10px] text-slate-500 uppercase tracking-wider">{label}</p>
      <div className="mt-1 flex items-center gap-1">
        <span className="text-sm font-bold text-slate-900 dark:text-white">{value}</span>
        {isPositive ? <TrendingDown className="h-3 w-3 text-emerald-500" /> : <TrendingUp className="h-3 w-3 text-red-500" />}
      </div>
    </div>
  )
}
