const express = require("express");
const postsDb = require("./postDb.js");
const router = express.Router();

router.get("/", (req, res) => {
  postsDb
    .get()
    .then(posts => res.status(200).json({ success: true, posts }))
    .catch(err =>
      res
        .status(400)
        .json({ success: false, message: "Could not get posts from server" })
    );
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  postsDb
    .getById(id)
    .then(retrievedPost =>
      res.status(200).json({ success: true, retrievedPost })
    )
    .catch(err => res.status(400).json({ success: false, err }));
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  postsDb
    .remove(id)
    .then(removedPost =>
      res
        .status(200)
        .json({ success: true, message: "Post deleted successfully" })
    )
    .catch(err => res.status(400).json({ success: false, err }));
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const putRequestBody = req.body;

  postsDb
    .update(id, putRequestBody)
    .then(updatedPost => res.status(201).json({ success: true, updatedPost }))
    .catch(err => res.status(400).json({ success: false, err }));
});

// custom middleware

function validatePostId(req, res, next) {}

module.exports = router;
