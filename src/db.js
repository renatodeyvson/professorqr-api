'use strict';

module.exports = (MongoClient) => {
    
    const url = 'mongodb://localhost:27017';
    const dbName = 'professorqrdb';
    const client = new MongoClient(url, { useNewUrlParser: true });

    client.connect((err) => {
        console.log('[db] on %s', url);

        const db = client.db(dbName);

        client.close();
    });

};