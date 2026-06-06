import riddlesData from '../data/zagadki.json';
import { lang } from './i18n.js';
import { onWrongAnswer, onCorrectAnswer, refreshUI } from './ui.js'


const arrayLength = riddlesData.length;
let randomRiddle = riddlesData[Math.floor(Math.random() * arrayLength)];
console.group('riddleLog')
console.log('riddle.js loaded');
console.log(`arrayLength: ${arrayLength} riddle ID: ${randomRiddle}`)
console.groupEnd();

let activeRiddle = randomRiddle;
let activeLang = lang;
let question = activeRiddle.riddle[activeLang];
let source = activeRiddle.source ?? "";
console.info(question)
// ^ odpowiada za wylosowanie zagadki, zadeklarowanie potrzebnych zmiennych i przypisanie do nich wartości z pliku .json

function validate(input) { 
  const stringCleaningHeh = (str) => 
    str.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/^(the|a|an|ten|ta|to)\s+/i, '')
    .trim();
  return stringCleaningHeh(input) === stringCleaningHeh(activeRiddle.answer[activeLang])
}
// ^ funkcja upraszcza input użytkownika i porównuje z odpowiedzią zagadki

const riddleField = document.getElementById('zagadka-field')
if (riddleField) {
  riddleField.addEventListener('submit', handleSubmit);
}
function handleSubmit(event) {
  if (event) event.preventDefault();
  const userInput = document.getElementById('psswd').value;
  if (validate(userInput)) {
    onCorrectAnswer()
    console.info('prawidlowa_odpowiedz')
  } else {
    onWrongAnswer()
    console.info('bledna_odpowiedz')
  }
} // ^ druga funkcja nasłuchuje inputu użytkownika, i w momencie zatwierdzenia odpowiedzi, odpowiada, czy jest poprawna, czy błędna
// poniżej znajdują się debuggery - narzędzia do sprawdzania kodu za pomocą DevTools'ów
if (import.meta.env.DEV) {
  window.debug = {
    clearStorage: () => {
      localStorage.clear();
      location.reload();
    },
    rerollRiddle: () => {
      const randomIndex = Math.floor(Math.random() * arrayLength)
      window.debug.setRiddle(randomIndex)
      if (window.debug) window.debug.refreshUI
    },
    setRiddle: (index) => {
      activeRiddle = riddlesData[index]
      question = activeRiddle.riddle[activeLang]
      source = activeRiddle.source ?? ""
      console.info(question)
      if (window.debug) window.debug.refreshUI
    },
    setLang: (newLang) => {
      activeLang = (newLang)
      question = activeRiddle.riddle[activeLang]
      console.info(question)
      if (window.debug) window.debug.refreshUI
    },
    checkQuestion: () => { 
      question = activeRiddle.riddle[activeLang]; 
      console.info(question) 
    },
    checkValid: (pssd) => {
      console.info(validate(pssd));
    }
  }
}
export { question, source, handleSubmit }
export function getRiddleData() {
  return { question, source, activeLang }
}
export function rerollRiddle() { 
  const randomIndex = Math.floor(Math.random() * arrayLength)
  window.debug.setRiddle(randomIndex)
  if (window.debug) window.debug.refreshUI
}
