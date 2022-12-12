
// Cache static static asset
// let urlToAdd =[
//     './style.css',
//     './style2.css',
//     './myImg.png',
//     './index.html',
//     'script.js',
//     'script2.js',
// ]

  
// self.addEventListener("install",e=>{
//   e.waitUntil(
//     caches.open("static").then(cache=>{
//       return cache.addAll([urlToAdd]);
//     })
//   );
// });


// cache static asset
let urlToAdd =[
    './style.css',
    './style2.css',
    './myImg.png',
    './index.html',
    './script.js',
    './script2.js'
]


self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('SERVICE_WORKER')
            .then((cache)=>{
                console.log('cache openend');
                return cache.addAll(urlToAdd);
            })
            .catch(err => {
                console.log(err);
            })
    )
});


// Fetch events
self.addEventListener('fetch', (event)=>{
console.log('fetch event');
   
    if (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html')) {
        event.respondWith(
          fetch(event.request.url).catch(error => {
              // Return the offline page
              return caches.match('./offline.html');
          })
    );
  }
else{
    event.respondWith(
        caches.match(event.request)
        .then((response)=>{
            if(response) return response;

            return fetch(event.request);
        })
    )
}
});

self.addEventListener('activate', (event)=>{
    
    const whiteList =['SERVICE_WORKER','my-page'];
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
          return Promise.all(
            cacheNames.map(function(cacheName) {
              if (whiteList.indexOf(cacheName) === -1) {
                return caches.delete(cacheName);
              }
            })
          );
        })
    );
})
