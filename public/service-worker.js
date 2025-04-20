
// Minimal service worker required for Razorpay Checkout with Sessions

// Install service worker
self.addEventListener('install', (event) => {
  console.log('Service worker installed');
  // Skip waiting forces the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Activate service worker
self.addEventListener('activate', (event) => {
  console.log('Service worker activated');
  // Claim clients forces the service worker to be used for all clients
  event.waitUntil(self.clients.claim());
});

// Fetch event listener (required for service worker functionality)
self.addEventListener('fetch', (event) => {
  // For now, we'll just let the browser handle the request normally
  // This is the most minimal implementation
});
