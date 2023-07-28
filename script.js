document.addEventListener('DOMContentLoaded', () => {
    const colors = ['red', 'green', 'blue', 'yellow'];
    const colorSequence = [];
    let playerSequence = [];
    let level = 1;
    let gameStarted = false;

    const colorSequenceDiv = document.getElementById('colorSequence');
    const colorButtons = document.querySelectorAll('.color-button');
    const startButton = document.getElementById('startButton');
    const message = document.getElementById('message');

    function displayColorSequence() {
        const duration = 1000;
        let i = 0;
        const intervalId = setInterval(() => {
            colorButtons.forEach(button => {
                button.disabled = true;
            });
            colorSequenceDiv.style.backgroundColor = colorSequence[i];
            i++;
            if (i >= colorSequence.length) {
                clearInterval(intervalId);
                colorSequenceDiv.style.backgroundColor = '#fff';
                colorButtons.forEach(button => {
                    button.disabled = false;
                });
            }
        }, duration);
    }

    function generateNextColor() {
        const randomIndex = Math.floor(Math.random() * colors.length);
        colorSequence.push(colors[randomIndex]);
        displayColorSequence();
    }

    function checkPlayerSequence() {
        for (let i = 0; i < playerSequence.length; i++) {
            if (playerSequence[i] !== colorSequence[i]) {
                gameOver();
                return;
            }
        }

        if (playerSequence.length === colorSequence.length) {
            playerSequence = [];
            setTimeout(() => {
                level++;
                message.textContent = `Level ${level}`;
                generateNextColor();
            }, 1000);
        }
    }

    function gameOver() {
        message.textContent = `Game Over! Your score: ${level - 1}`;
        level = 1;
        colorSequence.length = 0;
        gameStarted = false;
        startButton.disabled = false;
    }

    colorButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (gameStarted) {
                const color = button.dataset.color;
                playerSequence.push(color);
                checkPlayerSequence();
            }
        });
    });

    startButton.addEventListener('click', () => {
        colorSequence.length = 0;
        playerSequence = [];
        level = 1;
        message.textContent = `Level ${level}`;
        generateNextColor();
        gameStarted = true;
        startButton.disabled = true;
    });
});
