const player = document.getElementById('player');
const ball = document.getElementById('ball');
const goal = document.getElementById('goal');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('game');
const gameOverScreen = document.getElementById('gameOverScreen');
const finalScoreDisplay = document.getElementById('finalScore');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');

let score = 0;
let gameTime = 60;
let gameInterval;

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);

function startGame() {
    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    gameInterval = setInterval(updateGame, 1000);
    score = 0;
    gameTime = 60;
    updateScore(0);
    updateTimer(60);
}

function updateGame() {
    gameTime--;
    updateTimer(gameTime);
    if (gameTime <= 0) {
        endGame();
    }
}

function endGame() {
    clearInterval(gameInterval);
    gameScreen.classList.add('hidden');
    gameOverScreen.classList.remove('hidden');
    finalScoreDisplay.textContent = `Final Score: ${score}`;
}

function restartGame() {
    gameOverScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
}

function updateScore(newScore) {
    score = newScore;
    scoreDisplay.textContent = `Score: ${score}`;
}

function updateTimer(time) {
    timerDisplay.textContent = `Time: ${time}`;
}

document.addEventListener('keydown', function(event) {
    let playerPosition = player.getBoundingClientRect();
    let ballPosition = ball.getBoundingClientRect();
    let gameArea = document.getElementById('game').getBoundingClientRect();

    switch(event.key) {
        case 'ArrowUp':
            if (playerPosition.top > gameArea.top) {
                player.style.top = player.offsetTop - 10 + 'px';
            }
            break;
        case 'ArrowDown':
            if (playerPosition.bottom < gameArea.bottom) {
                player.style.top = player.offsetTop + 10 + 'px';
            }
            break;
        case 'ArrowLeft':
            if (playerPosition.left > gameArea.left) {
                player.style.left = player.offsetLeft - 10 + 'px';
            }
            break;
        case 'ArrowRight':
            if (playerPosition.right < gameArea.right) {
                player.style.left = player.offsetLeft + 10 + 'px';
            }
            break;
        case ' ':
            if (isNearBall(playerPosition, ballPosition)) {
                kickBall(ballPosition, gameArea, goal);
            }
            break;
    }
});

function isNearBall(playerPosition, ballPosition) {
    const distance = Math.hypot(
        playerPosition.left - ballPosition.left,
        playerPosition.top - ballPosition.top
    );
    return distance < 60;
}

function kickBall(ballPosition, gameArea, goal) {
    const goalPosition = goal.getBoundingClientRect();
    const ballDestinationX = goalPosition.left + (goalPosition.width / 2) - (ballPosition.width / 2);
    const ballDestinationY = goalPosition.top + (goalPosition.height / 2) - (ballPosition.height / 2);

    const distanceX = ballDestinationX - ballPosition.left;
    const distanceY = ballDestinationY - ballPosition.top;

    ball.style.transition = 'all 0.5s';
    ball.style.left = ballPosition.left + distanceX + 'px';
    ball.style.top = ballPosition.top + distanceY + 'px';

    setTimeout(() => {
        updateScore(score + 1);
        resetBall();
    }, 500);
}

function resetBall() {
    ball.style.left = '100px';
    ball.style.bottom = '50px';
}

