import { showSeconds } from "./main.js";

// Available Levels
const difficulty = {
    easy: 5,
    medium: 3,
    hard: 2
};

// To change level
const level = document.getElementById("level");
let currentLevel = difficulty[level.value];

level.addEventListener("change", selectLevel);

function selectLevel(e) {
    currentLevel = difficulty[level.value];
    showSeconds();
}

export { currentLevel };
