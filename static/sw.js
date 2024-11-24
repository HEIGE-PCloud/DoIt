const CACHE_VERSION = 'v2';
const CACHE_NAME = `doit-${CACHE_VERSION}`;

// 配置不同资源的缓存策略
const CACHE_STRATEGIES = {
    static: {
        name: `${CACHE_NAME}-static`,
        maxAge: 30 * 24 * 60 * 60, // 30天
    },
    dynamic: {
        name: `${CACHE_NAME}-dynamic`,
        maxAge: 24 * 60 * 60, // 1天
    }
};

// 需要预缓存的静态资源
const PRECACHE_ASSETS = [
    '/',
    '/css/style.min.css',
    '/js/main.min.js',
    '/images/logo.png',
    '/manifest.json',
    '/icons/icon-192x192.png'
];

// 判断请求是否为静态资源
const isStaticAsset = (url) => {
    return url.match(/\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/);
};

// Service Worker 安装
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_STRATEGIES.static.name)
            .then((cache) => {
                return cache.addAll(PRECACHE_ASSETS);
            })
            .then(() => self.skipWaiting())
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
                            return cacheName.startsWith('doit-') && 
                                   ![CACHE_STRATEGIES.static.name, CACHE_STRATEGIES.dynamic.name].includes(cacheName);
                        })
                        .map((cacheName) => caches.delete(cacheName))
                );
            })
            .then(() => self.clients.claim())
    );
});

// 处理请求
self.addEventListener('fetch', (event) => {
    // 跳过不支持缓存的请求
    if (!event.request.url.startsWith('http')) return;

    const strategy = isStaticAsset(event.request.url) ? CACHE_STRATEGIES.static : CACHE_STRATEGIES.dynamic;

    event.respondWith(
        caches.open(strategy.name)
            .then((cache) => {
                return cache.match(event.request)
                    .then((cachedResponse) => {
                        // 检查缓存是否过期
                        if (cachedResponse) {
                            const cachedTime = new Date(cachedResponse.headers.get('date')).getTime();
                            if (Date.now() - cachedTime < strategy.maxAge * 1000) {
                                return cachedResponse;
                            }
                        }

                        return fetch(event.request.clone())
                            .then((response) => {
                                if (!response || response.status !== 200 || response.type !== 'basic') {
                                    return response;
                                }

                                const clonedResponse = response.clone();
                                cache.put(event.request, clonedResponse);
                                return response;
                            })
                            .catch(() => cachedResponse || Response.error());
                    });
            })
    );
});
