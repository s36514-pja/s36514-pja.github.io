import '../styles/minigame.css'
import { injectNav, injectFooter } from './components.js'
import { initBackground, playWrongAnswer, playTransition } from './animations.js'
import riddlesData from '../data/zagadki.json'
import { lang } from './i18n.js'

injectNav()
injectFooter()
initBackground()

let activeLang = lang
let score = 0
let activeRiddle = null
let usedIndices = []

window.addEventListener('load', () => {
  document.getElementById('key-lock').style.opacity = '1'
  loadNewRiddle()
})

function getRandomUnusedIndex() {
  if (usedIndices.length >= riddlesData.length) {
    usedIndices = []
  }
  let index
  do {
    index = Math.floor(Math.random() * riddlesData.length)
  } while (usedIndices.includes(index))
  usedIndices.push(index)
  return index
}

function loadNewRiddle() {
  activeRiddle = riddlesData[getRandomUnusedIndex()]
  document.getElementById('riddle-text').textContent = activeRiddle.riddle[activeLang]
  document.getElementById('riddle-source').textContent = activeRiddle.source ?? ''
  document.getElementById('psswd').value = ''
  document.getElementById('riddle-feedback').textContent = ''
}

function updateScore(correct) {
  if (correct) {
    score++
  } else {
    score = 0 
  }
  document.getElementById('score-value').textContent = score
}

function validate(input) {
  const clean = (str) =>
    str.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/^(the|a|an|ten|ta|to)\s+/i, '')
    .trim()
  return clean(input) === clean(activeRiddle.answer[activeLang])
}

const form = document.getElementById('zagadka-field')
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const userInput = document.getElementById('psswd').value
    if (validate(userInput)) {
      onCorrect()
    } else {
      onWrong()
    }
  })
}

function onCorrect() {
  updateScore(true)
  const answer = activeRiddle.answer[activeLang]
  
  playTransition(answer, () => {
    setTimeout(() => {
      loadNewRiddle()
      document.getElementById('lock-mechanism').innerHTML = ''
    }, 800)
  })
}

function onWrong() {
  updateScore(false)
  document.getElementById('riddle-feedback').textContent = 'Błędna odpowiedź'
  playWrongAnswer()
}
