import mongoose from "mongoose";
import debugCreator from "debug";
import chalk from "chalk";

const debug = debugCreator("database:");

export const connectToDatabase = async (mongoUrl: string) => {
  try {
    await mongoose.connect(mongoUrl);
    mongoose.set("debug", true);
    debug(chalk(`Succesfully connected to ${mongoUrl}`));
  } catch (error) {
    debug(chalk(`Error connecting to database: ${error}`));
  }
};
