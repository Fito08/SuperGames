var btns = [btn1,btn2,btn3,btn4,btn5,btn6,btn7,btn8,btn9];//Este array contiene los botones
    var ArrNums = []; //Este array contiene los valores a dar
    var posicion = 0; //Aqui se vera en que numero va el jugador
    var active = true; //Para activar y desactivar los botones
    var punteo = 0; //Variable para ir mostrando el punteo
    var dificultad = 3; //La variable para ir marcando la dificultad, cuantos valores se mostraran
    var nivelElegido = 9; //Mediremos el rango de numeros que apareceran
    var jugando = false; //Verifica que el juego esta activo o no
    var winOrlose = true; //Verifica si ya se perdio o si ya se gano
    var time = 15; //Cantidad de segundos a dar de tiempo

    const inputPts = document.getElementById('viewPts');
    const Tablero = document.getElementById('tablero');
    
    //Creamos un temporizador
    function delay(time){
	return new Promise(resolve =>
		setTimeout(resolve,time));
	}

    async function timer() {
        winOrlose = false;
        if(!winOrlose){
            time < 15 ? time= 15:time;
            while(!winOrlose){
                temp.value = time;
                time < 1 ? winOrlose=true && diefunc(): time;
                await delay(1000);
                time -= 1;
            }
        }
    }

    //En esta funcion mezclaremos los numeros y les daremos valores a los botones, tambien servira para reiniciar el juego
    async function initG() {
        if(jugando == false){
            temp.value = '';
            temp.value = time;
            jugando = true;
            ArrNums = [];
            verDificultad(); // Si quieres subir la dificultad, comenta esta funcion o modificala

            generarValores(ArrNums); // Generamos valores al array de numeros
            
            shufleArray(ArrNums);//Lo mezclamos bien mezclado
            posicion =0;//Reiniciamos el contador de clicks

            cleanColor();//Reseteamos todo el css del tablero
            
            for(var i = 0; i< dificultad; i++){//Le damos los valores a los botones
                btns[i].value = ArrNums[i];
                btns[i].classList.add('active');//Les damos la clase 'Active' a los btn
            }
            ArrNums.sort((a,b) => a-b);//Ordenamos los numeros por nombre saliendo del 1 al 9
            console.table(ArrNums);

            for(let i = 0; i < btns.length; i++){
                btns[i].innerHTML = btns[i].value;
            }

            winOrlose == true ? timer():winOrlose;
        }
    }

    //Aqui generaremos los valores
    function generarValores(Arr) {
        while (Arr.length < dificultad) {
        let numero = Math.floor(Math.random() * nivelElegido) + 1;
        if (!Arr.includes(numero)) {
            Arr.push(numero);
        }
        }
        return Arr;
    }

    //En este array mezclamos los valores de manera aleatoria
    function shufleArray(Arr) {
        for(let i = 0; i < Arr.length; i++){
            const randomIndex = Math.floor(Math.random()* Arr.length);
            const temp = Arr[i];
            Arr[i] = Arr[randomIndex];
            Arr[randomIndex] = temp;
        }
        return Arr;
    }
    
    //En esta funcion, sera lo que sucedera cuando cliques un boton.
    function clickBtn() {
        if(active === true){ //Si no apachas start los botones no reaccionaran
            if(this.classList.contains('active')){ //Para que no cuente los btns inactivos
                if(!this.classList.contains('selected')){ //Para que no cuente los btns que estan bn
                    this.innerHTML = this.value; 
                    if(this.value == ArrNums[posicion]){//Miras si acerto en el numero
                       posicion++;//aumentamos al siguiente numero
                        this.classList.add('selected'); //damos el valor de que esta bn

                        if(posicion == dificultad){//ejecutamos si alcanzo el maximo
                            setTimeout(() => {
                            punteo++;
                            inputPts.value = punteo;
                            console.log('Punteo: '+punteo);
                            jugando = false;
                            time += 3;
                            initG();}, 500);
                        }
                    } else {
                        active = false;
                        this.classList.add('fall');
                        setTimeout(() => {
                            this.classList.remove('fall');
                            diefunc();
                        }, 200);
                    }
                }
            }
        }
    }

    //En esta funcion haremos que el juego se pare
    function diefunc() {
        active = false;
        Tablero.classList.add('fall');
        setTimeout(() => {
            for(let i = 0; i < btns.length; i++){
                btns[i].innerHTML = '';
            }
            Tablero.classList.remove('fall');
            time = 10;
            active = true;
            punteo=0;
            jugando = false;
            winOrlose = true;
            cleanColor();
        }, 300);
    }

    //Aqui s evaluara la dificultad
    function verDificultad() {
        punteo == 0 ? dificultad=3:dificultad;
        punteo == 3 ? dificultad+=1:dificultad;
        punteo == 6 ? dificultad+=1:dificultad;
        punteo == 9 ? dificultad+=1:dificultad;
        punteo == 12 ? dificultad+=1:dificultad;
        punteo == 15 ? dificultad+=1:dificultad;
        punteo == 16 ? dificultad+=1:dificultad;
        punteo > 18 ? nivelElegido+=8:nivelElegido;

        dificultad >= btns.length ? dificultad=btns.length:dificultad;
    }

    function cleanColor() {
        for(let i= 0; i < btns.length; i++){
            if(btns[i].classList.contains('selected')){
                btns[i].classList.remove('selected');
            }
        }

        for(let i= 0; i < btns.length; i++){
            if(btns[i].classList.contains('active')){
                btns[i].classList.remove('active');
            }
        }

        for(let i = 0; i < btns.length; i++){
            btns[i].value = '';
        }
        temp.value = '';
        inputPts.value = punteo;
    }

    for(let i = 0; i < btns.length; i++) {
        btns[i].onclick = clickBtn;
    }