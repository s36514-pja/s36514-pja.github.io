import { getRiddleData, handleSubmit, saveSolvedState } from './riddle.js'
import { playWrongAnswer, playTransition } from './animations.js'
const { question, source } = getRiddleData();
// destrukturyzuje wyeksportowaną funckcję z riddle.js

const riddleText = document.getElementById('riddle-text')
const riddleSource = document.getElementById('riddle-source')
const feedback = document.getElementById('riddle-feedback')
const landing = document.getElementById('landing')
const content = document.getElementById('content')
//console.log(riddleText, riddleSource, feedback)
// deklaruje elementy z DOM'u

riddleText.textContent = question
riddleSource.textContent = source
// podłącza treść zagadki i jej źródło do zadeklarowanych wcześniej elementów

export function onWrongAnswer() {
  feedback.textContent = 'Błędna odpowiedź'
  playWrongAnswer()
}
export function onCorrectAnswer () {
  saveSolvedState()
  feedback.textContent = ''
  const { answer } = getRiddleData()
  playTransition(answer, transitionToPortfolio)
  //transitionToPortfolio()
}
export function transitionToPortfolio() {
  document.getElementById('bg-canvas').classList.add('content')
  landing.classList.add('hidden');
  content.classList.add('visible');
}
export function refreshUI() {
  const { question, source } = getRiddleData();
  console.log('refreshUI called:', question, source)
  riddleText.textContent = question
  riddleSource.textContent = source
  document.getElementById('key-lock').classList.add('ready')
}
