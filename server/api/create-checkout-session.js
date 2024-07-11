import Stripe from 'stripe';

const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY);

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price: 'price_1PbK2wHndLqqnsBR3EjfRMcx', // ID of the Price object created in Stripe Dashboard
                // body.productName 
                quantity: 1,
            },
        ],
        mode: 'subscription',
        success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://localhost:3000/cancel`,
    });
    console.log('SESSION :' + session);
    return { id: session.id };
});