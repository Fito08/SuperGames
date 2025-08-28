	let icons = ['bx-home','bx-heart','bx-search-alt-2','bx-chat','bx-cog','bx-bell','bxs-color','bx-right-arrow-alt','bx-moon','bx-sun','bx-palette','bx-brush','bxs-pear','bxs-balloon','bx-lemon','bxs-cat','bx-bell-off','bx-body','bx-accessibility','bx-universal-access','bxs-caret-up-circle','bxs-hand-down','bx-reply-all','bx-reply'];
	var btns = [btn1,btn2,btn3,btn4,btn5,btn6,btn7,btn8,btn9,btn10,btn11,btn12,btn13,btn14,btn15,btn16];
	var puntaje = 0;
	var printC;
	var difQ = 2;
	var cordsBtn = [];
	let capValBtn = [];
	var valOR;
	var bolita = 1;
	var conbo = true;
	var nClick = 0;
	var t = 0;
	var gamem = 1;
	var deta1 = 0;
	var start = false;
	var timeRElec = 3;
	var timeReact = timeRElec * 1000;
	var timeElecTran = 8000;
	var timeelec = timeElecTran/1000;
	var kana;
	let highscore = localStorage.getItem("highscore") || 0;

	function delay(time){
	return new Promise(resolve =>
		setTimeout(resolve,time));
	}

	//Las funciones que se ejecutan
	botonIniciar.onclick = DoolaranINIC;
	for (i = 0; i < btns.length; i++) {
		btns[i].onclick = doranClick;
	}

	function DoolaranINIC() {
		if(start == false){
			start = true;
			document.getElementById("Mejorscore").textContent = "Record: "+highscore;
			Doolaran1();
		}
	}

	function readdiff() {
		if(puntaje == 0){
			difQ = 2;
		}
		if(puntaje ==3){
			difQ = 3;
		}
		if(puntaje == 7){
			difQ = 5;
		}
		if(puntaje == 12){
			difQ = 7;
		}
		if(puntaje == 20){
			difQ = 9;
		}
	}

	async function Doolaran1() {
		if(conbo==true){
			conbo = false;
			readdiff();
			revalue();
			console.log('Try#'+gamem);
			if(puntaje < 0){
				puntaje = 0;
			}
			for(var i = 0; i <difQ; i++){
				bolita = Math.floor(Math.random()*(btns.length));
				CC();
			}
			console.table(cordsBtn);
			printBtns();
			console.table(capValBtn);
			console.log('Fase#1: Cap y Dar');

			await delay(timeReact);
			nClick++;
			limpiezadoranCords();
			console.log('Fase#2: Elim y Blanq');
			await delay(400);

			var medT = puntaje;
			nClick++;
			for(var i = 0; i <difQ+1; i++){
				var look = i;
				if(look == difQ){
					t++;
				}
				bolita = Math.floor(Math.random()*(btns.length));
				CC();
			}
			t--;
			console.log('Fase#3: reOr Vals');
			printBtns();
			console.table(capValBtn);
			console.table(cordsBtn);
			timeRespon(medT);
			conbo = true;
		}

	}

	async function timeRespon(a){
		if(timeElecTran < 8000){
			timeElecTran = 8000;
		}
		for(var i = 0; i < timeelec; i++){
			console.log('time:'+i);
			if(a != puntaje){
				console.log('Cort y Rein');
				i = timeelec;
			}
			await delay(1000);
			timeElecTran -= 1000;
			console.log(timeElecTran);
			if(timeElecTran == 0){
				console.log('Tiempo Agotado');
				diefunc();
			}
		}

	}

	function printBtns() {
		if(nClick == 0){
			for(let i = 0; i <cordsBtn.length; i++){
				valOR = Math.floor(Math.random()*(icons.length));
				CV();
				btns[cordsBtn[i]].classList.toggle(capValBtn[i]);
			}
		} else {
			valOR = Math.floor(Math.random()*(icons.length));
			CV();
			for(let i = 0; i <cordsBtn.length; i++){
				btns[cordsBtn[i]].classList.toggle(capValBtn[i]);
			}
			console.log('Fase#4: printVals');
			nClick = 0;
		}
	}

	function CV() {
		for(var k= 0; k <difQ; k++){
			for(var j = 0; j < capValBtn.length; j++){
				if(capValBtn[j] == icons[valOR]){
					var ant = capValBtn[j];
					valOR = Math.floor(Math.random()*(btns.length));
					console.log('CV-QP? = '+ant + ' -> '+icons[valOR]);
				}
			}
		}
		console.log('Icono agregado');
		capValBtn.push(icons[valOR]);
	}

	function CC() {
		for(var k= 0; k <difQ; k++){
			for(var j = 0; j < cordsBtn.length; j++){
				if(cordsBtn[j] == bolita){
					var ant = bolita;
					bolita = Math.floor(Math.random()*(btns.length));
					console.log('CC-QP? = '+ant + ' -> '+bolita);
				}
			}
		}
		cordsBtn.push(bolita);
		if(nClick == 1){
			darValue(bolita);
		}
	}
	
	function darValue(a) {
		if(t == 1){
			btns[a].value = 'NO'
			console.log('New');
		} else {
			btns[a].value = 'SI'
		}
		
	}

	function limpiezadoranCords() {
		for(let i = 0; i <cordsBtn.length; i++){
			btns[cordsBtn[i]].classList.toggle(capValBtn[i]);
		}
		if(nClick == 1){
			kana = cordsBtn.length;
			for(var i = 0; i <difQ+1; i++){
				cordsBtn.pop();
			}
			if(deta1 == 0){
				cordsBtn.push('Cords Cambiadas');
				deta1++;
			}else {
				cordsBtn.push('Cords Vaciadas');
				deta1--;
			}
			console.table(cordsBtn);
			cordsBtn.pop();
			nClick=0;
		}
	}

	function limpiezadoranValrs() {
		for(var i = 0; i <kana+1; i++){
			capValBtn.pop();
		}
		capValBtn.push('Valores Vaciados');
		console.table(capValBtn);
		capValBtn.pop();
		nClick--;
	}

	async function doranClick() {
		console.log(this.value);
		if(this.value == "SI" || this.value == "NO"){
			if(this.value == "SI"){
				diefunc();
			} else {
				printC = true;
				changeColor();
				await delay(600);
				revalue();
				nClick++;
				limpiezadoranCords();
				nClick++;
				limpiezadoranValrs();
				await delay(1000);
				gamem++;
				Doolaran1();
				puntaje++;
				console.log("Record:"+highscore)
				ptsobt.value = puntaje;
				if (puntaje > highscore) {
					highscore = puntaje;
					localStorage.setItem("highscore", highscore);
					document.getElementById("Mejorscore").textContent = "Record: "+highscore;
				}
				console.log('-------------------');
			}
		}
	}

	async function changeColor() {
		if(printC == false){
			Tablero.classList.add('bgRed');
			await delay(500);
			Tablero.classList.remove('bgRed');
		}
		if(printC == true){
			Tablero.classList.add('bgGreen');
			await delay(500);
			Tablero.classList.remove('bgGreen');
		}
	}

	function revalue() {
		for (var i = 0; i < btns.length; i++){
			btns[i].value = i;
		}
	}

	function diefunc() {
		printC = false;
		changeColor();
		revalue();
		nClick++;
		limpiezadoranCords();
		nClick++;
		limpiezadoranValrs();
		puntaje = 0;
		ptsobt.value = puntaje;
		puntaje--;
		difQ = 2;
		start = false;
		console.log('-------------------');
	}