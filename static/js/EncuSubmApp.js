var Botones = [btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8, btn9, btn10, btn11, btn12, btn13, btn14, btn15, btn16, btn17, btn18, btn19, btn20, btn21, btn22, btn23, btn24, btn25];

	var iniciar = false;
	var blocke = 0;
	var intentos;
	var turno = 1;
	var T_Fallos = 0;
	var J_Fallos = 0;
	var Aciertos = 0;
	var Txt_GoN;
	var TurnosE = 5;
	var Acerto_o_No = false;
	var Empezado = false;
	var numRan = 2;

	function generarNumeroRandom(max) {
		numRan = Math.floor(Math.random()*(max + 1));
		console.log(numRan);
	}

	function valoresGenerales() {	
		deshacerColores();
		generarNumeroRandom(24);
		principalText.value = 'Elige una coordenada...';
		intentos = TurnosE;
		contadorIntentosG.value = intentos;
		contadorIntentosP.value = intentos;
		
		Empezado = true;
		reloadTurno();
		if (blocke == 0){
			for(let i = 0; i < Botones.length; i++){
			Botones[i].classList.toggle('block');
			}
			blocke++;
		}

		for(let i = 0; i < Botones.length; i++){
			Botones[i].innerHTML = '-_-_'
		}
		for(let i = 0; i < Botones.length; i++) {
			Botones[i].value = i;
		}
		
		iniciar = true;
	}


	function checkGame(b1) {
		if (intentos == 0 && b1 != numRan){
			secundariText.value = '¡Perdiste!';
			iniciar = false;
			J_Fallos++;
			contadorFallosJuegos.value = J_Fallos;
			Botones[numRan].innerHTML = '-X-';
			Botones[numRan].style.backgroundColor = 'limeGreen';
		}
		if (b1 == numRan){
			secundariText.value = '¡Ganaste!';
		}
	}


	function checkTurn(b1) {
		if (b1 == numRan){
			Txt_GoN = '!Acertaste!'
			Acerto_o_No = true;
			iniciar = false;
			Aciertos++; 
			contadorAcertados.value = Aciertos;

		} else {
			Txt_GoN = 'Fallaste'
			Acerto_o_No = false;
			T_Fallos++;
			contadorFallosTurnos.value = T_Fallos;
			Botones[b1].style.color = 'red';
		}
	}

	function clickBoton() {
		if (iniciar == true) {
			if (this.value >= 0) {
				checkTurn(this.value);
				principalText.value = 'Turno: '+turno+' | '+Txt_GoN;
				turno++;
				intentos--;
				if (Acerto_o_No == false) {
					this.innerHTML = '-O-';
				} else {
					this.innerHTML = '-X-'
				}
				contadorIntentosG.value = intentos;
				checkGame(this.value);

				this.value = -1;
			}
		}
	}

	function reloadTurno() {
		secundariText.value = '';
		turno = 1;
	}

	function reiniciarJuego() {
		principalText.value = 'Esperando a iniciar...';
		reloadTurno();
		contadorIntentosG.value = '';
		contadorIntentosP.value = '';
		Empezado = false;
		if (blocke == 1){
			for(let i = 0; i < Botones.length; i++){
			Botones[i].classList.toggle('block');
			}
		}
		blocke =0;
		iniciar = false;
		for(let i = 0; i < Botones.length; i++){
			Botones[i].innerHTML = '';
		}
		deshacerColores();
		
	}

	function deshacerColores() {
		for(let i = 0; i < Botones.length; i++){
			Botones[i].style.color = '';
			Botones[i].style.backgroundColor = '';
		}
	}
	function reloadPoints(){
		T_Fallos = 0;
		contadorFallosTurnos.value = T_Fallos;
		J_Fallos= 0;
		contadorFallosJuegos.value = J_Fallos;
		Aciertos= 0;
		contadorAcertados.value = Aciertos;
	}

	function sumaTurnos() {
		if(Empezado == false){
			TurnosE++;
			elegirTurnos.value = TurnosE;
		}
	}

	function restaTurnos() {
		if(Empezado == false) {
			TurnosE--;
			elegirTurnos.value = TurnosE;
		}
	}
	

	for (let i = 0; i < Botones.length; i++){
		Botones[i].onclick = clickBoton;
	}
	startGame.onclick = valoresGenerales;
	resetGame.onclick = reiniciarJuego;
	resetPuntosPequeño.onclick = reloadPoints;
	resetPuntosGrande.onclick = reloadPoints;
	btn_mas_turnos.onclick = sumaTurnos;
	btn_menos_turnos.onclick = restaTurnos;