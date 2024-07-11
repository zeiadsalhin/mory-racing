// services/stripe.js
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = Stripe('pk_test_51PbCugI4aHqhinrA9sCytQD7jIlhqLWBYQireLPZjFtcIEBs5Sgxt46yDomCTz6xHjnloKIJIveFxbgmNjZ9f0la00uY4BdDvv');

export default stripePromise;
