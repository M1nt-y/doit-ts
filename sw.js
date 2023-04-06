/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-6e567876'], (function (workbox) { 'use strict';

  self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "assets/DefaultLayout-8699c9c7.css",
    "revision": null
  }, {
    "url": "assets/DefaultLayout-aa423701.js",
    "revision": null
  }, {
    "url": "assets/HomePage-05a8adc7.js",
    "revision": null
  }, {
    "url": "assets/HomePage-22a6aa47.css",
    "revision": null
  }, {
    "url": "assets/index-303894b1.css",
    "revision": null
  }, {
    "url": "assets/index-e2ff03e3.js",
    "revision": null
  }, {
    "url": "assets/LoginLayout-aff4b0b2.css",
    "revision": null
  }, {
    "url": "assets/LoginLayout-f1f2200f.js",
    "revision": null
  }, {
    "url": "assets/LoginPage-3a97d57b.js",
    "revision": null
  }, {
    "url": "assets/workbox-window.prod.es5-dc90f814.js",
    "revision": null
  }, {
    "url": "index.html",
    "revision": "cb9173473e4f7a2e7a1c5db4d2e8af9b"
  }, {
    "url": "favicon.ico",
    "revision": "4709275a378d0def4add561065bb3ffc"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "adea1fe1f7d974dd35708bd7d0ee167b"
  }, {
    "url": "android-chrome-192x192.png",
    "revision": "dacc920ef9ab593b713e4904b1a09d98"
  }, {
    "url": "android-chrome-512x512.png",
    "revision": "c36b99a26a231afd1afe69a05605469b"
  }, {
    "url": "manifest.webmanifest",
    "revision": "d31214b461beddc518a979fe5597287a"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
