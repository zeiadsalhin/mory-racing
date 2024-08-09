<template>
  <div>
    <NuxtLayout>
      <v-app>
       <Loader />
        <Nav />
        <v-main>
          <NuxtPage />
        </v-main>
        <CookieControl :locale="currentLocale">
          <template #modal>
            <h2>Cookies</h2>
            <p>We use Cookies to collect performance report, please help us track the application stats, thank you.</p>
            <a href="https://chattokgaming.com/termsofservice" class="underline" target="_blank"
              rel="noopener noreferrer">Terms
              of service</a>
          </template>
          <template #bar></template>
        </CookieControl>
      </v-app>
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
const { locale, setLocale } = useI18n()
const currentLocale = computed(() => locale.value)
const {
  cookiesEnabled,
  cookiesEnabledIds,
  isConsentGiven,
  isModalActive,
  moduleOptions,
} = useCookieControl()

// example: react to a cookie being accepted
// watch(
//   () => cookiesEnabledIds.value,
//   (current, previous) => {
//     if (
//       !previous?.includes('google-analytics') &&
//       current?.includes('google-analytics')
//     ) {
//       // cookie with id `google-analytics` got added
//       window.location.reload() // placeholder for your custom change handler
//     }
//   },
//   { deep: true },
// )
</script>
