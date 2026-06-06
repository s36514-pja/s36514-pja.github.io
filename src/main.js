import './styles/style.css';
import './js/ui.js'
import { refreshUI } from './js/ui.js'
import { question, source, handleSubmit, rerollRiddle } from './js/riddle.js';
//import javascriptLogo from './assets/javascript.svg'
//import viteLogo from './assets/vite.svg'
//import heroImg from './assets/hero.png'
//
if (import.meta.env.DEV) {
  window.debug.refreshUI = refreshUI
  window.debug.resetGame = () => {
    rerollRiddle()
    document.getElementById('psswd').value = ''
    document.getElementById('landing').display = 'block'
    document.getElementById('content').display = 'none'
    refreshUI()
  }
}
