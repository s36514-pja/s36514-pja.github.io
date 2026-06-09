import projects from '../data/projects.json'
import { injectNav, injectFooter } from './components.js'
import { initBackground } from './animations.js'
import '../styles/presentation.css'
import '../styles/style.css'
import '../styles/nav.css'

const base = import.meta.env.BASE_URL

injectNav()
injectFooter()
initBackground()


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
  document.getElementById('project-title').textContent = project.title
  document.getElementById('project-description').textContent = project.body
  document.getElementById('crumb').innerHTML = `
    <ol>
      <li><a href="${base}index.html">Home</a></li>
      <li><a href="#">${project.category.toUpperCase()}</a></li>
      <li>${project.title}</li>
    </ol>
  `
  const highlight = document.getElementById('project-highlight')
  if (project.images.length > 0) {
    const heroImg = document.createElement('img')
    heroImg.src = project.images[0]
    heroImg.alt = project.description
    highlight.appendChild(heroImg)
  }

  const imageContainer = document.getElementById('project-images')
  project.images.forEach(src => {
    const img = document.createElement('img')
    img.src = src
    img.alt = project.title
    imageContainer.appendChild(img)
  })


  document.getElementById('project-info').innerHTML += `
    <p>${project.year}</p>
  `
}

buildPresentation()
