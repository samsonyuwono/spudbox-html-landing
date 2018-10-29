const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const hbs = require("express-hbs");
const dotenv = require("dotenv");

const stripe = process.env.NODE_ENV === "production" ? ".env" : ".dev.env";
dotenv.config({
  silent: true,
  path: `${__dirname}/${envfile}`
});
const app = express();

app.engine("html", hbs.express3({ extname: ".html" }));
app.set("view engine", "html");
app.disable("x-powered-by");

app.locals.process = process;

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/charge", (req, res) => {
  res.render("confirmation", {});
});

app.post("/charge", (req, res) => {
  var token = req.body.stripeToken;
  var chargeAmount = req.body.chargeAmount;
  var charge = stripe.charges.create(
    {
      amount: chargeAmount,
      currency: "usd",
      source: token
    },
    (err, charge) => {
      if (err & (err.type === "StripeCardError")) {
        console.log("Your card was declined");
      }
    }
  );
  console.log("Your payment was successful!");
  res.redirect("/charge");
});

app.listen(process.env.port || 3000, () => {
  console.log("Listening");
});
