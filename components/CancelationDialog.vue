<script setup>
import { useMainStore } from '~/store';
const mainStore = useMainStore();
const dialogVisible = ref(false);
// Define props
const props = defineProps({
    successMessage: {
        type: String,
        default: 'I agree to that there is no refund for this subscription period once I Cancel',
    },
});

watch(() => props.successMessage, (Val) => {
    if (Val) {
        emit('open-dialog'); // Emit event to parent component
        // console.log(Val); // Log the successMessage
        // dialogVisible.value = true
        //Remove items from cart

    }
});

// Cancel Subscription
const emit = defineEmits(['fetch-subs']);
const supabase = useSupabaseClient()
async function cancelSubs() {
    const { data: userdata, error } = await supabase.auth.getSession();
    //
    try {
        const { data, error } = await supabase
            .from('user_subscriptions')
            .update({ status: 'notActive' })
            .eq('uid', userdata.session.user.id)
        // // .select()
        if (error) {
            console.log(error);
        } else {

            emit('fetch-subs'); // Emit event to parent
        }
    } catch (error) {
        console.log(error);
    }

}

const cancelSubscription = async () => {
    const user = useSupabaseUser();
    // console.log(user.value);
    // const cus_id = user.value.user_metadata.stripe_cus_id; // Replace with the actual subscription ID
    const subscriptionId = user.value.user_metadata.stripe_subs_id; // Replace with the actual subscription ID
    try {
        const response = await fetch('/api/cancel-subscription', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ subscriptionId }),
        });

        const result = await response.json();
        if (result.success) {
            // message.value = 'Subscription cancelled successfully.';
            console.log('Subscription cancelled successfully.');
            emit('fetch-subs');
        } else {
            // message.value = `Failed to cancel subscription: ${result.error}`;
            console.log(`Failed to cancel subscription: ${result.error}`);
        }
    } catch (error) {
        // message.value = `Error: ${error.message}`;
        console.log(`Error: ${error.message}`);
    }
};
</script>
<template>
    <div class="pa-4 text-center">
        <v-dialog v-model="dialogVisible" transition="scroll-y-transition" :close-delay="0" theme="dark" opacity="0"
            persistent width="auto" class="bg-zinc-950 bg-opacity-50 backdrop-blur-sm" max-width="350">
            <template v-slot:activator="{ props: activatorProps }">
                <!-- <v-btn v-bind="activatorProps" text="test confirmation"></v-btn> -->
                <v-btn @click="" v-bind="activatorProps" type="button" max-height="40" min-height="40" variant="text"
                    color="red" :ripple="false" :elevation="1" class="my-auto w-20">
                    {{ $t('cancel') }}
                </v-btn>
            </template>

            <template v-slot:default="{ isActive }">
                <v-card>
                    <template v-slot:text>
                        <v-card-title class="text-center"><v-icon class="mx-auto" color="red"
                                size="40">mdi-alert</v-icon></v-card-title>
                        <h1 class="text-xl font-weight-bold mb-3 text-center  font-sans font-bold">{{ $t('subscancel')
                            }}</h1>
                        <div>
                            <p v-if="props.successMessage" class="success-message text-red-600  font-sans font-bold">{{
                                $t(`cancelwarning`) }}</p>
                        </div>
                        <v-spacer></v-spacer>
                        <!-- <h1 class="text-h7 p-1">Your Order_ID is:</h1> -->
                        <!-- <p> s892839-ugg787-HHISAsadassa909000-opOP67t6</p> -->
                    </template>

                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn color="surface-variant" text="" variant="text" @click="isActive.value = false">{{
                            $t('cancel') }}</v-btn>

                        <v-btn color="red" :elevation="4" text="" variant="outlined"
                            @click="isActive.value = false; cancelSubscription()">{{ $t('confirm') }}</v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
    </div>
</template>