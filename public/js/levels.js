import { showSeconds } from "./main.js";

// Available Levels
const difficulty = {
    easy: 7,
    medium: 5,
    hard: 3
};

// To change level
const level = document.getElementById("level");
let currentLevel = difficulty[level.value];

level.addEventListener("change", selectLevel);

function selectLevel() {
    currentLevel = difficulty[level.value];
    showSeconds();
}

export { currentLevel };
