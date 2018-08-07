var db = require("../models");

module.exports = function (app) {
  app.get("/", function(req, res) {
    var postsArr = [];
    db.Post.findAll({}).then(function (dbPost) {
      for(var i = 0; i < dbPost.length; i++) {
        console.log(dbPost[i].dataValues.UserId);
        postsArr.push(dbPost[i].dataValues);
      }
      res.render("index", {posts: postsArr});
    });
  });
  // Load Post Page
  app.get("/post", function (req, res) {
    //empty array to place category objects in to display in dropdown when creating post
    var cats = [];
    //db call to get categories
    db.Categories.findAll({}).then(function (dbCategories) {
      //looping through them to put them in the array
      for (var i = 0; i < dbCategories.length; i++) {
        cats.push(dbCategories[i].dataValues);
      }
      if (req.isAuthenticated()) {
        res.render("post", {
          title: "Post.it",
          msg: "Post Creation",
          username: req.user.username,
          categories: cats
        });
        console.log(req.user.id);
      } else {
        res.send("You need to be logged in");
      }
    });
    //checks if the user is logged in and renders the form if they are
    
  });

  app.get("/author", function (req, res) {
    if (req.isAuthenticated()) {
      res.render("author", {
        title: "Post.it",
        msg: "Author Creation",
        username: req.user.username
      });
    } else {
      res.render("author", {
        title: "Post.it",
        msg: "Author Creation",
      });
    }
  });

  app.get("/:id", function (req, res) {
    db.Post.findOne({
      where: {id: req.params.id}
    }).then(function(dbPost) {
      console.log(dbPost.dataValues);
      res.render("detail", {data: dbPost.dataValues});
    });
    
  });

  app.get("/category", function (req, res) {
    res.render("category", {
      msg: "Post a new category!"
    });
  });


  app.get("/success", function (req, res) {
    res.send("Success!");
  });

  app.get("/failure", function (req, res) {
    res.send("failure");
  });
};

