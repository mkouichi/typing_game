import { currentWord } from "./main.js";

// API call
function apiCall() {
    const API_KEY = "B0N7UKST";
    fetch(`https://random-word-api.herokuapp.com/word?key=${API_KEY}&number=1`)
        .then(res => res.json())
        .then(data => {
            currentWord.innerHTML = data;
        });
}

export { apiCall };
