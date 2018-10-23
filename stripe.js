var stripe = require("stripe")(process.env.STRIPE_SECRET);

module.export = req => {
  const token = req.body.stripeToken;

  return stripe.charges.create({
    amount: parseInt(process.env.STRIPE_COST, 10),
    currency: process.env.STRIPE_CCY,
    source: token,
    description: "Subscription to Spudbox",
    metadata: {}
  });
};
