var mongoose = require("mongoose");
var db = mongoose.connect("mongodb://localhost:27017/cat_app");


var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// // add new cat
// var george = new Cat({
//     name: "Mrs. Norris",
//     age: 7,
//     temperament: "Evil"
// });
//
// george.save(function(err, cat){
//     if (err){
//         console.log("Something went wrong");
//     } else {
//         console.log("We just saved a cat to the database:")
//         console.log(cat);
//     }
// });

// Cat.create({
//     name: "Snow White",
//     age: 15,
//     temperament: "Aloof"
// }, function(err, cat) {
//     if (err) {
//         console.log("Something went wrong");
//     } else {
//         console.log("We just saved a cat to the database:");
//         console.log(cat);
//     }
// });

// retrieve all cats
Cat.find({}, function(err, cats){
    if (err){
        console.log("Oh No! Error");
        console.log(err);
    } else {
        console.log("All the cats...");
        console.log(cats)
    }
});

db.disconnect();

