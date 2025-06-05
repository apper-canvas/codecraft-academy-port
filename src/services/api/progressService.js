import progressData from '../mockData/progress.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let progress = [...progressData]

const progressService = {
  async getAll() {
    await delay(250)
    return [...progress]
  },

  async getById(id) {
    await delay(200)
    const progressItem = progress.find(p => p.id === id)
    return progressItem ? { ...progressItem } : null
  },

  async getByCourseId(courseId) {
    await delay(200)
    const progressItem = progress.find(p => p.courseId === courseId)
    return progressItem ? { ...progressItem } : null
  },

  async create(progressData) {
    await delay(350)
    const newProgress = {
      ...progressData,
      id: Date.now(),
      lastAccessed: new Date().toISOString()
    }
    progress.push(newProgress)
    return { ...newProgress }
  },

  async update(id, progressData) {
    await delay(300)
    const index = progress.findIndex(p => p.id === id)
    if (index !== -1) {
      progress[index] = { 
        ...progress[index], 
        ...progressData,
        lastAccessed: new Date().toISOString()
      }
      return { ...progress[index] }
    }
    throw new Error('Progress not found')
  },

  async delete(id) {
    await delay(250)
    const index = progress.findIndex(p => p.id === id)
    if (index !== -1) {
      const deleted = progress.splice(index, 1)[0]
      return { ...deleted }
    }
    throw new Error('Progress not found')
  }
}

export default progressService