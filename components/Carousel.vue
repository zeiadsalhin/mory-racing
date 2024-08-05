<script setup>
const { locale, setLocale } = useI18n()
const currentLocale = computed(() => locale.value)

// handle Auth state
const user = useSupabaseUser()
const isUser = ref(true)
watch(user, () => {
    if (user.value) {
        isUser.value = true
    } else {
        isUser.value = false
    }
}, { immediate: true })
</script>
<template>
    <h1 id="offers" class="text-2xl font-semibold p-5 mx-auto text-center italic">{{ $t('discovergame') }}</h1>
    <transition name="fade" mode="out-in">
        <v-locale-provider :rtl="currentLocale == 'ar' ? true : false">
            <v-parallax src="/public/b.webp " class="md:h-[75vh] h-[75vh]" alt="Car1">
                <div class="d-flex md:flex-row flex-col-reverse md:ml-[8.6rem] fill-height justify-start">
                    <div class="d-flex flex-column amd:ml-[8.6rem] fill-height justify-center alaign-center text-white">

                        <div class="rounded-md backdrop-brightness-75 w-fit  md:m-10 md:p-10 p-5 ">
                            <h1 class="text-2xl md:text-3xl w-fit font-weight-bold mb-4">
                                {{ $t('chattoklive') }}!
                            </h1>
                            <p class="text-subtitle md:w-[30rem] brightness-90 font-weight-light px-3  mb-4">{{
                                $t('chattoklivedesc') }}
                            </p>
                            <v-btn :to="isUser ? '/user/account#LiveGames' : '/login'" color="#ff0050" variant="flat"
                                :ripple="false" class="text-h6 m-2">{{ $t('chattoklivebutton') }}</v-btn>

                        </div>
                    </div>
                    <!--video-->
                    <div class="flex flex-col space-y-4 justify-center md:mt-0 mt-20 p-5 fill-height">
                        <video id="my-video" class="video-js md:w-[16rem] w-[9.5rem] rounded-xl" controls
                            autoplay="true" width="100%" playsinline onloadstart="this.volume=0.5" loop="true"
                            height="100%" data-poster="/mainicon.ico" data-setup="{}" v-lazy-load>
                            <source src="/intro.mp4" type="video/mp4" />
                            <p class="vjs-no-js">
                                To view this video please enable JavaScript, and consider upgrading to a
                                web browser that
                                <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5
                                    video</a>
                            </p>
                        </video>
                        <v-btn><a href="https://chattokgaming.com/chattokproofstats" target="_blank"
                                rel="noopener noreferrer">Show proof</a></v-btn>
                    </div>
                </div>
            </v-parallax>
        </v-locale-provider>
    </transition>
    <!-- <v-carousel height="65vh" :hide-delimiters="true" class="p-1">
        <v-carousel-item v-if="items" v-for="(item, i) in items" :key="i" :src="JSON.parse(item.image)[0]" cover>
            <v-img height="100vh">
                <v-container class="fill-height mt-32 ">
                    <v-row dense>
                        <v-col md="7">
                            <div class="pa-md-5 pa-3 rounded-lg black--text text-white text-center text-md-left"
                                style="background-color: rgba(0, 0, 0, 0.8)">
                                <h2 class="text-md-h4 text-h5">
                                    {{ item.name }}
                                </h2>
                                <div v-if="item.discount_price" class="discounted price">
                                    <p
                                        class="text-h7 inline-block mr-4 mt-2 text-red-70 line-through decoration-2 decoration-red-700">
                                        {{ settings?.currency + ' ' + ((item.price)).toFixed()
                                        }}
                                    </p>
                                    <p class="mr-4 mt-2 inline-block">-% {{ (((item.price - item.discount_price) /
                                        item.price) *
                                        100).toFixed() }}
                                        off
                                    </p>
                                    <p class="text-h4 primary--text mt-3 font-weight-bold">
                                        {{ settings?.currency + ' ' + (item.discount_price) }}
                                    </p>
                                </div>
                                <div v-else>
                                    <p class="mt-3">From
                                    <p class="text-h4 primary--text  font-weight-bold">
                                        {{ settings?.currency + ' ' + (item.price) }}
                                    </p>
                                    </p>
                                </div>
                                <p class="text-md-body-2 md:mb-5 mb-2"></p>
                                <v-btn depressed :to="`/products/${item.id}`" color="primary" class="text-capitalize"
                                    min-height="40">Check It Out</v-btn>
                            </div>
                        </v-col>
                    </v-row>
                </v-container>
            </v-img>
        </v-carousel-item>
        <v-carousel-item v-else>
            <div class="h-full flex justify-center p-10">
                <div class="m-10 p-5 bg-zinc-900 my-auto shadow-sm">
                    <div class="flex justify-center text-white p-5"><v-progress-circular color="dark-blue"
                            indeterminate></v-progress-circular>
                    </div>
                </div>

            </div>
        </v-carousel-item>
    </v-carousel> -->
</template>
<script>
// import Swal from 'sweetalert2'

export default {
    data() {
        return {
            sale_items: true,
            items: true,
            settings: null,
        }
    },
    mounted() {
        // this.fetchProducts();
    },
    methods: {

        // async fetchProducts() {
        //     const supabase = useSupabaseClient()
        //     const user = useSupabaseUser()
        //     try {
        //         const { data, error } = await supabase.from('Products').select('*');
        //         const { data: config, error: configerror } = await supabase
        //             .from('store_config')
        //             .select('*')

        //         this.settings = config[0]
        //         // console.log('Products:', data);
        //         this.items = data

        //     } catch (error) {
        //         console.error('Error fetching products:', error.message);
        //     }
        // },

    },
}

</script>

<style></style>