// res/js/storage.js
const DB_NAME = "clickerHeroesDB";
const STORE   = "games";
const VERSION = 1;

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, VERSION);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE, { keyPath: "id" });
    req.onsuccess = () => resolve(req.result);
    req.onerror   = () => reject(req.error);
  });
}

export async function save(id, data) {
  const db = await openDB();
  return new Promise((res, rej) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put({ id, data, savedAt: Date.now() });
    tx.oncomplete = () => res();
    tx.onerror    = () => rej(tx.error);
  });
}

export async function load(id) {
  const db = await openDB();
  return new Promise((res, rej) => {
    const req = db.transaction(STORE).objectStore(STORE).get(id);
    req.onsuccess = () => res(req.result ? req.result.data : null);
    req.onerror   = () => rej(req.error);
  });
}