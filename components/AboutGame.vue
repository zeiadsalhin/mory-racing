<script setup>

</script>
<template>
    <div id="about" class="about mt-1 bg-surface  w-full md:p-10 md:flex rounded-sm">
        <div class="aboutme md:w-2/3 md:p-10 p-5">
            <div class="md:text-3xl text-2xl font-medium flex">
                <v-icon class="mx-3 my-auto" size="35">mdi-information-slab-box-outline</v-icon><h1 class="my-auto"> About the Game</h1>
            </div>
            <p class="px-14 py-3 md:w-3/4 brightness-75 md:text-lg text-md mt-5 leading-snug ">Mory plays the game, Mory made the game, Mody fixed the game, etc... etc... Mory plays the game, Mory made the game, Mody fixed the game, etc... etc... Mory plays the game, Mory made the game, Mody fixed the game, etc... etc...
            </p><p class="px-14 py-3 md:w-3/4 brightness-75  md:text-lg text-md mt-1 leading-snug ">Mory plays the game, Mory made the game, Mody fixed the game, etc... etc...
            </p>
        </div>
        <div class="skills md:p-10 p-6">
            <div class="md:text-2xl text-xl font-medium flex">
                <v-icon class="mx-3 my-auto" size="30">mdi-copyright</v-icon><h1 class="my-auto"> Credits</h1>
            </div>
            <ul class="mt-5 space-y-5 md:text-xl text-md list-[square] p-3 ml-10">
                <li class="flex"><v-avatar size="30"><v-img alt="Mory" src="/b.webp"></v-img></v-avatar><p class="ml-3 my-auto">Mory</p><div class="w-5 h-0.5 bg-zinc-800 my-auto ml-4 mr-1"></div><p class="text-sm my-auto brightness-75">Mory Racing game developer</p></li>
                <li class="flex"><v-avatar size="30"><v-img alt="Mory" src="/b.webp"></v-img></v-avatar><p class="ml-3 my-auto">Alfa</p><div class="w-5 h-0.5 bg-zinc-800 my-auto ml-4 mr-1"></div><p class="text-sm my-auto brightness-75">Mory Racing web developer</p></li>
                <!-- <li>Project Management</li> -->
            </ul>
        </div>
    </div>
</template>