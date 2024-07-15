import Stripe from 'stripe';

const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY);

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    try {
        const deletedSubscription = await stripe.subscriptions.update(
            body.subscriptionId,
            {
                cancel_at_period_end: true,
            }
        );
        return { success: true, subscription: deletedSubscription };
    } catch (error) {
        return { success: false, error: error.message };
    }
});