const screenHistory = document.getElementById('screen-history');
const screenData = document.getElementById('screen-data');
const clearBtn = document.getElementById('clear');
const delBtn = document.getElementById('del');
const calcBtns = document.querySelectorAll('.num');
const oprBtns = document.querySelectorAll('.opr');
const numBtns = document.querySelectorAll('.num');
const pointBtn = document.querySelector('.point');

let a = '';
let b = '';
let result = 0;
let operator = '';

numBtns.forEach((button) =>
	button.addEventListener('click', (e) => handleInput(e.target))
);

oprBtns.forEach((button) =>
	button.addEventListener('click', (e) => handleInput(e.target))
);

pointBtn.addEventListener('click', (e) => handleInput(e.target));

clearBtn.addEventListener('click', () => clearScreen());

delBtn.addEventListener('click', () => backSpace());

function handleInput(input) {
	console.log(input);
	if (input.classList.contains('num')) {
		handleNums(input);
	} else if (input.classList.contains('point')) {
		handlePoints(input);
	} else if (input.classList.contains('opr')) {
		handleOperators(input);
	} else if (input.classList.contains('equals') && a && operator && b) {
		operate();
	}
	updateScreen();
	return;
}

function handleNums(input) {
	if (input.classList.contains('num') && !operator) {
		a += input.innerText;
	} else if (input.classList.contains('num') && operator) {
		b += input.innerText;
	}
	return;
}

function handleOperators(input) {
	if (
		input.classList.contains('opr') &&
		!operator &&
		!input.classList.contains('percent') &&
		!input.classList.contains('pos-neg')
	) {
		setOperators(input);
	} else if (input.classList.contains('percent') && a) {
		operator = '%';
		percent();
	} else if (input.classList.contains('pos-neg') && a) {
		operator = '-';
		posNeg();
	} else if (input.classList.contains('opr') && operator && a && b) {
		operate();
		setOperators(input);
	}

	return;
}

function handlePoints(input) {
	if (
		input.classList.contains('point') &&
		!operator &&
		!b &&
		!a.includes('.')
	) {
		a += input.innerText;
	} else if (
		input.classList.contains('point') &&
		operator &&
		!b.includes('.')
	) {
		b += input.innerText;
	}
	return;
}

function operate() {
	if (operator === '+') {
		add();
		showResults();
	} else if (operator === '-') {
		subtract();
		showResults();
	} else if (operator === '*') {
		multiply();
		showResults();
	} else if (operator === '/' && b != '0') {
		divide();
		showResults();
	} else {
		clearScreen();
		alert('dividing by zero is impossible...duh!');
	}
	return a, b, result;
}

function setOperators(input) {
	if (input.classList.contains('add') && a) {
		operator = '+';
	} else if (input.classList.contains('subtract') && a) {
		operator = '-';
	} else if (input.classList.contains('multiply') && a) {
		operator = '*';
	} else if (input.classList.contains('divide') && a) {
		operator = '/';
	}
	return;
}

function add() {
	result = parseFloat(a) + parseFloat(b);
	roundResult();
}

function subtract() {
	result = parseFloat(a) - parseFloat(b);
	roundResult();
}

function multiply() {
	result = parseFloat(a) * parseFloat(b);
	roundResult();
}

function divide() {
	result = parseFloat(a) / parseFloat(b);
	roundResult();
}

function percent() {
	result = parseFloat(a) / 100;
	roundResult();
	showResults();
}

function posNeg() {
	result = parseFloat(a) * -1;
	showResults();
}

function roundResult() {
	result = result.toFixed(5).replace(/\.?0+$/, '');
}

function clearOperands() {
	a = result.toString();
	b = '';
	operator = '';
}

function showResults() {
	updateScreenHistory();
	clearOperands();
	updateScreen();
}

function clearScreen() {
	a = '';
	b = '';
	operator = '';
	screenData.innerText = '';
	screenHistory.innerText = '';
}

function backSpace() {
	if (a && operator && b) {
		b = b.slice(0, -1);
	} else if (a && operator && !b) {
		operator = '';
	} else if (a && !operator && !b) {
		a = a.slice(0, -1);
	}
	updateScreen();
}

function updateScreen() {
	screenData.innerText = `${a}${operator}${b}`;
}

function updateScreenHistory() {
	if (screenHistory.innerText === '') {
		screenHistory.innerText = `${a}${operator}${b}=${result}`;
	} else {
		screenHistory.innerText += `${operator}${b}=${result}`;
	}
}
