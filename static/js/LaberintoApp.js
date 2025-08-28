const filas = 9;
const columnas = 9;

// Inicializa el laberinto como una matriz llena de paredes
let laberinto = Array.from({ length: filas }, () => Array(columnas).fill(1));
let jugador = { x: 1, y: 1 };
let salida = { x: 5, y: 5 };
let punteo = 0;
let mejorPuntuacion = localStorage.getItem("mejorPuntuacion") || 0;
let startTime;
//const audioWin = new Audio("https://www.myinstants.com/media/sounds/tada.mp3");
//audioWin.preload = "auto";

document.getElementById("puntos").insertAdjacentHTML("afterend", `<p id="high-score">Récord: ${mejorPuntuacion}</p>`);

// Direcciones posibles para el algoritmo de generación de laberintos
const direcciones = [
    { dx: 0, dy: -2 }, // Arriba
    { dx: 0, dy: 2 },  // Abajo
    { dx: -2, dy: 0 }, // Izquierda
    { dx: 2, dy: 0 }   // Derecha
];

/**
 * Genera el laberinto utilizando el algoritmo de búsqueda en profundidad (DFS)
 */
function generarLaberintoDFS() {
    let stack = [];
    let startX = 1, startY = 1;
    laberinto = Array.from({ length: filas }, () => Array(columnas).fill(1));
    laberinto[startY][startX] = 0;
    stack.push({ x: startX, y: startY });

    while (stack.length > 0) {
        let { x, y } = stack[stack.length - 1];
        let vecinos = [];

        for (let { dx, dy } of direcciones) {
            let nx = x + dx, ny = y + dy;
            if (nx > 0 && ny > 0 && nx < columnas - 1 && ny < filas - 1 && laberinto[ny][nx] === 1) {
                vecinos.push({ nx, ny, px: x + dx / 2, py: y + dy / 2 });
            }
        }

        if (vecinos.length > 0) {
            let { nx, ny, px, py } = vecinos[Math.floor(Math.random() * vecinos.length)];
            laberinto[py][px] = 0;
            laberinto[ny][nx] = 0;
            stack.push({ x: nx, y: ny });
        } else {
            stack.pop();
        }
    }

    colocarSalidaAleatoria();
    colocarJugadorAleatorio();
    startTime = Date.now();
    graficarLaberinto();
}

/**
 * Obtiene todas las posiciones dentro del laberinto que son caminos (valor 0)
 */
function obtenerCaminosLibres() {
    let caminos = [];
    for (let i = 1; i < filas - 1; i++) {
        for (let j = 1; j < columnas - 1; j++) {
            if (laberinto[i][j] === 0) caminos.push({ x: j, y: i });
        }
    }
    return caminos;
}

/**
 * Coloca la salida en una posición aleatoria dentro del laberinto,
 * asegurando que esté a cierta distancia del jugador.
 */
function colocarSalidaAleatoria() {
    let caminos = obtenerCaminosLibres();
    do {
        salida = caminos[Math.floor(Math.random() * caminos.length)];
    } while (Math.abs(salida.x - jugador.x) + Math.abs(salida.y - jugador.y) < 4);
}

/**
 * Coloca al jugador en una posición aleatoria distinta a la salida.
 */
function colocarJugadorAleatorio() {
    let caminos = obtenerCaminosLibres().filter(c => Math.abs(c.x - salida.x) + Math.abs(c.y - salida.y) >= 4);
    jugador = caminos.length > 0 ? caminos[Math.floor(Math.random() * caminos.length)] : { x: 1, y: 1 };
}

/**
 * Dibuja el laberinto en la interfaz gráfica
 */
function graficarLaberinto() {
    const contenedor = document.getElementById('laberinto');
    contenedor.innerHTML = '';
    contenedor.style.gridTemplateColumns = `repeat(${columnas}, 40px)`;

    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            const celda = document.createElement('div');
            celda.classList.add('celda');
            if (laberinto[i][j] === 1) celda.classList.add('pared');
            else celda.classList.add('camino');
            if (i === jugador.y && j === jugador.x) celda.classList.add('jugador');
            if (i === salida.y && j === salida.x) celda.classList.add('salida');
            contenedor.appendChild(celda);
        }
    }
}

// Evento para capturar las teclas de dirección y mover al jugador
document.addEventListener("keydown", (event) => {
    let nuevaX = jugador.x;
    let nuevaY = jugador.y;
    switch (event.key) {
        case "ArrowUp": nuevaY--; break;
        case "ArrowDown": nuevaY++; break;
        case "ArrowLeft": nuevaX--; break;
        case "ArrowRight": nuevaX++; break;
        default: return;
    }
    if (laberinto[nuevaY][nuevaX] === 0) {
        jugador.x = nuevaX;
        jugador.y = nuevaY;
        graficarLaberinto();
    }
    if (jugador.x === salida.x && jugador.y === salida.y) {
        let timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);//Cronometro
        //audioWin.play().catch(() => {});
        document.getElementById("puntos").textContent = `Puntos: ${++punteo}`;
        console.log(`¡Ganaste! Tiempo: ${timeTaken} segundos`);
        if (punteo > mejorPuntuacion) {
            mejorPuntuacion = punteo;
            localStorage.setItem("mejorPuntuacion", mejorPuntuacion);
            document.getElementById("high-score").textContent = `Récord: ${mejorPuntuacion}`;
        }
        generarLaberintoDFS();
        graficarLaberinto();
    }
});

document.getElementById('btn-generar').addEventListener('click', () => {
    generarLaberintoDFS();
    graficarLaberinto();
});
