import './js/ui.js'
import { refreshUI, transitionToPortfolio } from './js/ui.js'
import { question, source, handleSubmit, rerollRiddle, checkSolvedState } from './js/riddle.js';
import './js/animations.js'
import { initBackground } from './js/animations.js'
import { injectNav, injectFooter } from './js/components.js'

import './styles/style.css'
import './styles/landing.css'
import './styles/nav.css'
import './styles/portfolio.css'
import './styles/animations.css'

import projects from './data/projects.json'

const base = import.meta.env.BASE_URL

if (checkSolvedState()) {
  transitionToPortfolio()
} else {
  refreshUI()
}

injectNav()
injectFooter()
initBackground()
window.addEventListener('load', () => {
  document.getElementById('key-lock').style.opacity = '1'
})

buildGallery()

function buildGallery() {
  const rgbShowcase = document.getElementById('showcase-rgb')
  const cmykShowcase = document.getElementById('showcase-cmyk')

  projects.forEach(project => {
    const card = document.createElement('div')
    card.classList.add('link-container')
    card.innerHTML = `
      <a href="${base}src/pages/presentation.html?id=${project.id}">
        <img src="${project.thumbnail}" alt="${project.title}"/>
        <h2 class="card-title">${project.title}</h2>
        <p class="card-description">${project.description}</p>
        <span class="reveal-link">Przejdź do proejktu →</span>
      </a>
    `
    if (project.category === 'rgb') {
      rgbShowcase.appendChild(card)
    } else {
      cmykShowcase.appendChild(card)
    }
  })
}


if (import.meta.env.DEV) {
  window.debug.refreshUI = refreshUI

  window.debug.resetGame = () => {
    rerollRiddle()
    document.getElementById('psswd').value = ''
    document.getElementById('landing').display = 'block'
    document.getElementById('content').display = 'none'
    refreshUI()
  }

  window.debug.clearSolvedState = () => {
    localStorage.removeItem('riddleSolved')
  }
}
