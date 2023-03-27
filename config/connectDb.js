const mongoose = require("mongoose");
const colors = require("colors");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Server is running at database on ${mongoose.connection.host}`.bgWhite
        .green.green
    );
  } catch (error) {
    console.log(`${error}`.bgRed);
  }
};

module.exports = connectDb;
