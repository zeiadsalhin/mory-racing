<script setup>
const checkbox = ref(false)
</script>
<template>
    <!-- <v-container> -->
    <v-checkbox v-model="checkbox">
        <template v-slot:label>
            <div class="text-xs flex">
                <p class="my-auto"> I agree to</p>
                <!-- <v-tooltip location="bottom">
                    <template v-slot:activator="{ props }">
                        <a href="https://vuetifyjs.com" target="_blank" v-bind="props" @click.stop class="underline">
                            Terms And Conditions
                        </a>
                    </template>
Opens in new window
</v-tooltip> -->

                <TermsofservicesDialog v-bind="props" @click.stop />

            </div>
        </template>
    </v-checkbox>
    <!-- </v-container> -->
</template>