import { apiCall } from "./apiCall.js";
import { loadHighscore, deleteHighscore } from "./highscore.js";
import { currentLevel } from "./levels.js";

window.addEventListener("load", init);

// Globals
let time = currentLevel,
    score = 0,
    isPlaying;

// DOM Elements
export const seconds = document.getElementById("seconds"),
    currentWord = document.getElementById("current-word"),
    wordInput = document.getElementById("word-input"),
    message = document.getElementById("message"),
    timeDisplay = document.getElementById("time"),
    scoreDisplay = document.getElementById("score"),
    highscoreDisplay = document.getElementById("highscore"),
    deleteBtn = document.getElementById("delete");

export function showSeconds() {
    seconds.innerHTML = currentLevel;
}

// Initialize Game
function init() {
    // Show number of seconds in UI
    showSeconds();

    // Show a random word
    apiCall();

    // Load highscore from local storage
    loadHighscore();

    // Delete highscore
    deleteBtn.addEventListener("click", deleteHighscore);

    // Start matching on word input
    wordInput.addEventListener("input", startMatch);

    // Call countdown every second
    setInterval(countdown, 1000);

    // Change color
    timeDisplay.className = "text-success";

    // Check game status
    setInterval(checkStatus, 50);
}

// Start match
function startMatch() {
    // Change color (red => green)
    timeDisplay.className = "text-success";

    if (matchWords()) {
        isPlaying = true;
        time = currentLevel + 1; // one second above the time limit
        apiCall();
        wordInput.value = "";
        score++;
        console.log("score: " + score);

        // Change color
        scoreDisplay.className = "text-success";
        window.setTimeout(() => {
            scoreDisplay.className = "";
        }, 2000);

        wordInput.style.border = "3px solid green";
        window.setTimeout(() => {
            wordInput.style.border = "none";
        }, 2000);

        // Update highscore in local storage
        if (score > localStorage.getItem("highscore")) {
            // Update highscore in local storage
            localStorage.setItem("highscore", JSON.stringify(score));

            // Load highscore from local storage
            loadHighscore();

            console.log(
                "highscore updated!",
                localStorage.getItem("highscore")
            );

            // Display highscore
            highscoreDisplay.innerHTML = score;

            // Change color for two seconds
            highscoreDisplay.className = "text-success";
            window.setTimeout(() => {
                highscoreDisplay.className = "";
            }, 2000);
        }
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
