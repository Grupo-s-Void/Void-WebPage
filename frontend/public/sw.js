/* VOID — service worker.
   - Páginas: rede primeiro (conteúdo sempre atualizado), cache como reserva offline.
   - Arquivos (JS, CSS, imagens, fontes): entrega do cache na hora e atualiza em segundo plano.
   Caminhos relativos ao próprio sw.js, então funciona em qualquer base (/ ou /Void-WebPage/). */

const VERSAO = "void-v1";
const BASE = new URL("./", self.location).href;
const ESSENCIAIS = [BASE, `${BASE}manifest.webmanifest`, `${BASE}icons/icon-192.png`];
const FONTES = ["https://fonts.googleapis.com", "https://fonts.gstatic.com"];

self.addEventListener("install", (evento) => {
  evento.waitUntil(caches.open(VERSAO).then((cache) => cache.addAll(ESSENCIAIS)));
  self.skipWaiting();
});

self.addEventListener("activate", (evento) => {
  evento.waitUntil(
    caches
      .keys()
      .then((nomes) => Promise.all(nomes.filter((n) => n !== VERSAO).map((n) => caches.delete(n))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (evento) => {
  const { request } = evento;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  const mesmaOrigem = url.origin === self.location.origin && url.href.startsWith(BASE);
  if (!mesmaOrigem && !FONTES.includes(url.origin)) return;

  if (request.mode === "navigate") {
    evento.respondWith(
      fetch(request)
        .then((resposta) => {
          const copia = resposta.clone();
          caches.open(VERSAO).then((cache) => cache.put(BASE, copia));
          return resposta;
        })
        .catch(() => caches.match(BASE)),
    );
    return;
  }

  evento.respondWith(
    caches.open(VERSAO).then(async (cache) => {
      const emCache = await cache.match(request);
      const daRede = fetch(request)
        .then((resposta) => {
          if (resposta.ok || resposta.type === "opaque") cache.put(request, resposta.clone());
          return resposta;
        })
        .catch(() => emCache);
      return emCache || daRede;
    }),
  );
});
