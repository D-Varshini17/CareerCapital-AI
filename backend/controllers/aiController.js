import config from '../config.js'
import axios from 'axios'

// Mocked AI controller - in production, call OpenAI / LangChain
export const getCareerRecommendations = async (profile) => {
  // Analyze profile and return mock recommendations
  return {
    careers: [
      { title: 'Software Engineer', countries: ['USA', 'Canada'], tuitionEstimate: 40 },
      { title: 'Data Scientist', countries: ['Canada', 'Germany'], tuitionEstimate: 35 },
    ],
    universities: [
      { name: 'University of Toronto', country: 'Canada', costYear: 32000 },
      { name: 'ETH Zurich', country: 'Switzerland', costYear: 20000 },
    ],
  }
}

export const getRepaymentStrategy = async (loanData) => {
  // Provide mock strategy
  return {
    strategy: 'Extra monthly payment of ₹5000 + annual 13th month payment',
    estimatedSavings: 450000,
    newTenure: Math.max(36, loanData.tenure - 24),
  }
}

export const chat = async (message, context) => {
  // For now return a canned response based on keywords
  const lower = message.toLowerCase()
  if (lower.includes('country') || lower.includes('budget')) {
    return { text: 'For a 40L budget, consider Canada or Germany for strong ROI and lower tuition.' }
  }
  if (lower.includes('emi') || lower.includes('reduce')) {
    return { text: 'You can reduce EMI by extending tenure or making extra payments; use the EMI calculator for exact numbers.' }
  }

  return { text: 'Great question! Try our Career Discovery tool or EMI Simulator for tailored advice.' }
}
