<template>
    <div>
        <button @click="checkout">Checkout</button>
    </div>
</template>

<script setup>
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51P5QowHndLqqnsBRVpdsfH0OUfKfxl5fNWNlK8wtaSgbKOmbWzYeFZxX9KKFcDAtAX1J4gDcjjh1Eq8R58ZjkI2W00QPdoeNpJ');

const checkout = async () => {
    const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            productName: 'Product Name',
            amount: 2000, // amount in cents
        }),
    });
    console.log(response);

    const session = await response.json();

    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId: session.id });
};
</script>