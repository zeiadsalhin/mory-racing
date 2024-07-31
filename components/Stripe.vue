<template>
    <section>
        <!-- <h2>Stripe client</h2> -->
        <client-only>
            <v-btn @click="checkout" class="w-[18rem] mt-3"><v-icon v-if="!loading"
                    class="mx-1">mdi-credit-card</v-icon>
                <v-progress-circular v-else color="grey-darken-1" size="20" width="1" indeterminate
                    class="my-auto mx-2"></v-progress-circular>
                {{ $t('stripepay') }}</v-btn>
        </client-only>
    </section>
</template>

<script setup>
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);


// props to get product_id
const props = defineProps({
    plan: String,
    // price: Number,
    // description: String,

});
console.log(props.plan);
const loading = ref(false);
const checkout = async () => {
    loading.value = true
    const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            productName: props.plan,
            // 'price_1PbK2wHndLqqnsBR3EjfRMcx',
            // amount: 2000, // amount in cents
            // priceId: ''
        }),
    });


    const session = await response.json();
    console.log(session);
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId: session.id });

    loading.value = false
};
</script>