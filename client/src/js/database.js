import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


export const putDb = async (content) => { // CREATE
  const jateDb = await openDB('jate', 1); // connect to 'jate' database
  const tx = jateDb.transaction('jate', 'readwrite'); // create readwrite transaction in 'jate' database
  const store = tx.objectStore('jate'); // connect to 'jate' object store
  const result = await store.add( // store content
    { content: content }
  );
  console.log('data saved to the database', result); // confirmation
};

export const getDb = async () => { // READ
  const jateDb = await openDB('jate', 1) // connect to 'jate' database
  const tx = jateDb.transaction('jate', 'readonly'); // create 'readeonly transaction in the 'jate' database
  const store = tx.objectStore('jate'); // connect to 'jate' object store
  const result = await store.getAll(); // get all contents in the database
  console.log('data saved to the database', result); // confirmation
};

initdb();
