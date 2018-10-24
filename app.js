const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const hbs = require("express-hbs");
const dotenv = require("dotenv");
var stripe = require("stripe")(process.env.STRIPE_SECRET);

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
    function(err, charge) {
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
