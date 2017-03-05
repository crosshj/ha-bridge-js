/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!********************************!*\
  !*** ./serviceworker/index.js ***!
  \********************************/
/***/ function(module, exports) {

	'use strict';
	
	// from https://gist.github.com/adactio/fbaa3a5952774553f5e7
	
	// Update 'version' if you need to refresh the cache
	var staticCacheName = 'static';
	var version = 'v1::';
	
	// Store core files in a cache (including a page to display when offline)
	function updateStaticCache() {
	    return caches.open(version + staticCacheName).then(function (cache) {
	        return cache.addAll(['https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css', 'https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css', 'https://fonts.googleapis.com/css?family=Open+Sans', 'https://fonts.gstatic.com/s/opensans/v13/cJZKeOuBrn4kERxqtaUH3VtXRa8TVwTICgirnJhmVJw.woff2', 'https://netdna.bootstrapcdn.com/font-awesome/4.0.3/fonts/fontawesome-webfont.woff?v=4.0.3', '/home', 'offline.html']);
	    });
	}
	
	self.addEventListener('install', function (event) {
	    event.waitUntil(updateStaticCache());
	});
	
	self.addEventListener('activate', function (event) {
	    event.waitUntil(caches.keys().then(function (keys) {
	        // Remove caches whose name is no longer valid
	        return Promise.all(keys.filter(function (key) {
	            return key.indexOf(version) !== 0;
	        }).map(function (key) {
	            return caches.delete(key);
	        }));
	    }));
	});
	
	self.addEventListener('fetch', function (event) {
	    var request = event.request;
	    // Always fetch non-GET requests from the network
	    if (request.method !== 'GET') {
	        event.respondWith(fetch(request).catch(function () {
	            return caches.match('offline.html');
	        }));
	        return;
	    }
	
	    // For HTML requests, try the network first, fall back to the cache, finally the offline page
	    if (request.headers.get('Accept').indexOf('text/html') !== -1) {
	        // Fix for Chrome bug: https://code.google.com/p/chromium/issues/detail?id=573937
	        if (request.mode != 'navigate') {
	            request = new Request(request.url, {
	                method: 'GET',
	                headers: request.headers,
	                mode: request.mode,
	                credentials: request.credentials,
	                redirect: request.redirect
	            });
	        }
	        event.respondWith(fetch(request).then(function (response) {
	            // Stash a copy of this page in the cache
	            var copy = response.clone();
	            caches.open(version + staticCacheName).then(function (cache) {
	                cache.put(request, copy);
	            });
	            return response;
	        }).catch(function () {
	            return caches.match(request).then(function (response) {
	                return response || caches.match('offline.html');
	            });
	        }));
	        return;
	    }
	
	    // For non-HTML requests, look in the cache first, fall back to the network
	    event.respondWith(caches.match(request).then(function (response) {
	        return response || fetch(request).catch(function () {
	            // If the request is for an image, show an offline placeholder
	            if (request.headers.get('Accept').indexOf('image') !== -1) {
	                return new Response('<svg width="400" height="300" role="img" aria-labelledby="offline-title" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><title id="offline-title">Offline</title><g fill="none" fill-rule="evenodd"><path fill="#D8D8D8" d="M0 0h400v300H0z"/><text fill="#9B9B9B" font-family="Helvetica Neue,Arial,Helvetica,sans-serif" font-size="72" font-weight="bold"><tspan x="93" y="172">offline</tspan></text></g></svg>', { headers: { 'Content-Type': 'image/svg+xml' } });
	            }
	        });
	    }));
	});

/***/ }
/******/ ]);
//# sourceMappingURL=sw.js.map