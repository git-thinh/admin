// [Working example](/serviceworker-cookbook/json-cache/).

var CACHE_NAME = 'dependencies-cache';

self.addEventListener('install', function (event) {
    // Perform the install step:
    // * Load a JSON file from server
    // * Parse as JSON
    // * Add files to the cache list

    // Message to simply show the lifecycle flow
    console.log('[install] Kicking off service worker registration!');

    event.waitUntil(function () { 

        caches.open(CACHE_NAME)
            .then(function (cache) {
                // With the cache opened, load a JSON file containing an array of files to be cached
                return fetch('cache.json').then(function (response) {
                    // Once the contents are loaded, convert the raw text to a JavaScript object
                    return response.json();
                }).then(function (files) {
                    // Use cache.addAll just as you would a hardcoded array of items
                    console.log('[install] Adding files from JSON file: ', files);
                    return cache.addAll(files);
                });
            })
            .then(function () {
                // Message to simply show the lifecycle flow
                console.log(
                    '[install] All required resources have been cached;',
                    'the Service Worker was successfully installed!'
                );

                // Force activation
                return self.skipWaiting();
            })
    }
    );
});

self.addEventListener('fetch', function (event) {
    var url = event.request.url;
    console.log('[fetch] = ' + url);

    if (url.includes('/#') || url.endsWith('localhost/')) {
        var data = '<!DOCTYPE html><html><head><title></title><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />'+
                    '<script src="app.js"></script></head><body></body></html>';
        var resBuilder = new Response(data, {
            headers: {
                // As the zip says nothing about the nature of the file, we extract
                // this information from the file name.
                'Content-Type': 'text/html'
            }
        });
        return resBuilder;
    } else {
        event.respondWith(
            caches.match(event.request)
                .then(function (response) {
                    // Cache hit - return the response from the cached version
                    if (response) {
                        console.log('[fetch] Returning from Service Worker cache: ', event.request.url);
                        return response;
                    }

                    // Not in cache - return the result from the live server
                    // `fetch` is essentially a "fallback"
                    //console.log('[fetch] Returning from server: ', event.request.url);
                    //return fetch(event.request);
                })
        );
    }
});

self.addEventListener('activate', function (event) {
    // Message to simply show the lifecycle flow
    console.log('[activate] Activating service worker!');

    // Claim the service work for this client, forcing `controllerchange` event
    console.log('[activate] Claiming this service worker!');
    //event.waitUntil(self.clients.claim());

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
  );

});


var contentTypesByExtension = {
    'css': 'text/css',
    'js': 'application/javascript',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'html': 'text/html',
    'htm': 'text/html'
};

// Return the content type of a file based on the name extension
function getContentType(filename) {
    var tokens = filename.split('.');
    var extension = tokens[tokens.length - 1];
    return contentTypesByExtension[extension] || 'text/plain';
}
