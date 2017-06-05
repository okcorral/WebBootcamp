var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");
var moment = require("moment");
var mongoose = require("mongoose");
var express = require("express");
var app = express();

// app config
var db = mongoose.connect("mongodb://localhost:27017/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

app.locals.moment = moment;

//  mongoose/model config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Test Blog",
//     image: "https://static.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg",
//     body:  "Hello this is a blog post"
// });

// RESTful Routes
app.get("/", function (req, res) {
    res.redirect("/blogs");
})

// INDEX ROUTE
app.get("/blogs", function (req, res) {
    Blog.find({}, function(err, blogs){
        if (err){
            console.log("ERROR!");
        } else {
            res.render("index", { blogs: blogs});
        }
    });
    //res.render("index");
});

// NEW route
app.get("/blogs/new", function (req, res) {
   res.render("new");
});

// CREATE route
app.post("/blogs", function (req, res) {
    //console.log(req.body);
    req.body.blog.body = req.sanitize(req.body.blog.body);
    //console.log("================");
    //console.log(req.body);
    Blog.create(req.body.blog, function (err, newBlog) {
        if (err){
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    });
});

// SHOW route
app.get("/blogs/:id", function (req, res) {
    //var now = moment("2017-06-01 06:03:14.785").format("M/D/YYYY hh:mm:ss");
    //console.log(now);
    Blog.findById(req.params.id, function (err, foundBlog){
        if (err){
            res.redirect("/blogs");
        } else {
            res.render("show", {blog:foundBlog});
        }
    });
});

// EDIT route
app.get("/blogs/:id/edit",function (req, res) {
    Blog.findById(req.params.id, function (err, foundBlog){
        if (err){
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog:foundBlog});
        }
    });
});

// UPDATE route
app.put("/blogs/:id", function (req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if (err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        };
    })
});

// DELETE route
app.delete("/blogs/:id", function (req, res) {
    Blog.findByIdAndRemove(req.params.id, req.body.blog, function(err, deleteBlog){
        if (err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
});

// db.disconnect(function () {
//     console.log("Disconnected from database...");
// });
app.listen(3000, function () {
    console.log("RESTful Blog App SERVER is running...");
});