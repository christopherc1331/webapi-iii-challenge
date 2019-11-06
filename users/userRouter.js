const express = require("express");
const userDb = require("./userDb.js");
const postsDb = require("../posts/postDb.js");
const router = express.Router();

router.post("/", (req, res) => {
  const newUser = req.body;
  userDb
    .insert(newUser)
    .then(addedUser => {
      res.status(201).json({ success: true, addedUser });
    })
    .catch(err =>
      res.status(500).json({
        success: false,
        message: "Failed when trying to save user to database"
      })
    );
});

router.post("/:id/posts", (req, res) => {
  const { id } = req.params;
  req.body.user_id = id;
  const newPost = req.body;
  console.log("routing to id posts");
  postsDb
    .insert(newPost)
    .then(addedPost => {
      res.status(201).json({ success: true, addedPost });
    })
    .catch(err => {
      console.log("caught an error at the catch");
      res.status(400).json({
        success: false,
        message: "The post could not be added to the server"
      });
    });
});

router.get("/", (req, res) => {
  userDb
    .get(req.query)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.status(400).json({ success: false, err }));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  userDb
    .getById(id)
    .then(user => {
      console.log(user);
      res.status(200).json(user);
    })
    .catch(err => res.status(400).json({ success: false, err }));
});

router.get("/:id/posts", (req, res) => {
  const { id } = req.params;

  userDb
    .getUserPosts(id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => res.status(400).json({ success: false, err }));
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  userDb
    .remove(id)
    .then(user => {
      res
        .status(200)
        .json({ success: true, message: "User successfully deleted" });
    })
    .catch(err => res.status(404).json({ message: "User ID not found" }));
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const newUserInfo = req.body;

  userDb
    .update(id, newUserInfo)
    .then(newUser => res.status(201).json({ success: true, newUser }))
    .catch(err =>
      res
        .status(400)
        .json({ success: false, message: "User could not be added to server" })
    );
});

//custom middleware

function validateUserId(req, res, next) {
  console.log("Validating user id");
  const { id } = req.params;
  const path = req.originalUrl;

  if (path == "/api/users/") {
    next();
  } else {
    console.log("id from else", id);
    if (id) {
      userDb
        .getById(id)
        .then(user => {
          if (user == undefined) {
            res
              .status(400)
              .json({ success: false, message: "invalid user id" });
          } else {
            req.user = user;
            next();
          }
        })
        .catch(err =>
          res.status(400).json({ success: false, message: "Error with server" })
        );
    } else {
      res
        .status(400)
        .json({ success: false, message: "No id passed into params" });
    }
  }
}

function validateUser(req, res, next) {
  console.log("Validating User");
  const newUser = req.body;
  console.log("new user from val", newUser);

  if (Object.entries(newUser).length === 0) {
    res.status(400).json({ success: false, message: "missing user data" });
  } else {
    console.log("newUser from else", newUser);
    next();
  }
}

function validatePost(req, res, next) {}

module.exports = { router, validateUserId, validateUser, validatePost };
