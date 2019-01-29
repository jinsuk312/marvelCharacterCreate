// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Marvel Characters (DATA)
var characters = [{
    routeName: "thor",
    name: "Thor",
    role: "Norse Deity",
    age: 600,
    strength: 2500
}, {
    routeName: "spiderman",
    name: "Spider Man",
    role: "Genetically Modified Organism",
    age: 40,
    strength: 1500
}, {
    routeName: "thanos",
    name: "Thanos",
    role: "Mad Titan",
    age: 1500,
    strength: 3000
}];

// Routes
// =============================================================

// route that sends the user to the view page - as homepage
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
});
// route that sends the user to add page
app.get("/add", function (req, res) {
    res.sendFile(path.join(__dirname, "add.html"));
});

// route that sends the user to all page
app.get("/all", function (req, res) {
    res.sendFile(path.join(__dirname, "all.html"));
});

// Search for Specific Character (or all characters) - provides JSON
// Question mark signifies that the parameter is "optional"
app.get("/api/:characters?", function (req, res) {
    // grab the selected parameter
    var chosen = req.params.characters;
    // if a parameter is provided
    if (chosen) {
        //console.log if parameter provided
        console.log(chosen);
        //filter to show only the selected character
        for (var i = 0; i < characters.length; i++) {
            if (chosen === characters[i].routeName) {
                return res.json(characters[i]);
            }
        }
        //otherwise return false
        return res.json(false);
    }
    //if no parameter is display then return all characters
    return res.json(characters);
});

// Create New Characters - takes in JSON input
app.post("/api/new", function (req, res) {
    //grab selected parameter
    var newcharacter = req.body;
    //new character req.body.routeName is equal to req.body.name but has NO spaces and is lowercase 
    newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();

    console.log(newcharacter);
    // push newcharacter to the end of the object of arrays - characters 
    characters.push(newcharacter);
    // display the new character
    res.json(newcharacter);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
