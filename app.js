const path = require("path");
const express = require("express");
const bodyParser = require("body-praser");
const hbs = require("express-hbs");
const dotenv = require("dotenv");

const envfile = process.env.NODE_ENV === "production" ? ".env" : ".dev.env";
dotenv.config({
  silent: true,
  path: `${__dirname}/${envfile}`
});

const charge = require("./charge");

const app = express();

app.engine("html", hbs.express3({ extname: ".html" }));
app.set("view engine", "html");
app.set("views", __dirname);
app.disable("x-powered-by");

app.locals.process = process;

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/charge", (req, res, next) => {
  charge(req)
    .then(data => {
      res.render("thanks");
    })
    .catch(error => {
      res.render("error", erro);
    });
});

app.listen(process.env.port || 3000, () => {
  console.log("Listening");
});
