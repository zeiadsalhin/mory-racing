import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51P5QowHndLqqnsBRYhLNQ8zfyumjg9y9skJgfyakdRwKT3wcO9SO4sNSxzeUkWeDiSCEingE3BogFR6o2sNQ5V0Y00GSJmg68J');

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'ali',
                    },
                    unit_amount: 1,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `https://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `https://localhost:3000/cancel`,
    });
    console.log('SESSION :' + session);
    return { id: session.id };
});