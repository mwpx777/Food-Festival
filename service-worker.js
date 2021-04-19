const FILES_TO_CACHE = [
    "./index.html",
    "./events.html",
    "./tickets.html",
    "./schedule.html",
    "./assets/css/style.css",
    "./assets/css/bootstrap.css",
    "./assets/css/tickets.css",
    "./dist/app.bundle.js",
    "./dist/events.bundle.js",
    "./dist/tickets.bundle.js",
    "./dist/schedule.bundle.js"
];
const APP_PREFIX = "FoodFest-";
const VERSION = "version_01";
const CACHE_NAME = APP_PREFIX + VERSION;

self.addEventListener('install', function (e) {
    // this is method telling browser to wait until this method is finished executing
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('installing cache : ' + CACHE_NAME)
            // this will add all files in FILES TO CACHE array to the cache
            return cache.addAll(FILES_TO_CACHE)
        })
    )
})

// clear out old data from cache and tell service worker how to manage caches
self.addEventListener('activate', function (e) {
    e.waitUntil(
        // keys() returns array of cached names named keyList
        // keyList is parameter that contains all cache names under <username>.github.io
        caches.keys().then(function (keyList) {
            // cacheKeepList is an array of caches with APP_PREFIX name
            let cacheKeepList = keyList.filter(function (key) {
                return key.indexOf(APP_PREFIX);
            });
            // add current cache to the keeplist
            cacheKeepList.push(CACHE_NAME);

            // this promise resolves once all old versions of the cache are deleted
            // function map() through keyList with arguments key and i
            return Promise.all(keyList.map(function (key, i) {
                // if item is not found in cacheKeepList
                if(cacheKeepList.indexOf(key) === -1){
                    console.log('deleting cache: ' + keyList[i]);
                    // if this item isn't found in keepList, delete from cache
                    return caches.delete(keyList[i]);
                }
            }));
        }))
});

// tells browser what to do with fetch requests
// passing in 2 arguments fetch and the function for the event
self.addEventListener('fetch', function (e){
    console.log('fetch request: ' + e.request.url)
    // this is method on the event object to intercept fetch requests
    e.respondWith(
        // match checks to see if request is already in cache, if it is will return that request with cached data
        caches.match(e.request).then(function (request) {
            if(request){
                console.log('responding with the cache: ' + e.request.url)
                return request;
            } else {
                // if file isn't stored in cache, will proceed with normal fetch request
                console.log('file is not cached, fetching: ' + e.request.url)
                return fetch(e.request)
            }
        })

    )
})