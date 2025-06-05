import lessonsData from '../mockData/lessons.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let lessons = [...lessonsData]

const lessonService = {
  async getAll() {
    await delay(250)
    return [...lessons]
  },

  async getById(id) {
    await delay(200)
    const lesson = lessons.find(l => l.id === id)
    return lesson ? { ...lesson } : null
  },

  async getByCourseId(courseId) {
    await delay(300)
    return lessons.filter(l => l.courseId === courseId).map(l => ({ ...l }))
  },

  async create(lessonData) {
    await delay(400)
    const newLesson = {
      ...lessonData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    }
    lessons.push(newLesson)
    return { ...newLesson }
  },

  async update(id, lessonData) {
    await delay(350)
    const index = lessons.findIndex(l => l.id === id)
    if (index !== -1) {
      lessons[index] = { ...lessons[index], ...lessonData }
      return { ...lessons[index] }
    }
    throw new Error('Lesson not found')
  },

  async delete(id) {
    await delay(250)
    const index = lessons.findIndex(l => l.id === id)
    if (index !== -1) {
      const deleted = lessons.splice(index, 1)[0]
      return { ...deleted }
    }
    throw new Error('Lesson not found')
  }
}

export default lessonService