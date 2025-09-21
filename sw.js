const CACHE_NAME = 'habit-tracker-v2';
const urlsToCache = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './manifest.json',
  './firebase-config.js',
  './sync-optional.js',
  './sync-manager.js',
  './firebase-test.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('キャッシュを更新中...');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('キャッシュ更新完了');
        return self.skipWaiting();
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('古いキャッシュを削除:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('サービスワーカーがアクティブになりました');
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Firebase関連のリクエストはキャッシュをスキップ
  if (event.request.url.includes('firestore.googleapis.com') || 
      event.request.url.includes('firebase.googleapis.com') ||
      event.request.url.includes('googleapis.com')) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // キャッシュがある場合はキャッシュを返す
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});