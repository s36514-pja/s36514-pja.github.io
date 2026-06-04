import './styles/style.css';
import './js/ui.js'
import { refreshUI } from './js/ui.js'
import { question, source, handleSubmit } from './js/riddle.js';
//import javascriptLogo from './assets/javascript.svg'
//import viteLogo from './assets/vite.svg'
//import heroImg from './assets/hero.png'
//
if (import.meta.env.DEV) {
  window.debug.refreshUI = refreshUI
}
