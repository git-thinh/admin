// [Working example](/serviceworker-cookbook/json-cache/).

var CACHE_NAME = 'dependencies-cache';

self.addEventListener('install', function (event) {
    // Message to simply show the lifecycle flow
    console.log('[WORKER-INSTALL] Kicking off service worker registration!');

    event.waitUntil(self.skipWaiting()); 
});

self.addEventListener('fetch', function (event) {
    var url = event.request.url;

    if (url.includes('/#')) {
        console.log('[WORKER-FETCH] get online: ', event.request.url);
        var init = {
            method: 'GET',
            cache: 'default'
        };
        var url_module = url.split('/#').join('/module/') + '.html';
        console.log('[WORKER-FETCH] get module: ', url_module);
        event.respondWith(fetch(url_module, init));
    } else {
        event.respondWith(
            caches.match(event.request)
                .then(function (response) {
                    // Cache hit - return the response from the cached version
                    if (response) {
                        console.log('[WORKER-FETCH] get cache: ', event.request.url);
                        return response;
                    }

                    // Not in cache - return the result from the live server
                    // `fetch` is essentially a "fallback"
                    console.log('[WORKER-FETCH] get online: ', event.request.url);
                    return fetch(event.request);
                })
        );
    }
});

self.addEventListener('activate', function (event) {
    // Message to simply show the lifecycle flow
    console.log('[WORKER-ACTIVATE] Activating service worker!');

    // Claim the service work for this client, forcing `controllerchange` event
    //console.log('[WORKER-ACTIVATE] Claiming this service worker!');
    //event.waitUntil(self.clients.claim());

    console.log('[WORKER-ACTIVATE] Delete outdated caches');
    // Use this to delete outdated caches
    event.waitUntil(caches.keys().then(function (cacheNames) {
        return Promise.all(
          cacheNames.filter(function (cacheName) {
              // Return true if you want to remove this cache,
              // but remember that caches are shared across
              // the whole origin
          }).map(function (cacheName) {
              console.log('[activate] Clean cache file: ' + cacheName);
              return caches.delete(cacheName);
          })
        );
    })
  );// end event
});

