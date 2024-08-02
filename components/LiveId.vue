<template>
    <div>
        <v-dialog v-model="fullPlayer" :fullscreen="true" :hide-overlay="true" :opacity="0" close-delay="10000"
            :close-on-back="true" transition="dialog-bottom-transition"
            class="bg-zinc-950 bg-opacity-80 backdrop-blur-lg">
            <div v-if="authenticating" class="live flex flex-col m-20 w-[20rem] mx-auto text-center">
                <h1 v-if="!resultt" class="text-center text-2xl p-3 mb-8 font-bold font-sans">Please Enter Your Live ID
                </h1>

                <form @submit.prevent="handleSubmit1">
                    <v-text-field v-if="!resultt" :disabled="resultt ? true : false" @input="resultt = false"
                        variant="outlined" label="Tiktok Live ID*" id="New Live ID" v-model="newLiveId" color="#ff0050"
                        bg-color="grey-darken-4" spellcheck="false" type="text" class="w-full mx-auto font-sans text-x"
                        required />
                    <v-btn v-if="!resultt" type="submit" class="ma-5 mx-auto text-center">
                        <v-progress-circular v-if="loading" width="2" size="20" color="#ff0050" class="m-1"
                            indeterminate></v-progress-circular>Submit</v-btn>
                    <p v-if="resultt" class="font-sans text-xl font-semibold p-3">{{ $t('yourliveid') }}
                    <p class="text-red-800 font-sans text-2xl p-2 font-bold">{{ resultt }}</p>
                    </p>
                    <p class="text-sm opacity-80">{{ $t('gpuwarning') }}</p>
                    <v-btn @click="authenticating = false" type="button"
                        v-if="resultt && resultt != null && resultt != 'Please wait 30s before updating your id'"
                        variant="outlined" :elevation="10" class="mt-[2rem] w-[14rem] mx-auto text-center">
                        {{ $t('launchgame') }}</v-btn>
                </form>
                <v-btn @click="emitEvent" color="red" class="mt-[6rem] w-fit mx-auto">{{ $t('exitgame') }}</v-btn>
            </div>

            <div v-else class="game flex flex-col justify-center">

                <iframe v-if="resultt" :src="gameServer + '/?liveid=' + resultt" class=" mx-auto" width="448"
                    height="840" frameborder="0" scrolling="no"></iframe>
                <v-btn v-if="!authenticating" color="red" variant="tonal" :text="$t('exitgame')" @click="exitGame"
                    class="ma-1 w-[20rem] mx-auto"></v-btn>
            </div>

        </v-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const supabase = useSupabaseClient()
const user = useSupabaseUser()
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
    // resultt.value = false
})

onBeforeMount(() => {
    liveidCheck()
})
const liveidCheck = async () => {
    try {
        const { data, error } = await supabase.auth.getSession();
        if (data) {
            loading.value = true

            // submit to supabase
            const { data: liveid, error } = await supabase
                .from('usersettings')
                .select()
                .eq('email', data.session.user.email)

            if (error) {
                console.log('Supabase Error: ' + error);
                loading.value = false
                resultt.value = 'Error fetching LiveId'
            } else {
                resultt.value = liveid[0].liveid
                loading.value = false
                console.warn("If you reached here This is a warning message!");
                console.log('%cWARNING: This is a critical message! Illegal copy or wrong usage of this game is prohibited in all cases, please use legal method provided to play the game, attackers will be punished!', 'font-size: 20px; color: red; font-weight: bold;');

            }
        } else {
            console.log(`Failed to update Live ID: ${result.error}`);
            // resultt.value = result.code = 520 ? 'Please wait 30s before updating your id' : result.error;
            loading.value = false
        }

    } catch (error2) {
        console.log(`Error: ${error2.message}`);
        loading.value = false
    }

};

// const handleSubmit = async () => {
//     try {
//         loading.value = true
//         const response = await fetch('/api/update-liveId', {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ newLiveId: newLiveId.value }),
//         });

//         const result = await response.json();
//         if (result.success) {
//             console.log('Live ID updated successfully.' + JSON.stringify(result));
//             resultt.value = result.data
//             loading.value = false
//         } else {
//             console.log(`Failed to update Live ID: ${result.error}`);
//             resultt.value = result.code = 520 ? 'Please wait 30s before updating your id' : result.error;
//             loading.value = false
//         }
//     } catch (error) {
//         console.log(`Error: ${error.message}`);
//         loading.value = false
//     }
// };
///
const handleSubmit1 = async () => {
    try {
        const { data, error } = await supabase.auth.getSession();
        if (data) {
            loading.value = true
            const response = await fetch('/api/generate-liveId', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ liveId: newLiveId.value }),
            });

            const result = await response.json();
            if (result.success) {
                // submit to supabase
                const { data: submitted, error } = await supabase
                    .from('usersettings')
                    .insert({
                        liveid: newLiveId.value,
                        Appsettings: { "game": { "brakeMax": 10, "minSpeed": 10, "speedMax": 10, "giftIncrement": 1, "likeIncrement": 0.1, "accelerationMax": 5, "boosterAmmountMax": 10, "secondsToStartRace": 5, "resetTimerOnPlayerJoin": false }, "tuts": false, "liveId": newLiveId.value, "server": { "prod": "wss://app-tiktoklive-dev-use-001.azurewebsites.net/MyHub", "local": "ws://localhost:5000/MyHub", "active": "prod" }, "debugLogs": false, "localDebug": false },
                        email: data.session.user.email,
                        uid: data.session.user.id
                    })

                if (error) {
                    console.log('Supabase Error: ' + error);
                    loading.value = false
                    resultt.value = 'Error Updating LiveId'
                } else {
                    console.log('Live ID updated successfully.' + JSON.stringify(result));
                    resultt.value = result.data
                    loading.value = false
                    console.warn("If you reached here This is a warning message!");
                    console.log('%cWARNING: This is a critical message! Illegal copy or wrong usage of this game is prohibited in all cases, please use legal method provided to play the game, attackers will be punished!', 'font-size: 20px; color: red; font-weight: bold;');

                }
            } else {
                console.log(`Failed to update Live ID: ${result.error}`);
                // resultt.value = result.code = 520 ? 'Please wait 30s before updating your id' : result.error;
                loading.value = false
            }
        }
    } catch (error2) {
        console.log(`Error: ${error2.message}`);
        loading.value = false
    }

};
///
// const handleSubmit2 = async () => {
//     try {
//         loading.value = true
//         const response = await fetch('/api/generate-liveId-local', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ liveId: newLiveId.value }),
//         });

//         const result = await response.json();
//         if (result.success) {
//             console.log('Live ID updated successfully.' + JSON.stringify(result));
//             resultt.value = result.data.liveId
//             loading.value = false
//         } else {
//             console.log(`Failed to update Live ID: ${result.error}`);
//             resultt.value = result.code = 520 ? 'Please wait 30s before updating your id' : result.error;
//             loading.value = false
//         }
//     } catch (error) {
//         console.log(`Error: ${error.message}`);
//         loading.value = false
//     }
// };
</script>