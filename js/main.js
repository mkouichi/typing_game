window.addEventListener("load", init);

// Globals

// Available Levels
const levels = {
    easy: 5,
    medium: 3,
    hard: 2
};

// To change level
const currentLevel = levels.easy;

let time = currentLevel;
let score = 0;
let isPlaying;

// DOM Elements
const wordInput = document.getElementById("word-input"),
    currentWord = document.getElementById("current-word"),
    scoreDisplay = document.getElementById("score"),
    timeDisplay = document.getElementById("time"),
    message = document.getElementById("message"),
    seconds = document.getElementById("seconds");

const words = [
    "hat",
    "river",
    "lucky",
    "statue",
    "generate",
    "stubborn",
    "cocktail",
    "runaway",
    "joke",
    "developer",
    "establishment",
    "hero",
    "javascript",
    "nutrition",
    "revolver",
    "echo",
    "siblings",
    "investigate",
    "horrendous",
    "symptom",
    "laughter",
    "magic",
    "master",
    "space",
    "definition"
];

// Initialize Game
function init() {
    // Show number of seconds in UI
    seconds.innerHTML = currentLevel;

    // Load word from array
    showWord(words);

    // Start matching on word input
    wordInput.addEventListener("input", startMatch);

    // Call countdown every second
    setInterval(countdown, 1000);

    // Change color
    timeDisplay.className = "text-success";

    // Check game status
    setInterval(checkStatus, 50);
}

// Pick and show random word
function showWord(words) {
    // Generate random array index
    const randIndex = Math.floor(Math.random() * words.length);

    // Output a random word
    currentWord.innerHTML = words[randIndex];
}

// Start match
function startMatch() {
    // Change color (red => green)
    timeDisplay.className = "text-success";

    if (matchWords()) {
        isPlaying = true;
        time = currentLevel + 1; // one second above the time limit
        showWord(words);
        wordInput.value = "";
        score++;

        // Change color
        scoreDisplay.className = "text-success";
        window.setTimeout(() => {
            scoreDisplay.className = "";
        }, 2000);

        wordInput.style.border = "3px solid green";
        window.setTimeout(() => {
            wordInput.style.border = "none";
        }, 2000);
    }

    // If score is -1, display 0
    if (score === -1) {
        scoreDisplay.innerHTML = 0;
    } else {
        scoreDisplay.innerHTML = score;
    }
}

// Match currentWord to wordInput
function matchWords() {
    if (wordInput.value === currentWord.innerHTML) {
        message.innerHTML = "Correct!";
        window.setTimeout(function() {
            message.innerHTML = "";
        }, 2000);

        // Change color (red => green)
        message.classList.remove("text-danger");
        message.classList.add("text-success");
        return true;
    } else {
        message.innerHTML = "";
        return false;
    }
}

// Countdown timer
function countdown() {
    // Make sure time is not run out
    if (time > 0) {
        // Decrement
        time--;
    } else if (time === 0) {
        // Game is over
        isPlaying = false;
    }

    // Show time
    timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus() {
    if (!isPlaying && time === 0) {
        message.innerHTML = "Game Over!";
        score = -1;

        // Change color (green => red)
        message.classList.remove("text-success");
        message.classList.add("text-danger");
        timeDisplay.className = "text-danger";
        wordInput.style.border = "3px solid red";
    }
}
