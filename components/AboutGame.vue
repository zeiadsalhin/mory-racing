<script setup>

</script>
<template>
    <div id="about" class="about bg-zinc-950 w-full rounded-sm">
        <v-lazy>
            <transition name="fade" mode="out-in">
                <v-img src="/racing_front.webp" cover height="auto" class="aboutme mx-auto md:p-40 p-5 m-1 rounded-sm"
                    gradient="to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.0)),linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.4)),linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)">
                    <div class="md:text-3xl text-2xl font-bold flex">
                        <v-icon class="mx-3 my-auto" size="35">mdi-information-slab-box-outline</v-icon>
                        <h1 class="my-auto"> About the Game</h1>
                    </div>
                    <p class="md:ml-14 ml-4 py-3 md:w-1/2 brightness-75 md:text-lg text-md mt-5 leading-snug ">Our Unity
                        car
                        racing game
                        combines the excitement of fast-paced racing with intuitive controls and challenging tracks.
                        Choose from
                        a variety of cars and compete across multiple game modes, including single-player campaigns,
                        multiplayer
                        showdowns, and timed challenges.
                    </p>
                    <p class="md:ml-14 ml-4 py-3 md:w-1/2 brightness-75  md:text-lg text-md mt-1 leading-snug ">Whether
                        you're a
                        seasoned racer or new to the genre, our Unity car racing game promises an exhilarating journey
                        through
                        the world of high-octane competition. With its stunning visuals, realistic physics, and engaging
                        gameplay, it's a must-play for anyone seeking the ultimate racing experience.
                    </p>
                </v-img>
            </transition>
        </v-lazy>
        <div class="2">
            <v-lazy>
                <transition name="fade" mode="out-in">
                    <v-img src="/credits.webp" cover height="auto" class="skills md:p-40 p-5"
                        gradient="to left, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.0)),linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)">
                        <div class="md:text-2xl  text-xl font-medium flex">
                            <v-icon class="mx-3 my-auto" size="30">mdi-copyright</v-icon>
                            <h1 class="my-auto"> Credits</h1>
                        </div>
                        <ul class="mt-5 space-y-5a md:text-2xl text-sm list-[square] p-3 ml-10">
                            <li class="flex mb-2"><v-avatar size="30"><v-img alt="Mory"
                                        src="/icon.ico"></v-img></v-avatar>
                                <p class="ml-3 my-auto">Mory</p>
                                <div class="w-5 h-0.5 bg-zinc-800 my-auto ml-4 mr-1"></div>
                                <p class="md:text-[1.2rem] my-auto brightness-75">Chattok game developer</p>
                            </li>
                            <p class="text-sm font-thin italic ml-5 mb-10 opacity-80">"Behind the scenes, our team has
                                meticulously
                                crafted every
                                aspect
                                of the
                                game to deliver a
                                seamless and immersive racing experience. Leveraging the power of Unity, we've
                                incorporated
                                advanced physics engines and cutting-edge visual effects to push the boundaries of
                                realism and
                                excitement."</p>
                            <li class="flex mb-2"><v-avatar size="30"><v-img alt="Mory"
                                        src="/b.webp"></v-img></v-avatar>
                                <p class="ml-3 my-auto">Alfa</p>
                                <div class="w-5 h-0.5 bg-zinc-800 my-auto ml-4 mr-1"></div>
                                <p class="md:text-[1.2rem] my-auto brightness-75">Chattok web developer</p>
                            </li>
                            <p class="text-sm font-thin italic ml-5 mb-10 opacity-80">"As web developers, we've
                                optimized our
                                Unity
                                games for performance and accessibility on the web. Leveraging WebGL for
                                rendering,
                                HTML5 for interface elements and latest progressive web technologies, we ensure smooth
                                gameplay
                                experiences
                                across various browsers and
                                devices."</p>
                            <li class="flex mb-2"><v-avatar size="30"><v-img alt="Mory"
                                        src="/icon.ico"></v-img></v-avatar>
                                <p class="ml-3 my-auto">Clinton Deig</p>
                                <div class="w-5 h-0.5 bg-zinc-800 my-auto ml-4 mr-1"></div>
                                <p class="md:text-[1.2rem] my-auto brightness-75">Chattok Owner</p>
                            </li>
                            <p class="text-sm font-thin italic ml-5 mb-10 opacity-80">"Our TikTok Live games thrives
                                thanks to the innovative spirit of its platform
                                team. Their dedication to fostering creativity and engaging experiences has set the
                                stage for thrilling competitions and endless fun. Here's to pushing the limits and
                                racing towards a brighter future!."</p>
                            <li class="flex mb-2"><v-avatar size="30"><v-img alt="Mory"
                                        src="/icon.ico"></v-img></v-avatar>
                                <p class="ml-3 my-auto">Jose</p>
                                <div class="w-5 h-0.5 bg-zinc-800 my-auto ml-4 mr-1"></div>
                                <p class="md:text-[1.2rem] my-auto brightness-75">Chattok Backdoor</p>
                            </li>
                            <p class="text-sm font-thin italic ml-5 mb-10 opacity-80">"Behind every smooth race and
                                seamless
                                experience in our TikTok Live games is the
                                expertise of our backend developer. My dedication to crafting robust systems and
                                optimizing performance ensures that every race runs like clockwork. A heartfelt thanks
                                to the tech mastermind making it all possible!"</p>
                            <!-- <li>Project Management</li> -->
                        </ul>
                    </v-img>
                </transition>
            </v-lazy>
        </div>
    </div>
</template>