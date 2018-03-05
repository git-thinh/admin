var _CACHE_STORE = 'CACHE_STORE';
var _CACHE_FILE = 'cache.json';

function init_Page() {
    // We switch between production and testing environments by checking the hash of the URL.
    window.onhashchange = function () {
        var newHash = window.location.hash.substr(1) || 'admin';
        var currentHash = localStorage['module_code'];
        console.log(newHash, currentHash);
        if (newHash != currentHash) {
            localStorage['module_code'] = newHash;
            //window.location.reload();
        }
    };

    // Force the initial check.
    window.onhashchange();
}

function init_Worker() {
    // Once the Service Worker is activated, init()
    if ('serviceWorker' in navigator) {

        navigator.serviceWorker.getRegistration().then(function (registration) {
            if (!registration) {

                navigator.serviceWorker.register('worker.js', { scope: '.' });
                navigator.serviceWorker.ready.then(function () {
                    init_Page();
                });

                return;
            }

            //registration.unregister().then(function () {
            //    console.log('The application has been uninstalled service worker');
            //    setTimeout(function () { location.reload(); }, 500);
            //}).catch(function (error) {
            //    console.log('Error while uninstalling the service worker:');
            //    console.log(error.message);
            //});
        });

        //if (navigator.serviceWorker.controller) {
        //    init();
        //} else {
        //    navigator.serviceWorker.register('worker.js', { scope: '.' });
        //    navigator.serviceWorker.ready.then(function () {
        //        init();
        //    });
        //}
    }
}

if ('caches' in window) {
    // Clean cache store space
    caches.keys().then(function (names) {
        if (names.length > 0) {
            for (let name of names) {
                console.log('[INDEX.JS] Clean cache store: ' + name);
                caches.delete(name);
            }
            window.location.reload();
        }
    });

    //caches.open(_CACHE_STORE).then(function (cache) {
    //    console.log('[INDEX.JS] Set cache file: /index.html');
    //    cache.add('/index.html');
    //});
    
    // Set cache again via file cache.json
    caches.open(_CACHE_STORE)
        .then(function (cache) {
            // With the cache opened, load a JSON file containing an array of files to be cached
            return fetch(_CACHE_FILE).then(function (response) {
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
            //return self.skipWaiting();
            init_Worker();
        });;
} // end cache
