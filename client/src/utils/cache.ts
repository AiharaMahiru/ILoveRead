import { openDB } from 'idb';

const DB_NAME = 'iloveread-db';
const STORE_NAME = 'books-cache';

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
};

export const cacheBook = async (id: string, blob: Blob) => {
  const db = await initDB();
  await db.put(STORE_NAME, blob, id);
};

export const getCachedBook = async (id: string): Promise<Blob | undefined> => {
  const db = await initDB();
  return db.get(STORE_NAME, id);
};
