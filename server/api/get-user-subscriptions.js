import Stripe from 'stripe';

const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY);

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    try {
        const Subscriptions = await stripe.subscriptions.list(

            {
                customer: body.cus_id,
            }
        );
        return { success: true, subscription: Subscriptions };
    } catch (error) {
        return { success: false, error: error.message };
    }
});