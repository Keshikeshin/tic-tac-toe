// Tic-Tac-Toe Game Script
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset');
const winnerPopup = document.getElementById('winnerPopup');
const winnerMessage = document.getElementById('winnerMessage');
const closePopup = document.getElementById('closePopup');

// Game state
let gameActive = true;
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];

// Winning combinations
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Custom symbols for X and O
const symbols = {
    'X': '✕',
    'O': '◯'
};

// Function to handle cell click
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('id'));

    // Ignore clicks if the cell is already filled or if the game is inactive
    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    // Update the game state and the UI
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = symbols[currentPlayer]; // Custom symbols

    // Check for a winner
    checkWinner();
}

// Function to check for a winner or a draw
function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        showWinnerPopup(`Player ${currentPlayer} wins!`);
        gameActive = false;
        return;
    }

    // Check for a draw
    if (!gameState.includes('')) {
        showWinnerPopup(`It's a draw!`);
        gameActive = false;
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
}

// Function to show the winner popup
function showWinnerPopup(message) {
    winnerMessage.textContent = message;
    winnerPopup.style.display = 'flex';
}

// Function to reset the game
function resetGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
    cells.forEach(cell => (cell.textContent = ''));
    winnerPopup.style.display = 'none'; // Hide popup when game resets
}

// Add event listeners to each cell
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

// Add event listener to the reset button
resetButton.addEventListener('click', resetGame);

// Close popup button
closePopup.addEventListener('click', () => {
    winnerPopup.style.display = 'none';
});

// Initial game status
statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
