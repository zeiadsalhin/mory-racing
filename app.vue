<template>
  <div>
    <NuxtLayout>
      <v-app>
        <Loader />
        <Nav />
        <v-main>
          <NuxtPage />
        </v-main>
        <NuxtCookieConsentPolicy />
      </v-app>
    </NuxtLayout>
  </div>
</template>
