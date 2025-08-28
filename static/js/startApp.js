document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM completamente cargado");

    const start_screen = document.querySelector('#start-screen');
    const name_input = document.querySelector('#input-name');
    const main_screen = document.querySelector('#main-screen');
    const btn_play = document.querySelector('#btn-play');
    const btn_logout = document.querySelector('#btn-logout');
    const showName = document.querySelector('#show-name');

    const setPlayerName = (name) => {
        localStorage.setItem('player_name', name);
        NAME.nombre = name;
    };

    const getPlayerName = () => localStorage.getItem('player_name');

    const takeName = () => {
        const savedName = getPlayerName();
        if (savedName && savedName.trim() !== "") {
            NAME.nombre = savedName;
            start_screen.classList.remove('active');
            main_screen.classList.add('active');
            name_input.value = savedName;
            showName.classList.add('aktive');
            showName.textContent = 'Sesion de '+ NAME.nombre;
        } else {
            start_screen.classList.add('active');
            main_screen.classList.remove('active');
            name_input.focus();
        }
    };

    // Evento para iniciar sesión
    btn_play.addEventListener('click', () => {
        console.log("Botón de iniciar sesión presionado");
        const playerName = name_input.value.trim();
        if (playerName.length > 0) {
            setPlayerName(playerName);
            start_screen.classList.remove('active');
            main_screen.classList.add('active');
            showName.classList.add('aktive');
            showName.textContent = 'Sesion de '+ NAME.nombre;
        } else {
            console.log("Nombre vacío");
            name_input.classList.add('input-err');
            setTimeout(() => {
                name_input.classList.remove('input-err');
                name_input.focus();
            }, 500);
        }
    });

    // Evento para terminar sesión
    if (btn_logout) {
        btn_logout.addEventListener('click', () => {
            console.log("Terminando sesión...");
            showName.classList.remove('aktive');
            localStorage.removeItem('player_name');
            NAME.nombre = '';
            start_screen.classList.add('active');
            main_screen.classList.remove('active');
            name_input.value = '';
            name_input.focus();
        });
    }

    takeName();
});
