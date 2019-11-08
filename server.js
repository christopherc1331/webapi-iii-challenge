const express = require("express");
const helmet = require("helmet");
const userRouter = require("./users/userRouter.js");
const postsRouter = require("./posts/postRouter.js");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(logger);
server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});
server.use("/api/users", userRouter.validateUser);
server.use("/api/users/:id", userRouter.validateUserId);
server.use("/api/users/:id/posts", userRouter.validatePost);
server.use("/api/users", userRouter.router);
server.use("/api/posts", postsRouter);
//custom middleware

function logger(req, res, next) {
  const method = req.method;
  const url = req.originalUrl;
  const time = Date.now();

  console.log(`[${time}]  ${method}  ${url}`);
  next();
}

module.exports = server;
