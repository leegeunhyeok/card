const VERSION = 'v1'
const CACHE_NAME = 'cache_' + VERSION

const CACHE_LIST = [
  '/favicon.ico',
  '/favicon-32x32.png',
  '/manifest.json'
]

self.addEventListener('install', event => {
  console.log('Service Worker - install', VERSION)
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(CACHE_LIST)
    })
  )
})

self.addEventListener('activate', event => {
  console.log('Service Worker - activate', VERSION)
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== CACHE_NAME) {
          return caches.delete(key)
        }
      }))
    })
  )
})

self.addEventListener('fetch', event => {
  console.log('Service Worker - fetch', event.request.url)

  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return fetch(event.request)
        .then(networkResponse => {
          cache.put(event.request, networkResponse.clone())
          return networkResponse
        })
    })
  )
})
