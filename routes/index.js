const express = require("express");

const app = express();

app.use("/auth", require("./authenticate"));
app.use("/users", require("./user"));
app.use("/categories", require("./category"));
app.use("/search", require("./search"));
app.use("/projects", require("./project"));

module.exports = app;
