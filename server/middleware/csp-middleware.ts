// server/middleware/csp-middleware.ts
import { defineEventHandler } from 'h3';

export default defineEventHandler((event) => {
  const nonce = event.context.nonce; // Ensure nonce is provided correctly

  event.res.setHeader('Content-Security-Policy', `
    script-src 'self' https: 'nonce-${nonce}' 'unsafe-inline' 'strict-dynamic';
    style-src 'self' https: 'unsafe-inline';
    base-uri 'none';
    img-src 'self' data: https://mory-racing.netlify.app/ , https://static-cdn.jtvnw.net , https://apis.google.com;
    font-src 'self' https: data:;
    script-src-attr 'unsafe-inline';
    upgrade-insecure-requests;
  `);
});
