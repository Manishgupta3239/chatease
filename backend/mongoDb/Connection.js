import mongoose from "mongoose";

const ConnectionDb = async () => {
  try {
    const connect = await mongoose.connect(`${process.env.MONGO_URI}`);

    if (connect) {
      console.log("Connected To Database");
      console.log("Database Name:", connect.connection.name);
      console.log("Connection State:", connect.connection.readyState);
    }
  } catch (error) {
    console.log("Error in Connecting To Database", error.message);
  }
};

export default ConnectionDb;
