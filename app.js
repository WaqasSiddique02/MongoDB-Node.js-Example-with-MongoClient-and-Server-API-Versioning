const { MongoClient, ServerApiVersion } = require("mongodb");

// Replace the placeholder with your Atlas connection string
const uri = "mongodb://localhost:27017";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);

async function run() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();

        // Send a ping to confirm a successful connection
        await client.db("fruitDB").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");


        const myDB = client.db("fruitDB");
        const myColl = myDB.collection("fruits");
        const docs = [
            { name: "Apple", score: 8, review: "Very good fruit" },
            { name: "Banana", score: 6, review: "nice fruit" },
            { name: "Peach", score: 9, review: "Excellent" }
        ];
        // const insertManyresult = await myColl.insertMany(docs);
        // let ids = insertManyresult.insertedIds;
        // console.log(`${insertManyresult.insertedCount} documents were inserted.`);
        // for (let id of Object.values(ids)) {
        //     console.log(`Inserted a document with id ${id}`);
        // }
        const findResult = myColl.find({});
        for await (const doc of findResult) {
            console.log(doc);
          }

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);

