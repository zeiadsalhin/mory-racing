<template>
    <div>
        <button @click="checkout">Checkout</button>
    </div>
</template>

<script setup>
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const checkout = async () => {
    const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            // productName: 'Product Name',
            // amount: 2000, // amount in cents
            // priceId: ''
        }),
    });


    const session = await response.json();
    console.log(session);
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId: session.id });
};
</script>