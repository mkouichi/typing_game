import { highscoreDisplay } from "./main.js";

// Load highscore
function loadHighscore() {
    if (JSON.parse(localStorage.getItem("highscore")) === null) {
        highscoreDisplay.innerHTML = 0;
    } else {
        highscoreDisplay.innerHTML = localStorage.getItem("highscore");
    }
}

// Delete highscore
function deleteHighscore() {
    localStorage.removeItem("highscore");
    highscoreDisplay.innerHTML = 0;
}

export { loadHighscore, deleteHighscore };
