var staticCache = 'transport-cache-v1';
var urlsToCache = [
	'/transportinator',
	'/app/transport/routes.html',
	'/app/transport/routeInfo.html',
	'/css/vendor/bootstrap.min.css',
	'/css/transportinator.min.css',
	'/css/fonts/glyphicons-halflings-regular.woff2',
	'/js/vendor/allVendors.js',
	'/app/transportinator.min.js'
];
var allCaches = [
	staticCache
];

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(staticCache).then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.filter(function(cacheName) {
					return cacheName.startsWith('transport-') && !allCaches.includes(cacheName);
				}).map(function(cacheName) {
					return caches.delete(cacheName);
				})
			);
		})
	);
});

self.addEventListener('fetch', function(event) {
	var requestUrl = new URL(event.request.url);

	if(requestUrl.origin === location.origin) {
		if(urlsToCache.includes(requestUrl.pathname)) {
			event.respondWith(caches.match(requestUrl.pathname));
			return;
		}
	}

	event.respondWith(
		caches.match(event.request).then(function(response) {
			return response || fetch(event.request);
		})
  );
});