import riddlesData from '../data/zagadki.json';
import { lang } from './i18n.js';
console.info('riddle.js loaded');

const arrayLength = riddlesData.length;
let randomRiddle = riddlesData[Math.floor(Math.random() * arrayLength)];
console.info(`arrayLength: ${arrayLength} riddle ID: ${randomRiddle}`)

let activeRiddle = randomRiddle;
let activeLang = lang;
let question = activeRiddle.riddle[activeLang];
let source = activeRiddle.source ?? "";
console.log(question)
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
    console.log('prawidlowa_odpowiedz')
  } else {
    console.log('bledna_odpowiedz')
  }
} // ^ druga funkcja nasłuchuje inputu użytkownika, i w momencie zatwierdzenia odpowiedzi, odpowiada, czy jest poprawna, czy błędna
// poniżej znajdują się debuggery - narzędzia do sprawdzania kodu za pomocą DevTools'ów
if (import.meta.env.DEV) {
  window.debug = {
    clearStorage: () => {
      localStorage.clear();
      location.reload();
    },
    setRiddle: (index) => {
      activeRiddle = riddlesData[index]
      question = activeRiddle.riddle[activeLang]
      source = activeRiddle.source ?? ""
      console.log(question)
    },
    setLang: (newLang) => {
      activeLang = (newLang)
      question = activeRiddle.riddle[activeLang]
      console.log(question)
    },
    checkQuestion: () => { 
      question = activeRiddle.riddle[activeLang]; 
      console.log(question) 
    },
    checkValid: (pssd) => {
      console.log(validate(pssd));
    }
  }
}
export { question, source, handleSubmit }
