import Stripe from 'stripe';

const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY);

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price: body.productName, // ID of the Price object created in Stripe Dashboard

                quantity: 1,
            },
        ],
        mode: 'subscription',
        success_url: process.env.NODE_ENV === 'production'
      ? `https://chattokgaming.com/success?session_id={CHECKOUT_SESSION_ID}`
      : `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: process.env.NODE_ENV === 'production'
      ? `https://chattokgaming.com/cancel`
      :`http://localhost:3000/cancel`,
    });
    console.log('SESSION :' + session);
    return { id: session.id };
});
