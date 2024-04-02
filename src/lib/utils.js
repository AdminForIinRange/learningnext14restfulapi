const mongoose = require("mongoose");

const connection = {};

export const connectToDb = async () => {
  try {
    if (connection.isConnected) {
      console.log("using an existing connection");
      return;
    }

    const db = await mongoose.connect(process.env.MONGO_URI);
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to connect to MongoDB:  `" + error + "`");
  }
};
