<template>
    <div>
        <div :id="containerId" class="w-[18rem] height-[20rem] mx-auto"></div>
        <p v-if="perror" class="text-red-500 font-sans text-sm">Error: {{ perror }}</p>
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

const containerId = 'paypal-button-container-P-9W433429316606647M2IFIMY';
const client_id_dv = import.meta.env.PAYPAL;

// Load PayPal SDK script
onMounted(() => {
    if (window.paypal) {
        initializePayPalButtons();
    }
    // else {
    // const script = document.createElement('script');
    // script.src = `https://www.paypal.com/sdk/js?client-id=${import.meta.env.PAYPAL}&vault=true&intent=subscription`;
    // script.setAttribute('data-sdk-integration-source', 'button-factory');
    // script.addEventListener('load', initializePayPalButtons);
    // document.body.appendChild(script);
    // }
});

// Initialize PayPal Buttons
function initializePayPalButtons() {
    paypal.Buttons({
        style: {
            tagline: false,
            layout: 'horizontal',
            color: 'black',
            shape: 'sharp',
            label: 'subscribe',
            borderRadius: 1,
        },
        createSubscription: function (data, actions) {
            return actions.subscription.create({
                plan_id: 'ERRSUB033'
            });
        },
        onApprove: function (data, actions) {
            // Capture the subscription payment
            actions.subscription.capture().then(function (details) {
                console.log('Subscription captured successfully:', details);
                mainStore.captureOrder(details, props.plan)
                router.push(`/user/orders/invoice&${order.id}`)

                // alert('Subscription captured successfully!');
            }).catch(function (error) {
                console.error('Failed to capture subscription:', error);
                perror.value = err.message
                // alert('Failed to capture subscription: ' + error.message);
            });
        },
        onCancel: function (data) {
            console.log('Subscription payment cancelled:', data);
            // alert('Subscription payment cancelled.');
        },
        onError: function (err) {
            console.error('Error occurred during subscription:', err);
            perror.value = err.message
            // alert('An error occurred during subscription: ' + err.message);
        }
    }).render('#' + containerId);
}


//////////////////
// const containerId = 'paypal-button-container-P-9W433429316606647M2IFIMY';
// const client_id_pd = 'AUXWqWnpPMo3TQsndWCe2kF7s0ZO4kIdltAxVPNPdWwAaFnGj2kCQgSVqPlxOPuqhQAZGU1YQQ-V4gCk'
// const client_id_dv = 'Actgw_G5U2iZBKqJUKja6gjMddqXeFN3ZCClr8YvWv9w9KZC14KImwlmIJWEHvqIGtt5cmZFdiN1g4Yc'
// onMounted(() => {
//     // Load PayPal SDK script
//     const script = document.createElement('script');
//     script.src = `https://www.paypal.com/sdk/js?client-id=${client_id_dv}&vault=true&intent=subscription`;
//     script.setAttribute('data-sdk-integration-source', 'button-factory');
//     script.addEventListener('load', initializePayPalButtons);
//     document.body.appendChild(script);

//     // Initialize PayPal Buttons
//     function initializePayPalButtons() {
//         paypal.Buttons({
//             style: {
//                 shape: 'pill',
//                 color: 'black',
//                 layout: 'horizontal',
//                 label: 'subscribe'
//             },
//             createSubscription: function (data, actions) {
//                 return actions.subscription.create({
//                     plan_id: 'P-9W433429316606647M2IFIMY'
//                 });
//             },
//             onApprove: function (data, actions) {
//                 alert(data.subscriptionID); // Optional success message for the subscriber
//             }
//         }).render('#' + containerId);
//     }
// });

</script>