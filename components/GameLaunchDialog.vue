<script setup>

</script>
<template>
    <div>
        <!--dialog-->
        <v-dialog close-delay="0" :opacity="0" transition="dialog-bottom-transition" width="auto"
            class="bg-zinc-950 bg-opacity-80 backdrop-blur-sm">
            <template v-slot:activator="{ props: activatorProps }">

                <v-btn v-bind="activatorProps" color="red" variant="outlined" class="text-h6 m-2">Try the game</v-btn>
            </template>

            <template v-slot:default="{ isActive }">

                <iframe src="https://moryracing.netlify.app" width="auto" height="2000" frameborder="0"></iframe>




                <v-btn text="Close" @click="isActive.value = false"></v-btn>


            </template>
        </v-dialog>
    </div>
</template>