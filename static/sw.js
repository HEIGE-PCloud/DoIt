const CACHE_VERSION = 'v1';
const CACHE_NAME = `doit-${CACHE_VERSION}`;

// 需要缓存的资源
const CACHED_ASSETS = [
    '/',
    '/css/main.css',
    '/js/main.js',
    '/images/logo.png',
    // 添加其他需要缓存的资源
];

// Service Worker 安装
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(CACHED_ASSETS);
            })
            .then(() => {
                return self.skipWaiting();
            })
    );
});

// Service Worker 激活
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((cacheName) => {
                            return cacheName.startsWith('doit-') && cacheName !== CACHE_NAME;
                        })
                        .map((cacheName) => {
                            return caches.delete(cacheName);
                        })
                );
            })
            .then(() => {
                return self.clients.claim();
            })
    );
});

// 处理请求
self.addEventListener('fetch', (event) => {
    // 跳过不支持缓存的请求
    if (!event.request.url.startsWith('http')) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }

                // 克隆请求，因为请求只能使用一次
                const fetchRequest = event.request.clone();

                return fetch(fetchRequest)
                    .then((response) => {
                        // 检查是否得到有效的响应
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // 克隆响应，因为响应只能使用一次
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    });
            })
    );
});
