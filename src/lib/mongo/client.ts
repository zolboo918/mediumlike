// import { MongoClient } from "mongodb";

// const URI = process.env.DATABASE_URL;
// const options = {};

// if (!URI) throw new Error(".env");

// let client = new MongoClient(URI, options);

// let clientPromise: any;

// if (process.env.NODE_ENV !== "production") {
//   if (!global._manageClientPromise) {
//     global._manageClientPromise = client.connect();
//   }

//   clientPromise = global._manageClientPromise;
// } else {
//   clientPromise = client.connect();
// }

// export default clientPromise;
