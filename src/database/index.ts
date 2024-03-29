import mongoose from "mongoose";
import debugCreator from "debug";
import chalk from "chalk";

const debug = debugCreator("database: index");

/* istanbul ignore next */

export const connectToDatabase = async (mongoUrl: string) => {
  try {
    await mongoose.connect(mongoUrl);
    mongoose.set("debug", true);
    if (process.env.IS_STREAMING) {
      debug(chalk.yellowBright("Streaming mode enabled"));
      debug(chalk(`Succesfully connected to Database`));
    } else {
      debug(chalk(`Succesfully connected to ${mongoUrl}`));
    }
  } catch (error) {
    debug(chalk(`Error connecting to database: ${error}`));
  }
};
