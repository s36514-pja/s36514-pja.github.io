import './js/ui.js'
import { refreshUI, transitionToPortfolio } from './js/ui.js'
import { question, source, handleSubmit, rerollRiddle, checkSolvedState } from './js/riddle.js';
import './styles/style.css'
import './styles/landing.css'
import './styles/nav.css'
import './styles/portfolio.css'
import './styles/animations.css'
import './js/animations.js'
import { initBackground } from './js/animations.js'
//import javascriptLogo from './assets/javascript.svg'
//import viteLogo from './assets/vite.svg'
//import heroImg from './assets/hero.png'
if (checkSolvedState()) {
  transitionToPortfolio()
} else {
  refreshUI()
}

initBackground()
window.addEventListener('load', () => {
  document.getElementById('key-lock').style.opacity = '1'
})

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
