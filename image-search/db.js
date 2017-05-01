const mongo = require('mongodb').MongoClient;

const COLLECTION_NAME = 'imagesearchRequests';

const saveSearch = search => new Promise((resolve, reject) =>
  mongo.connect(process.env.MONGOLAB_URI)
    .then(db => {
      const document = {
        search: search,
        timestamp: new Date(),
      };
      db.collection(COLLECTION_NAME)
        .insertOne(document)
        .then(() => {
            db.close();
            resolve();
          }
        )
    })
    .catch(reject)
);

const getSearches = () => new Promise((resolve, reject) => {
  mongo.connect(process.env.MONGOLAB_URI)
    .then(db => {
      db.collection(COLLECTION_NAME)
        .find({}, { limit: 20 }).toArray((err, docs) => {
          if (err) reject(err);
          db.close();
          resolve(docs.reverse());
        });
    })
    .catch(err => reject(err));
});

module.exports = {
  saveSearch,
  getSearches,
};