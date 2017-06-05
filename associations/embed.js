var mongoose = require("mongoose");
var db = mongoose.connect("mongodb://localhost:27017/assoc_demo");

//post - title, content
var postSchema = mongoose.Schema({
    title: String,
    content: String
});

var Post = mongoose.model("Post", postSchema);

//user - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

var User = mongoose.model("User", userSchema);



// var newUser = new User({
//     email: "hermione@hogwarts.edu",
//     name: "Hermione Granger"
// });
//
// newUser.posts.push({
//     title: "How to brew polyjuice potion",
//     content: "Just kidding. Go to potions class to learn it!"
// });
//
// newUser.save(function (err, user) {
//     if(err){
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });

// var newPost = new Post({
//     title: "Reflections on Apples",
//     content: "They are delicious"
// });
//
// newPost.save(function (err, post) {
//     if(err){
//         console.log(err);
//     } else {
//         console.log(post);
//     }
// });

User.findOne({name:"Hermione Granger"}, function (err, user) {
    if(err){
        console.log(err);
    } else {
        user.posts.push({
            title: "post title 2",
            content: "Post content 2"
        });
        user.save(function (err, user) {
            if(err){
                console.log(err);
            } else {
                console.log(user);
            }
        });
  }
});
//db.disconnect();