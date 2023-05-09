
// On install, cache some stuff
self.addEventListener('install', function (event) {

	// Activate right away
	self.skipWaiting();

});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.url.indexOf("author-p") >= 0) {
    const newRequest = new Request(request, {
      headers: {
        "Authorization": "Bearer my-token"
      },
      mode: "cors"
    });
    event.respondWith(fetch(newRequest));
  }
});