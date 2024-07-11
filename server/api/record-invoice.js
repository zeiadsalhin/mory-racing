import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51P5QowHndLqqnsBRYhLNQ8zfyumjg9y9skJgfyakdRwKT3wcO9SO4sNSxzeUkWeDiSCEingE3BogFR6o2sNQ5V0Y00GSJmg68J');

export default defineEventHandler(async (event) => {
    const body = await useBody(event);

    const session = await stripe.checkout.sessions.retrieve(body.sessionId);
    const invoice = {
        customer_email: session.customer_email,
        amount: session.amount_total,
        currency: session.currency,
        // Add more fields as necessary
    };
    console.log(invoice);
    // Save the invoice to your database
    // Example: await saveInvoiceToDatabase(invoice);

    return { success: true };
});