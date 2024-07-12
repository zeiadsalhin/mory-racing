import Stripe from 'stripe';

const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY);

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const session = await stripe.checkout.sessions.retrieve(body.sessionId);
    const invoice = {
        customer_id: session.id,
        customer_email: session.customer_email,
        amount: session.amount_total,
        currency: session.currency,
        invoice_id: session.invoice,
        type: session.mode,
        auto_billing: session.payment_method_collection,
        payment_method: session.payment_method_types[0],
        payment_status: session.payment_status,
        transaction_status: session.status,
        subscriptionId: session.subscription
        // Add more fields as necessary
    };
    const subscription = await stripe.subscriptions.retrieve(session.subscription);
    const subs_details = {
        customer_id: subscription.customer,
        subs_id: subscription.id,
        start_date: new Date(subscription.current_period_start * 1000).toLocaleDateString(),
        end_date: new Date(subscription.current_period_end * 1000).toLocaleDateString(),
        auto_renew: !subscription.cancel_at_period_end,
        billing_type: subscription.collection_method,
        status: subscription.status,
        trial_end: subscription.trial_end,

    }
    // console.log(subscription);
    // console.log(session);
    // Save the invoice to your database
    // Example: await saveInvoiceToDatabase(invoice);

    return { success: true, invoice, subs_details };
});