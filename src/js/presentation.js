import '../styles/presentation.css'
import { injectNav, injectFooter } from './components.js'
import { initBackground } from './animations.js'

injectNav()
injectFooter()
initBackground()

buildPresentation()

function getProjectFromURL() {
  const params = new URLSearchParams(window.location.search)
  const id = params.get('id')
  return projects.find(p => p.id === id) ?? null
}

function buildPresentation() {
  const project = getProjectFromURL()

  if (!project) {
    document.getElementById('project-title').textContent = '404 nie istnieje'
    return
  }

