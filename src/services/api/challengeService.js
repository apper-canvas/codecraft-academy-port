import challengesData from '../mockData/challenges.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let challenges = [...challengesData]

const challengeService = {
  async getAll() {
    await delay(300)
    return [...challenges]
  },

  async getById(id) {
    await delay(200)
    const challenge = challenges.find(c => c.id === id)
    return challenge ? { ...challenge } : null
  },

  async getByLessonId(lessonId) {
    await delay(250)
    return challenges.filter(c => c.lessonId === lessonId).map(c => ({ ...c }))
  },

  async create(challengeData) {
    await delay(400)
    const newChallenge = {
      ...challengeData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    }
    challenges.push(newChallenge)
    return { ...newChallenge }
  },

  async update(id, challengeData) {
    await delay(350)
    const index = challenges.findIndex(c => c.id === id)
    if (index !== -1) {
      challenges[index] = { ...challenges[index], ...challengeData }
      return { ...challenges[index] }
    }
    throw new Error('Challenge not found')
  },

  async delete(id) {
    await delay(250)
    const index = challenges.findIndex(c => c.id === id)
    if (index !== -1) {
      const deleted = challenges.splice(index, 1)[0]
      return { ...deleted }
    }
    throw new Error('Challenge not found')
  }
}

export default challengeService