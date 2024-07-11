<template>
    <section>
        <!-- <h2>Stripe client</h2> -->
        <client-only>
            <v-btn @click="redirectToCheckout" class="w-[18rem] mt-3"><v-icon v-if="!loading"
                    class="mx-1">mdi-credit-card</v-icon>
                <v-progress-circular v-else color="grey-darken-1" size="20" width="1" indeterminate
                    class="my-auto mx-2"></v-progress-circular>
                Pay
                with
                Stripe</v-btn>
        </client-only>
    </section>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from 'nuxt/app'
import { loadStripe } from '@stripe/stripe-js'
import { ref } from 'vue'

const config = useRuntimeConfig()
const stripe = await loadStripe(config.public.stripePk)

const loading = ref(false);
const checkoutSessionId = ref<string | null>(null);

async function redirectToCheckout() {
    try {
        loading.value = true
        const { error, sessionId } = await stripe.redirectToCheckout({
            lineItems: [{ price: 'price_1PbHI3HndLqqnsBR0d18PEMZ', quantity: 1 }], // Replace with your actual Price ID
            mode: 'payment',
            successUrl: 'https://localhost:3000/success',
            cancelUrl: 'https://localhost:3000/cancel',
        });

        if (error) {
            console.error('Error redirecting to checkout:', error);
            // Handle error gracefully, show a message, etc.
        } else {
            console.log('Redirecting to checkout. Session ID:', sessionId);
            checkoutSessionId.value = sessionId;
            // Here you can do additional logging or handling of the session ID
        }
    } catch (err) {
        console.error('Error redirecting to checkout:', err);
        // Handle error gracefully, show a message, etc.
    } finally {
        loading.value = false;
    }
}
</script>
