import projectsData from '../mockData/projects.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let projects = [...projectsData]

const projectService = {
  async getAll() {
    await delay(300)
    return [...projects]
  },

  async getById(id) {
    await delay(200)
    const project = projects.find(p => p.id === id)
    return project ? { ...project } : null
  },

  async create(projectData) {
    await delay(400)
    const newProject = {
      ...projectData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    }
    projects.push(newProject)
    return { ...newProject }
  },

  async update(id, projectData) {
    await delay(350)
    const index = projects.findIndex(p => p.id === id)
    if (index !== -1) {
      projects[index] = { ...projects[index], ...projectData }
      return { ...projects[index] }
    }
    throw new Error('Project not found')
  },

  async delete(id) {
    await delay(250)
    const index = projects.findIndex(p => p.id === id)
    if (index !== -1) {
      const deleted = projects.splice(index, 1)[0]
      return { ...deleted }
    }
    throw new Error('Project not found')
  }
}

export default projectService