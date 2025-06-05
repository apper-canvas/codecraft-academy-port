import coursesData from '../mockData/courses.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let courses = [...coursesData]

const courseService = {
  async getAll() {
    await delay(300)
    return [...courses]
  },

  async getById(id) {
    await delay(200)
    const course = courses.find(c => c.id === id)
    return course ? { ...course } : null
  },

  async create(courseData) {
    await delay(400)
    const newCourse = {
      ...courseData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    }
    courses.push(newCourse)
    return { ...newCourse }
  },

  async update(id, courseData) {
    await delay(350)
    const index = courses.findIndex(c => c.id === id)
    if (index !== -1) {
      courses[index] = { ...courses[index], ...courseData }
      return { ...courses[index] }
    }
    throw new Error('Course not found')
  },

  async delete(id) {
    await delay(250)
    const index = courses.findIndex(c => c.id === id)
    if (index !== -1) {
      const deleted = courses.splice(index, 1)[0]
      return { ...deleted }
    }
    throw new Error('Course not found')
  }
}

export default courseService