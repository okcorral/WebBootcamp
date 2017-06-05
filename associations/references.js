var mongoose = require("mongoose");
var db = mongoose.connect("mongodb://localhost:27017/assoc_demo2");

var Post = require("./models/post");
var User = require("./models/user");

// //post - title, content
// var postSchema = mongoose.Schema({
//     title: String,
//     content: String
// });
//
// var Post = mongoose.model("Post", postSchema);

//user - email, name
// var userSchema = new mongoose.Schema({
//     email: String,
//     name: String,
//     posts: [
//         {
//            type: mongoose.Schema.Types.ObjectId,
//             ref: "Post"
//         }
//     ]
// });
//
// var User = mongoose.model("User", userSchema);

// User.create({
//     email: "bob@email.com",
//     name: "Bob Belcher"
// });
//
// Post.create({
//     title: "How to cook a burger Part 4",
//     content: "one two three four five"
// }, function (err, post) {
//
//     User.findOne({email:"bob@email.com"}, function (err, foundUser) {
//         if(err){
//             console.log(err);
//         } else {
//             foundUser.posts.push(post);
//             foundUser.save(function(err, data){
//                 if(err){
//                     console.log(err);
//                 } else {
//                     console.log(data);
//                 }
//             });
//         }
//     });
// });

User.findOne({email:"bob@email.com"}).populate("posts").exec(function (err, user) {
    if (err){
        console.log(err);
    } else {
        console.log(user);
    }
});


//db.disconnect();
