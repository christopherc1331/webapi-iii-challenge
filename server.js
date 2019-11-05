const express = require("express");
const helmet = require("helmet");
const userRouter = require("./users/userRouter.js");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(logger);
server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});
server.use("/api/users", userRouter);

//custom middleware

function logger(req, res, next) {
  const method = req.method;
  const url = req.originalUrl;
  const time = Date.now();

  console.log(`[${time}]  ${method}  ${url}`);
  next();
}

module.exports = server;
