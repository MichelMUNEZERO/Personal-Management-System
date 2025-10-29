import { openDB } from "idb";

const DB_NAME = "personalManagementSystem";
const DB_VERSION = 1;

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    // Create stores
    if (!db.objectStoreNames.contains("tasks")) {
      db.createObjectStore("tasks", { keyPath: "id" });
    }
    if (!db.objectStoreNames.contains("goals")) {
      db.createObjectStore("goals", { keyPath: "id" });
    }
    if (!db.objectStoreNames.contains("notes")) {
      db.createObjectStore("notes", { keyPath: "id" });
    }
    if (!db.objectStoreNames.contains("syncQueue")) {
      db.createObjectStore("syncQueue", { keyPath: "id", autoIncrement: true });
    }
  },
});

export async function getAllItems(storeName) {
  const db = await dbPromise;
  return db.getAll(storeName);
}

export async function addItem(storeName, item) {
  const db = await dbPromise;
  const tx = db.transaction(storeName, "readwrite");
  await tx.store.add(item);
  await addToSyncQueue({ type: "add", store: storeName, data: item });
  return item;
}

export async function updateItem(storeName, item) {
  const db = await dbPromise;
  const tx = db.transaction(storeName, "readwrite");
  await tx.store.put(item);
  await addToSyncQueue({ type: "update", store: storeName, data: item });
  return item;
}

export async function deleteItem(storeName, id) {
  const db = await dbPromise;
  const tx = db.transaction(storeName, "readwrite");
  await tx.store.delete(id);
  await addToSyncQueue({ type: "delete", store: storeName, id });
}

async function addToSyncQueue(operation) {
  const db = await dbPromise;
  const tx = db.transaction("syncQueue", "readwrite");
  await tx.store.add({ ...operation, timestamp: Date.now() });
}

export async function processSyncQueue() {
  const db = await dbPromise;
  const queue = await db.getAll("syncQueue");

  for (const item of queue) {
    try {
      // Implement API calls here when online
      await db.delete("syncQueue", item.id);
    } catch (error) {
      console.error("Sync failed for item:", item, error);
    }
  }
}
