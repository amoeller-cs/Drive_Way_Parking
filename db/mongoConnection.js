const { MongoClient } = require("mongodb");

const mongo = () => {
  const uri = process.env.MONGO_URL || "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  return client;
};

module.exports = {
  getData: async (databaseName, collection, query) => { // interesting to pass the db name. never thought about this but would be very useful if dealing
    console.log(query);                                 // with multiple dbs in a large project. also great way to handle query processing outside of the
    const client = mongo();                             // db file, I would like to try doing this in my own project.
    await client.connect();
    const database = client.db(databaseName);
    const collections = database.collection(collection);
    const data = await collections.find(query).toArray();
    client.close();
    return data;
  },

  insertData: async (databaseName, collection, insertingOBJ) => {
    const client = mongo();
    await client.connect();
    const database = client.db(databaseName);
    const collections = database.collection(collection);
    try {
      await collections.insertOne(insertingOBJ);
    } catch (e) {
      console.log(e);
    } finally {
      client.close();
    }
  },

  deleteData: async (databaseName, collection, queryToDelete) => {
    const client = mongo();
    await client.connect();
    const database = client.db(databaseName);
    const collections = database.collection(collection);

    try {
      await collections.deleteOne(queryToDelete);
    } catch (e) {
      console.log(e);
    } finally {
      client.close();
    }
  },
};
