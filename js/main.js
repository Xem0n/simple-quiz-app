const start = document.querySelector('.start');

const initGame = () => {
    const game = new Game();
};

start.addEventListener('click', () => {
    start.style.display = 'none';

    initGame();
});