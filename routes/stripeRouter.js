const express = require('express');
const isAuthenticated = require('../middleware/authenticate');
const { handleStripePayment,  verifyPayment } = require('../controller/handleStripePayment');
const stripeRouter = express.Router();

stripeRouter.post('/checkout', isAuthenticated,handleStripePayment);
stripeRouter.post('/verify-payment/:paymentIntentId', isAuthenticated,verifyPayment);

module.exports = stripeRouter;