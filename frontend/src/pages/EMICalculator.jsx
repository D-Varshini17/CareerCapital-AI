import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingDown, DollarSign, Calendar, PiggyBank } from 'lucide-react'
import { Card, Button, InputField, StatCard, Badge } from '../components'
import { calculateEMI, calculateEarlyPaymentBenefit, generateAmortizationSchedule, formatCurrency, formatNumber } from '../utils/financial'

export default function EMICalculator() {
  const [formData, setFormData] = useState({
    principal: 5000000,
    rate: 9.5,
    tenure: 120,
    extraPayment: 0,
  })
  const [showSchedule, setShowSchedule] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }))
  }

  // Calculations
  const emi = calculateEMI(formData.principal, formData.rate, formData.tenure)
  const totalInterest = (emi * formData.tenure) - formData.principal
  const totalPayment = emi * formData.tenure

  const optimization = useMemo(() => {
    if (formData.extraPayment > 0) {
      return calculateEarlyPaymentBenefit(
        formData.principal,
        formData.rate,
        formData.tenure,
        formData.extraPayment
      )
    }
    return null
  }, [formData])

  // Chart data
  const schedule = useMemo(() => {
    return generateAmortizationSchedule(formData.principal, formData.rate, formData.tenure)
  }, [formData.principal, formData.rate, formData.tenure])

  const chartData = useMemo(() => {
    return schedule.slice(0, Math.min(60, schedule.length)).map((item, idx) => ({
      month: item.month,
      principal: item.principal,
      interest: item.interest,
      balance: item.balance,
    }))
  }, [schedule])

  const principalInterestData = [
    { name: 'Principal', value: formData.principal, fill: '#0ea5e9' },
    { name: 'Interest', value: totalInterest, fill: '#f97316' },
  ]

  const tenureMonthsOptions = [60, 84, 120, 180, 240]
  const rateOptions = [7, 8, 8.5, 9, 9.5, 10, 10.5, 11]

  return (
    <div className="min-h-screen pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">💰 Smart EMI Calculator & Repayment Simulator</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Visualize your loan repayment and discover strategies to save interest
          </p>
        </motion.div>

        {/* Input Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-sky-50 to-cyan-50 dark:from-sky-900/20 dark:to-cyan-900/20 rounded-2xl p-8 mb-8 border border-sky-200 dark:border-sky-800"
        >
          <h2 className="text-2xl font-bold mb-6">Input Your Loan Details</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold mb-3">Loan Amount (₹)</label>
              <input
                type="range"
                name="principal"
                value={formData.principal}
                onChange={handleChange}
                min="1000000"
                max="10000000"
                step="100000"
                className="w-full cursor-pointer"
              />
              <p className="text-lg font-bold mt-2 text-sky-600 dark:text-sky-400">
                {formatNumber(formData.principal)}
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-3">Interest Rate (%)</label>
              <select
                name="rate"
                value={formData.rate}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-sky-300 dark:border-sky-700 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
              >
                {rateOptions.map((r) => (
                  <option key={r} value={r}>{r}%</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-3">Tenure (Months)</label>
              <select
                name="tenure"
                value={formData.tenure}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-sky-300 dark:border-sky-700 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
              >
                {tenureMonthsOptions.map((m) => (
                  <option key={m} value={m}>{m} months ({(m / 12).toFixed(1)} years)</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-3">Extra Monthly Payment (₹)</label>
              <input
                type="number"
                name="extraPayment"
                value={formData.extraPayment}
                onChange={handleChange}
                placeholder="0"
                className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-sky-300 dark:border-sky-700 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
              />
            </div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-4 gap-6 mb-8"
        >
          <StatCard
            label="Monthly EMI"
            value={emi}
            unit="₹"
            icon={DollarSign}
          />
          <StatCard
            label="Total Interest"
            value={totalInterest}
            unit="₹"
            icon={TrendingDown}
            trend="over tenure"
          />
          <StatCard
            label="Total Payment"
            value={totalPayment}
            unit="₹"
            icon={Calendar}
          />
          <StatCard
            label="Loan Duration"
            value={formData.tenure}
            unit="months"
            icon={Calendar}
            trend={`${(formData.tenure / 12).toFixed(1)} years`}
          />
        </motion.div>

        {/* Main Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Principal vs Interest Breakdown */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <h3 className="text-xl font-bold mb-6">Payment Breakdown</h3>
              <div className="flex justify-center">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={principalInterestData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${formatNumber(value)}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {principalInterestData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 space-y-2">
                <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <span className="font-medium">Principal Amount</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{formatCurrency(formData.principal)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <span className="font-medium">Total Interest</span>
                  <span className="font-bold text-orange-600 dark:text-orange-400">{formatCurrency(totalInterest)}</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Amortization Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <h3 className="text-xl font-bold mb-6">Repayment Schedule (First 5 Years)</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" label={{ value: 'Months', position: 'insideBottomRight', offset: -5 }} />
                  <YAxis label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                  <Bar dataKey="principal" stackId="a" fill="#0ea5e9" name="Principal" />
                  <Bar dataKey="interest" stackId="a" fill="#f97316" name="Interest" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </div>

        {/* Balance Over Time */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <Card>
            <h3 className="text-xl font-bold mb-6">Outstanding Balance Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" label={{ value: 'Months', position: 'insideBottomRight', offset: -5 }} />
                <YAxis label={{ value: 'Balance (₹)', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#0ea5e9"
                  dot={false}
                  strokeWidth={3}
                  name="Remaining Balance"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Early Payment Benefit */}
        {optimization && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-1">🎉 Extra Payment Optimization</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    With ₹{formatNumber(formData.extraPayment)} extra monthly payment:
                  </p>
                </div>
                <Badge variant="success">Recommended</Badge>
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">New Tenure</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {optimization.newTenure} months
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    Save {optimization.tenureSaved} months
                  </p>
                </div>

                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Interest Saved</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    ₹{formatNumber(optimization.interestSaved)}
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    {((optimization.interestSaved / totalInterest) * 100).toFixed(1)}% reduction
                  </p>
                </div>

                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">New Total Payment</p>
                  <p className="text-2xl font-bold text-sky-600 dark:text-sky-400">
                    ₹{formatNumber(optimization.newTotal)}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Savings: ₹{formatNumber(totalPayment - optimization.newTotal)}
                  </p>
                </div>

                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">13th Month Strategy</p>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    ₹{formatNumber(emi * 1.5)}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Pay once a year
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white dark:bg-slate-800 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  💡 Pro Tip: Using the 13th month payment strategy (paying an extra EMI once yearly) can significantly reduce your loan tenure and interest. Combined with extra monthly payments, you could save up to ₹{formatNumber(optimization.interestSaved)} in interest!
                </p>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Amortization Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8"
        >
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">📊 Full Amortization Schedule</h3>
              <Button
                variant={showSchedule ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setShowSchedule(!showSchedule)}
              >
                {showSchedule ? 'Hide' : 'Show'} Details
              </Button>
            </div>

            {showSchedule && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left px-4 py-2 font-semibold">Month</th>
                      <th className="text-right px-4 py-2 font-semibold">EMI</th>
                      <th className="text-right px-4 py-2 font-semibold">Principal</th>
                      <th className="text-right px-4 py-2 font-semibold">Interest</th>
                      <th className="text-right px-4 py-2 font-semibold">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.slice(0, 12).map((row, idx) => (
                      <tr key={idx} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <td className="px-4 py-2">{row.month}</td>
                        <td className="text-right px-4 py-2">₹{formatNumber(row.emi)}</td>
                        <td className="text-right px-4 py-2 text-sky-600 dark:text-sky-400">₹{formatNumber(row.principal)}</td>
                        <td className="text-right px-4 py-2 text-orange-600 dark:text-orange-400">₹{formatNumber(row.interest)}</td>
                        <td className="text-right px-4 py-2 font-semibold">₹{formatNumber(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {schedule.length > 12 && (
                  <p className="text-center py-4 text-slate-600 dark:text-slate-400">
                    Showing first 12 months of {schedule.length} total months...
                  </p>
                )}
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
