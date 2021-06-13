self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("GameCounter").then(cache => {
            return cache.addAll(["./", "./app.js", "./style.css"]);
        })
    );
});

self.addEventListener("fetch", e => {
    console.log(`Intesepting fet req for: ${e.request.url}`);

    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );

});