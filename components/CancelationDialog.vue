<script setup>
import { useMainStore } from '~/store';
const mainStore = useMainStore();
const dialogVisible = ref(false);
// Define props
const props = defineProps({
    successMessage: {
        type: String,
        default: 'I agree to that there is no refund for this one time subscription once I click Cancel',
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
</script>
<template>
    <div class="pa-4 text-center">
        <v-dialog v-model="dialogVisible" transition="scroll-y-transition" :close-delay="0" theme="dark" opacity="0"
            persistent width="auto" class="bg-zinc-950 bg-opacity-50 backdrop-blur-sm" max-width="350">
            <template v-slot:activator="{ props: activatorProps }">
                <!-- <v-btn v-bind="activatorProps" text="test confirmation"></v-btn> -->
                <v-btn @click="" v-bind="activatorProps" type="button" max-height="40" min-height="40" variant="text"
                    color="red" :ripple="false" :elevation="1" class="my-auto w-20">
                    Cancel
                </v-btn>
            </template>

            <template v-slot:default="{ isActive }">
                <v-card>
                    <template v-slot:text>
                        <v-card-title class="text-center"><v-icon class="mx-auto" color="red"
                                size="40">mdi-alert</v-icon></v-card-title>
                        <h1 class="text-xl font-weight-bold mb-3 text-center">Your Current Subscription will
                            be canceled!</h1>
                        <div>
                            <p v-if="props.successMessage" class="success-message text-red-600">{{ props.successMessage
                                }}</p>
                        </div>
                        <v-spacer></v-spacer>
                        <!-- <h1 class="text-h7 p-1">Your Order_ID is:</h1> -->
                        <!-- <p> s892839-ugg787-HHISAsadassa909000-opOP67t6</p> -->
                    </template>

                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn color="surface-variant" text="Cancel" variant="text"
                            @click="isActive.value = false"></v-btn>

                        <v-btn color="red" :elevation="4" text="Confirm" variant="outlined"
                            @click="isActive.value = false; cancelSubs()"></v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
    </div>
</template>