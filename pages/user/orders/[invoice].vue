<script setup>
import { useMainStore } from '~/store';
const mainStore = useMainStore();
const order = computed(() => mainStore.orders);
// print
function printPage() {
    window.print();
}
onBeforeMount(() => {
    order.value == 0 ? navigateTo('/user/account') : '';
})

//seo 
useSeoMeta({
    title: `Chattok Gaming Order Confirmation ${order.value.id}`,
    ogTitle: `Chattok Gaming Order Confirmation ${order.value.id}`,
    description: 'Chattok Gaming Invoice system',
    ogDescription: 'Chattok Gaming Invoice system',
    ogImage: 'https://mory-racing.netlify.app/mainicon.ico',
    twitterCard: 'summary_large_image',
})
</script>
<template>
    <div v-if="order.length != 0" class="mt- flex-col justify-center mx-auto text-center p-1">
        <v-icon icon="mdi-check-circle" color="green" class="m-5" style="font-size: 4rem;"></v-icon>
        <h1 class="text-center text-2xl ">Success! Order Completed</h1>
        <div class="order data flex justify-center space-x-2 text-center">
            <h2 class="font-semibold text-lg py-5">Order ID:</h2>
            <p class="my-auto">{{ order.id }}</p>
        </div>
        <p class="my-auto text-xl font-semibold">"{{ order.purchase_units[0].description }}"</p>
        <button @click="printPage()" class="text-lg px-5 rounded-sm bg-zinc-800 mt-5"> <v-icon
                icon="mdi-printer-outline" class="m-2"></v-icon>Print</button>
        <div class="main md:flex justify-center md:space-x-5 md:m-5 p-5 mt-10 w-fit mx-auto bg-zinc-900">
            <div class="1 p-3 md:p-5 space-y-3 m-2">
                <h2 class="font-semibold text-2xl text-left text-white">Payer info:</h2>
                <div class="details opacity-80 data flex justify-centera space-x-2 text-left">
                    <h1 class="text-lg">Name:</h1>
                    <p class="my-auto">{{ order.payer.name.given_name }} {{ order.payer.name.surname }}</p>
                </div>
                <div class="details opacity-80 data flex justify-centera space-x-2 text-center">
                    <h1 class="text-lg">Email:</h1>
                    <p class="my-auto">{{ order.payer.email_address }}</p>
                </div>
                <div class="details opacity-80 data flex justify-centera space-x-2 text-center">
                    <h1 class="text-lg">Payer ID:</h1>
                    <p class="my-auto">{{ order.payer.payer_id }}</p>
                </div>
                <div class="details opacity-80 data flex justify-centera space-x-2 text-center">
                    <h1 class="text-lg">Payer Address:</h1>
                    <p class="my-auto">{{ order.payer.address.country_code }}</p>
                </div>
            </div>

            <div class="devider md:hidden h-1 w-11/12 mx-auto rounded-lg bg-zinc-950"></div>

            <div class="2 p-3 md:p-5 space-y-3 m-2">
                <h1 class="font-semibold text-2xl text-left">Details:</h1>
                <div class="details opacity-80 data flex justify-centera space-x-2 text-center">
                    <h1 class="text-lg">Price:</h1>
                    <p class="my-auto">{{ order.purchase_units[0].amount.value }} {{
                        order.purchase_units[0].amount.currency_code }}</p>
                </div>
                <div class="details opacity-80 data flex justify-centera space-x-2 text-center">
                    <h1 class="text-lg">Support Email:</h1>
                    <p class="my-auto">{{ order.purchase_units[0].payee.email_address }}</p>
                </div>
                <div class="details opacity-80 data flex justify-centera space-x-2 text-center">
                    <h1 class="text-lg">Merchant ID:</h1>
                    <p class="my-auto">{{ order.purchase_units[0].payee.merchant_id }}</p>
                </div>
                <div class="details opacity-80 data flex justify-centera space-x-2 text-center">
                    <h1 class="text-lg">Merchant Name:</h1>
                    <p class="my-auto">{{ order.purchase_units[0].soft_descriptor }}</p>
                </div>
                <div class="details opacity-80 data flex justify-centera space-x-2 text-center">
                    <h1 class="text-lg">Status:</h1>
                    <p class="my-auto">{{ order.status }}</p>
                </div>
                <div class="details opacity-80 data flex justify-centera space-x-2 text-center">
                    <h1 class="text-lg">Time:</h1>
                    <p class="my-auto">{{ order.update_time }}</p>
                </div>
            </div>
        </div>

    </div>
</template>