require("dotenv").config();
const mongoose = require("mongoose");
const chalk = require("chalk");

const mongoConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log(chalk.blueBright("MongoDB is UP !"));
  } catch (error) {
    console.error(chalk.red.bold(error));
    process.exit(1);
  }
};

module.exports = mongoConnection;
