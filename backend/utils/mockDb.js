// Mock database for demonstration
// In production, use PostgreSQL with Sequelize

const users = new Map()
const loans = new Map()
const careerProfiles = new Map()

let userIdCounter = 1
let loanIdCounter = 1

export const createUser = (email, name, password) => {
  const id = userIdCounter++
  const user = {
    id,
    email,
    name,
    password, // In production, hash this
    createdAt: new Date(),
  }
  users.set(id.toString(), user)
  return user
}

export const findUserByEmail = (email) => {
  for (const user of users.values()) {
    if (user.email === email) return user
  }
  return null
}

export const findUserById = (id) => {
  return users.get(id.toString())
}

export const createLoan = (userId, amount, rate, tenure) => {
  const id = loanIdCounter++
  const loan = {
    id,
    userId,
    amount,
    rate,
    tenure,
    status: 'active',
    createdAt: new Date(),
  }
  loans.set(id.toString(), loan)
  return loan
}

export const getLoansByUserId = (userId) => {
  const userLoans = []
  for (const loan of loans.values()) {
    if (loan.userId === userId) userLoans.push(loan)
  }
  return userLoans
}

export const updateCareerProfile = (userId, profile) => {
  const existing = careerProfiles.get(userId.toString())
  const updated = { ...existing, ...profile, userId, updatedAt: new Date() }
  careerProfiles.set(userId.toString(), updated)
  return updated
}

export const getCareerProfile = (userId) => {
  return careerProfiles.get(userId.toString())
}

export const resetMockData = () => {
  users.clear()
  loans.clear()
  careerProfiles.clear()
  userIdCounter = 1
  loanIdCounter = 1
}
