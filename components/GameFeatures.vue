<script setup>


const features = [
    { title: 'Graphics and Visuals:', text: 'Experience breathtaking graphics with meticulously detailed cars and dynamic environments. Real-time reflections, weather effects, and day-night cycles bring each race track to life.' },
    { title: 'Physics and Realism:', text: 'Enjoy realistic driving physics that simulate the nuances of handling, braking, and acceleration. Feel the thrill of drifting around corners and mastering the art of precision racing.' },
    { title: 'Customization:', text: 'Personalize your racing experience with extensive customization options for your cars. From paint jobs to performance upgrades, tailor your vehicle to suit your racing style and strategy.' },
    { title: 'Tracks and Environments:', text: 'Race through diverse landscapes, from urban cityscapes to scenic countryside and challenging off-road trails. Each track offers unique challenges and strategic opportunities for competitive racing.' },
    { title: 'Multiplayer and Social Features:', text: 'Challenge friends or compete against players worldwide in real-time multiplayer races. Climb the global leaderboards, participate in seasonal events, and showcase your skills in thrilling online competitions.' },
]
</script>
<template>
    <div>
        <!-- <v-lazy> -->
        <transition name="fade" mode="out-in">
            <v-img id="features" src="/features.webp" cover
                class="features md:w-9/12 mx-auto md:p-20 p-5 mt-10 rounded-xl bg-opacity-80 backdrop-brightness-75 shadow-lg shadow-[#ff0050] bg-red-800"
                gradient="to top, rgba(0, 0, 0, 0.5), rgba(255, 0, 80, 0)),linear-gradient(to top, rgba(255, 0, 80, 0.9), rgba(0, 0, 0, 0.4)),linear-gradient(to top, rgba(255, 0, 80, 0.5), rgba(0, 0, 0, 0.4)">
                <div class="md:text-3xl text-2xl font-medium flex">
                    <v-icon class="mx-3 my-auto" size="35">mdi-gamepad-circle</v-icon>
                    <h1 class="my-auto font-semibold"> Key Features</h1>
                </div>
                <ul v-for="(item, index) in features" :key="index"
                    class="mt-5 space-y-5 md:text-xl text-md list-[square] p-3 ml-10">
                    <li>
                        <p class="font-semibold inline-block">{{ item.title }}</p> {{ item.text }}
                    </li>

                </ul>
            </v-img>
        </transition>
        <!-- </v-lazy> -->
    </div>
</template>