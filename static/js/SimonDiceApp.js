const colorButtons = document.querySelectorAll('.color-button');
const startButton = document.getElementById('start-button');
const Contenedor = document.getElementById('contenedor-juego');

let sequence = [];
let playerSequence = [];
let level = 0;
let isPlayerTurn = false;

function getRandomColor() {
    const colors = ['green', 'red', 'yellow', 'blue'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function flashButton(color) {
    const button = document.getElementById(color);
    button.classList.add('sequence-active');
    setTimeout(() => {
        button.classList.remove('sequence-active');
    }, 600);
}

function flashButtonClick(color) {
    const button = document.getElementById(color);
    button.classList.add('click-active');
    setTimeout(() => {
        button.classList.remove('click-active'); 
    }, 300);
}

function playSequence() {
    let i = 0;
    const interval = setInterval(() => {
        flashButton(sequence[i]); 
        i++;
        if (i >= sequence.length) {
            clearInterval(interval);
            setTimeout(() => {
                isPlayerTurn = true;
            }, 500);
        }
    }, 800);
}

function nextLevel() {
    level++;
    isPlayerTurn = false;
    playerSequence = [];
    sequence.push(getRandomColor()); 
    setTimeout(() => {
        playSequence();
    }, 500);
}

function resetGame() {
    sequence = [];
    playerSequence = [];
    level = 0;
    isPlayerTurn = false;
}

function handlePlayerInput(color) {
    if (!isPlayerTurn) return;
    playerSequence.push(color);
    flashButton(color);

    const currentStep = playerSequence.length - 1;

    if (playerSequence[currentStep] !== sequence[currentStep]) { 
        Contenedor.classList.add('error');
        setTimeout(() => {
            Contenedor.classList.remove('error');
            console.log('Llegaste al nivel: ' + level);
            resetGame();
        }, 500);
    } else {
        if (playerSequence.length === sequence.length) {
            isPlayerTurn = false;
            setTimeout(() => {
                nextLevel();
            }, 500);
        }
    }
}

colorButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const color = e.target.id;
        handlePlayerInput(color);
    });
});

startButton.addEventListener('click', () => {
    resetGame();
    nextLevel();
});
