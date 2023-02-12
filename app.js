const express = require("express");
const app = express();
const path = require("path");
const flash = require("connect-flash");

const homeRouter = require("./routes/home.route");
const artistRouter = require("./routes/artist.route");
const exhibitionRouter = require("./routes/exhibition.route");
const customerRouter = require("./routes/customer.route");

app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "images")));

app.use(flash());

app.set("view engine", "ejs");
app.set("views", "views"); // defualt

app.use("/", homeRouter);
app.use("/artist", artistRouter);
app.use("/exhibition", exhibitionRouter);
app.use("/customer", customerRouter);
app.use((error, req, res, next) => {
  res.redirect("/error");
});

/////
app.get("/error", (req, res, next) => {
  res.status(500);
  res.render("500.ejs");
});

app.use((req, res, next) => {
  res.status(404);
  res.render("404.ejs");
});

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  console.log("Listening from port 3000");
});
