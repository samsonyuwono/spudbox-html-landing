var stripe = require("stripe")(process.env.STRIPE_SECRET);

module.export = req => {
  const token = req.body.stripeToken;

  return stripe.charges.create({
    amount: 1599,
    currency: "usd",
    source: token,
    capture: false,
    description: "Subscription to Spudbox"
  });
};
