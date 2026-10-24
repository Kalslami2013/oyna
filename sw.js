// Oyna — يعمل دون إنترنت: يجلب أحدث نسخة حين يتوفر الاتصال، ويعود للنسخة المحفوظة حين ينقطع.
const VERSION='oyna-v8';
const SHELL=['./','./index.html','./manifest.webmanifest','./icon-180.png','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(SHELL)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith('oyna-')&&x!==VERSION).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(VERSION).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request).then(h=>h||caches.match('./index.html'))))});
