const express = require("express");
const app = express();

app.use(express.json());
app.use(logger);

// Custom log-catcher middleware
function logger(req, res, next) {
  console.log(new Date().toISOString(), req.method, req.originalUrl);
  next();
}

const itemRouter = require("./routes/items");

app.use("/api/items", itemRouter);

app.listen(3000);
