<template>
    <div v-if="consent.statistic">
        <p>This is only visible if the "statistic" category has been approved.</p>
    </div>

    <div v-if="allowedStatisticsAndMarketing">
        <p>This is only visible if the "statistic" and "marketing" categories has been approved.</p>
    </div>
</template>

<script setup lang="ts">
const { state } = useCookieConsent()

// Using the composable in your script
const allowedStatisticsAndMarketing = computed(() => {
    return state.value.statistic && state.value.marketing
})
</script>