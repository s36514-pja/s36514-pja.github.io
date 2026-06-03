import './styles/style.css'
//import javascriptLogo from './assets/javascript.svg'
//import viteLogo from './assets/vite.svg'
//import heroImg from './assets/hero.png'

//tworzy pusty string, w którym będzie przechowywany input z klawiatury
let keystrokeString = '';
//dodaje funkcję nasłuchującą klawiszy
document.addEventListener('keydown', (event) => {
	const sorting = ['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab',];
	if (sorting.includes(event.key)) return;
	//eliminuje klawisze funkcji
	else if (event.key === " ") {
		console.warn('Space pressed');
		return;
	}
	//ostrzega, że została wciśnięta spacja
	else if (event.key === 'Enter') {
		console.info(keystrokeString);
		keystrokeString = '';
		return;
	}
	//drukuje przechowany string, jeśli został wciśnięty enter
	else {
	keystrokeString += event.key;
	}
	//każdy inny klawisz zostaje dodany do stringa
})
