<template>
    <div>
        <div class="w-60 mx-auto" ref="paypalContainer"></div>
        <button v-if="perror" class="text-red-500">Error: {{ perror }}</button>
    </div>
</template>

<script setup>
// load payment info 
import { useMainStore } from '~/store';
const router = useRouter()
const mainStore = useMainStore();
// Define props
const props = defineProps({
    plan: String,
    price: Number,
    description: String,

});

const loaded = ref(false);
const paidFor = ref(false);
const perror = ref(null)


const setLoaded = () => {
    loaded.value = true;
    paypal.Buttons({
        createOrder: (data, actions) => {
            return actions.order.create({
                purchase_units: [
                    {
                        description: props.plan,
                        amount: {
                            currency_code: "USD",
                            value: props.price
                        }
                    }
                ]
            });
        },
        onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            paidFor.value = true;
            // console.log(order);
            mainStore.captureOrder(order)
            router.push(`/user/orders/invoice&${order.id}`)
            // mainStore.clearCart();
        },
        onError: err => {
            console.log(err);
            perror.value = err
        },
        style: {
            tagline: false,
            layout: 'horizontal',
            color: 'black',
            shape: 'sharp',
            label: 'pay',
            borderRadius: 1,
        }
    }).render(paypalContainer.value);
};

// Load PayPal SDK script when component is mounted
const paypalContainer = ref(null); // Define a ref for the PayPal container
onMounted(() => {
    setLoaded()
});

</script>