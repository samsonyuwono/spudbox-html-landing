var stripe = require("stripe")("sk_test_NdlrA7E4PnBOUVu4elDlZe8m");

module.export = req => {
  const token = req.body.stripeToken;

  return stripe.charges.create({
    amount: 1299,
    currency: "usd",
    source: token,
    capture: false,
    description: "Subscription to Spudbox"
  });
};
