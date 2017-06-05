var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.send("Hi There!");
});

app.get("/bye", function(req, res){
    res.send("Goodbye!");
});

app.get("/dog", function(req, res){
    res.send("MEOW!");
})

app.get("/r/:subredditname", function(req, res){
    //console.log(req.params);
    var subreddit = req.params.subredditname;
    res.send("Welcome to " + subreddit + " subreddit");
});

app.get("*", function(req, res){
    res.send("You are a star!");
});

app.listen(3000,  function(){
    console.log("Server has started...");
});
