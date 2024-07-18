<template>
    <div>
        <v-dialog v-model="fullPlayer" :fullscreen="true" :hide-overlay="true" :opacity="0" close-delay="10000"
            :close-on-back="true" transition="dialog-bottom-transition"
            class="bg-zinc-950 bg-opacity-80 backdrop-blur-lg">
            <div v-if="authenticating" class="live flex flex-col m-20 w-[20rem] mx-auto text-center">
                <h1 class="text-center text-2xl p-3 mb-8 font-bold font-sans">Please Enter Your Live ID</h1>

                <form @submit.prevent="handleSubmit">
                    <v-text-field :disabled="resultt ? false : false" @input="resultt = false" variant="outlined"
                        label="Tiktok Live ID*" id="New Live ID" v-model="newLiveId" color="#ff0050"
                        bg-color="grey-darken-4" spellcheck="false" type="text" class="w-full mx-auto font-sans text-x"
                        required />
                    <v-btn v-if="!resultt" type="submit" class="ma-5 mx-auto text-center">
                        <v-progress-circular v-if="loading" width="2" size="20" color="#ff0050" class="m-1"
                            indeterminate></v-progress-circular>Submit</v-btn>
                    <p v-if="resultt" class="font-sans text-xl font-semibold p-3">Your Live ID is:
                    <p class="text-red-800 font-sans text-2xl p-2 font-bold">{{ resultt }}</p>
                    </p>

                    <v-btn @click="authenticating = false" type="button"
                        v-if="resultt && resultt != null && resultt != 'Please wait 30s before updating your id'"
                        variant="outlined" :elevation="10" class="mt-[2rem] w-[14rem] mx-auto text-center">
                        Launch Game!</v-btn>
                </form>
                <v-btn @click="emitEvent" color="red" class="mt-[6rem] w-fit mx-auto">Exit game</v-btn>
            </div>

            <div v-else class="game flex flex-col justify-center">

                <iframe v-if="newLiveId" :src="gameServer"
                    class="h-[48rem] mt-3 min-w-[20rem]a w-[22rem] md:w-[25.92rem] mx-auto" width="100%" height="100%"
                    frameborder="0"></iframe>
                <v-btn v-if="!authenticating" color="red" variant="tonal" text="Exit Game" @click="exitGame"
                    class="ma-1 w-[20rem] mx-auto"></v-btn>
            </div>

        </v-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const gameServer = import.meta.env.VITE_moryracing_src

// props to open 
const props = defineProps({
    open: Boolean,
    // price: Number,
    // description: String,

});

const fullPlayer = ref(false)
const newLiveId = ref('');
const loading = ref(false)
const resultt = ref()
const authenticating = ref(true)
//watch for trigger
watch(() => props.open, (newValue, oldValue) => {
    // Handle logic based on the new value of props.open
    if (newValue) {
        fullPlayer.value = newValue
    }
});

// close the dialoge
const emits = defineEmits(['resetDialog']);
const emitEvent = () => {
    emits('resetDialog', fullPlayer.value = false)

};

const exitGame = (() => {
    emitEvent()
    authenticating.value = true
    resultt.value = false
})

const handleSubmit = async () => {
    try {
        loading.value = true
        const response = await fetch('/api/update-liveId', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newLiveId: newLiveId.value }),
        });

        const result = await response.json();
        if (result.success) {
            console.log('Live ID updated successfully.' + JSON.stringify(result));
            resultt.value = result.data
            loading.value = false
        } else {
            console.log(`Failed to update Live ID: ${result.error}`);
            resultt.value = result.code = 520 ? 'Please wait 30s before updating your id' : result.error;
            loading.value = false
        }
    } catch (error) {
        console.log(`Error: ${error.message}`);
        loading.value = false
    }
};
///
// const handleSubmit1 = async () => {
//     try {
//         loading.value = true
//         const response = await fetch('/api/generate-liveId', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ liveId: newLiveId.value }),
//         });

//         const result = await response.json();
//         if (result.success) {
//             console.log('Live ID updated successfully.' + JSON.stringify(result));
//             resultt.value = result.data
//             loading.value = false
//         } else {
//             console.log(`Failed to update Live ID: ${result.error}`);
//             // resultt.value = result.code = 520 ? 'Please wait 30s before updating your id' : result.error;
//             loading.value = false
//         }
//     } catch (error) {
//         console.log(`Error: ${error.message}`);
//         loading.value = false
//     }
// };
///
const handleSubmit2 = async () => {
    try {
        loading.value = true
        const response = await fetch('/api/generate-liveId-local', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ liveId: newLiveId.value }),
        });

        const result = await response.json();
        if (result.success) {
            console.log('Live ID updated successfully.' + JSON.stringify(result));
            resultt.value = result.data.liveId
            loading.value = false
        } else {
            console.log(`Failed to update Live ID: ${result.error}`);
            resultt.value = result.code = 520 ? 'Please wait 30s before updating your id' : result.error;
            loading.value = false
        }
    } catch (error) {
        console.log(`Error: ${error.message}`);
        loading.value = false
    }
};
</script>