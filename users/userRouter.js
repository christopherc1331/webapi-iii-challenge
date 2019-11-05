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

router.post("/:id/posts", (req, res) => {});

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
    .get(id)
    .then(user => {
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

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
