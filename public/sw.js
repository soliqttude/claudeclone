const CACHE_NAME = 'exodus-pwa-v1'
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json'
]

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS).catch(() => {
        // Continue installation even if some assets fail to cache
        return Promise.resolve()
      })
    })
  )
  self.skipWaiting()
})

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Fetch event — network first, fallback to cache
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return
  }

  // Skip API calls — don't cache them
  if (event.request.url.includes('/api/')) {
    return fetch(event.request)
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache successful responses
        if (response.ok) {
          const cacheCopy = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, cacheCopy)
          })
        }
        return response
      })
      .catch(() => {
        // Fallback to cache on network error
        return caches.match(event.request).then((response) => {
          return response || new Response('Offline - content unavailable', {
            status: 503,
            statusText: 'Service Unavailable'
          })
        })
      })
  )
})

// Handle messages from client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
