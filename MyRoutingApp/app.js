var express = require("express");
var app = express();

app.get("/", function (req, res) {
    res.send("Hi there, welcome to my assignment!");
})

app.get("/speak/:animal", function(req, res){
    var animal = req.params.animal;
    var sound = "???";
    switch (animal){
        case "pig":
            sound = "Oink";
        case "cow":
            sound = "Moo";
        case "dog":
            sound = "Woof Woof";
    }
   res.send("The " + animal + " says '" + sound + "'");
});

app.get("/repeat/:phrase/:times", function (req, res) {
    var phrase = req.params.phrase;
    var times = parseInt(req.params.times);
    var message = phrase;
    for (var i = 1; i < times; i++){
        message += " " + phrase;
    }
    res.send(message);
});

app.get("*", function(req, res){
   res.send("Sorry, page not found...What are you doing with your life?");
});

app.listen(3000, function () {
    console.log("The server has started...");
});
