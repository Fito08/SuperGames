var Btns = [btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8, btn9, btn10, btn11, btn12, btn13, btn14, btn15, btn16];
let valores = [1, 2, 3, 4, 5,6, 7 , 8, 1, 2, 3, 4, 5,6, 7 ,8];

var inicio = false;
var primerClick = false;
var valorAnterior;
var valorActual;
var compararPares = false;
var thisAnterior;
var thisActual;
var correctos = 0;
var inGame = false;
var tempoMidle = false;
var tempoShow = 1;
var topTemp = 10000;
var countTurns = 0;
var bestCountTurns = 10000;

function delay(time){
	return new Promise(resolve =>
		setTimeout(resolve,time));
}

function darValor() {
	//Aqui estaria el shuffle
	shufleArray(valores);
	//Aqui le damos los valores mezclados a los botones
	for (var i = 0; i < Btns.length; i++){
		Btns[i].value = valores[i];
	}
}

function shufleArray(Arr) {
	for(let i = 0; i < Arr.length; i++){
		const randomIndex = Math.floor(Math.random()* Arr.length);
		const temp = Arr[i];
		Arr[i] = Arr[randomIndex];
		Arr[randomIndex] = temp;
	}
	return Arr;
}

async function startTime() {
	while (tempoMidle != true){
		await delay(1000);
		if (correctos == valores.length){
			inicio = false;
			ganasteElse.value = '¡Ganaste!';
			inGame = false;
			tempoMidle = true;
			if (tempoShow < topTemp){
				topTemp = tempoShow;
				bestTime.value = topTemp;
			}
			if (countTurns < bestCountTurns){
				bestCountTurns = countTurns;
				bestTurnosPlay.value = bestCountTurns;
			}
		}
		contadorTiempo.value = tempoShow;
		tempoShow++;
	}	
}

function iniciarJuego() {
	if(inGame == false){
		countTurns = 0;
		contadorTiempo.value = '';
		contadorTurnos.value = '';
		tempoShow = 1;
		tempoMidle = false;
		correctos = 0;
		inicio = true;
		ganasteElse.value = '';

		darValor();
		for(var i = 0; i < Btns.length ; i++) {
			Btns[i].style.transition = '0.3 ease';
			Btns[i].style.backgroundColor = 'skyblue';
			Btns[i].innerHTML = '';
		}
		primerClick = false;
		compararPares = false;
		startTime();
		inGame = true;
	}
}

async function checkPares(v1, bg) {
	if (primerClick == false) {
		bg.style.backgroundColor = 'orangered';
		valorAnterior = v1;
		thisAnterior = bg; 
		valorActual = -1;
		compararPares = false;
		bg.value = -1;
		primerClick = true;
	} else {
		bg.style.backgroundColor = 'orangered';
		valorActual = v1;
		primerClick = false;
		thisActual = bg;
		compararPares = true;
	}

	if (compararPares == true) {
		if (valorActual != valorAnterior) {
			bg.value = -1;
			inicio = false;
			await delay(1000);
			countTurns++;
			contadorTurnos.value = countTurns;
			inicio = true;
			bg.value = valorActual;
			thisAnterior.value = valorAnterior;
			thisActual.style.backgroundColor = 'skyblue';
			thisAnterior.style.backgroundColor = 'skyblue';
			thisActual.innerHTML = '';
			thisAnterior.innerHTML = '';
		} else {
			correctos += 2;
			thisActual.style.backgroundColor = 'limeGreen';
			thisAnterior.style.backgroundColor = 'limeGreen';
			bg.value = -1;
		}
	}
}

function clickBoton() {
	if (inicio == true){
		if (this.value >= 0) {
			this.innerHTML = this.value;
			checkPares(this.value, this);
		}
		if (correctos == valores.length){
			inicio = false;
			ganasteElse.value = '¡Ganaste!';
		}
	}
}

btnIniciar.onclick = iniciarJuego;

for (i = 0; i < Btns.length; i++) {
	Btns[i].onclick = clickBoton;
}
