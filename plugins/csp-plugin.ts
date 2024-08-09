// plugins/csp-plugin.ts
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  const nonce = generateNonce();

  nuxtApp.provide('nonce', nonce);

  // Function to generate nonce
  function generateNonce() {
    return Buffer.from(Math.random().toString()).toString('base64').substr(0, 16);
  }

  // Dynamically add nonce to head
  nuxtApp.hook('app:head', (head) => {
    head.script.forEach(script => script.nonce = nonce);
    head.style.forEach(style => style.nonce = nonce);
  });
});
