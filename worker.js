var CACHE_NAME = 'dependencies-cache';

self.addEventListener('install', function (event) {
    // Message to simply show the lifecycle flow
    console.log('[WORKER-INSTALL] Kicking off service worker registration!');

    event.waitUntil(self.skipWaiting());
});

self.addEventListener('fetch', function (event) {
    var url_new = '';
    var url = event.request.url;
    var host = url.split('/')[2];
    console.log('[WORKER-FETCH-URL] = ' + url);

    if (url.endsWith(host + '/')) {
        url_new = url + 'module/admin.html';
        console.log('[WORKER-FETCH] get: ', url_new);
        debugger;
        event.respondWith(fetch(url_new, { method: 'GET', cache: 'default' }));
    }
    else if (url.includes('/#')) {
        console.log('[WORKER-FETCH] get online: ', url);
        var url_module = url.split('/#').join('/module/') + '.html';
        console.log('[WORKER-FETCH] get module: ', url_module);
        debugger;
        event.respondWith(fetch(url_module, { method: 'GET', cache: 'default' }));
    } else {
        event.respondWith(
            caches.match(event.request)
                .then(function (response) {
                    // Cache hit - return the response from the cached version
                    if (response) {
                        console.log('[WORKER-FETCH] get cache: ', event.request.url);
                        debugger;
                        return response;
                    }

                    // Not in cache - return the result from the live server
                    // `fetch` is essentially a "fallback"
                    console.log('[WORKER-FETCH] get online: ', event.request.url);
                    debugger;
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

