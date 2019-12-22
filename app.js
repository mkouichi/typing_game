const express = require("express");
const fetch = require("node-fetch");
// const apiKey = require("./config/keys");
const apiKey = process.env.API_KEY;
const app = express();

// App setup
let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
}
app.listen(port, () => console.log(`Listening on port ${port}!`));

app.set("view engine", "ejs");

// Static files
app.use(express.static("public"));

app.get("/", (req, res) => {
    apiCall()
        .then(result => {
            word = result;
            res.render("game", { word: word });
        })
        .catch(err => console.error(err));
});

// After second API calls
app.get("/api", function(req, res) {
    apiCall()
        .then(result => {
            word = result;
            res.send(word);
            console.log("Another api call was made!");
        })
        .catch(err => console.error(err));
});

async function apiCall() {
    let data = await fetch(
        "https://wordsapiv1.p.rapidapi.com/words/?random=true",
        {
            method: "GET",
            headers: {
                "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
                "x-rapidapi-key": apiKey
            }
        }
    );
    let json = await data.json();
    let word = await json.word;
    console.log("word: " + word, typeof word);
    return word;
}
