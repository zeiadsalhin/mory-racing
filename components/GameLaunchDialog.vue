<script setup>

const gameServer = ref('https://moryracing.netlify.app')
</script>
<template>
    <div>
        <!--dialog-->
        <v-dialog close-delay="0" :opacity="0" transition="dialog-bottom-transition" width="auto"
            class="bg-zinc-950 bg-opacity-80 backdrop-blur-sm">
            <template v-slot:activator="{ props: activatorProps }">

               <div class="flex justify-center p-5"> <v-btn v-bind="activatorProps" color="red" variant="outlined" class="text-h6 m-2">Try the game</v-btn></div>
            </template>

            <template v-slot:default="{ isActive }">

                <iframe :src="gameServer" class="h-screen" width="auto" height="100%" frameborder="0"></iframe>




                <v-btn text="Close" @click="isActive.value = false"></v-btn>


            </template>
        </v-dialog>
    </div>
</template>