const express = require("express");
const mongoose = require("mongoose");
const app = express();

// home/index route
app.get("/", (req, res) => {
  res.send("This is index/home page.")
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port: ${port} `);
});