import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, {
  Model,
  type Query,
  model,
  Mongoose,
  Document,
} from "mongoose";
import { connectToDatabase } from "../../../../../database";
import Burger from "../../model/Burger";
import BurgerMongooseRepository from "./BurgerMongooseRepository";
import CustomError from "../../../../../server/CustomError/CustomError";
import {
  classicBurgerMock,
  cheeseBurgerMock,
} from "../../../../../mocks/Burger/BurgerMocks";
import { query } from "express";
import { type BurgerRepositoryOptions } from "./types";

beforeEach(() => {
  jest.resetAllMocks();
});

let database: MongoMemoryServer;

beforeAll(async () => {
  database = await MongoMemoryServer.create();
  const databaseUrl = database.getUri();
  await connectToDatabase(databaseUrl);
  await Burger.create(classicBurgerMock);
  await Burger.create(cheeseBurgerMock);
  await Burger.create(cheeseBurgerMock);
  await Burger.create(cheeseBurgerMock);
  await Burger.create(cheeseBurgerMock);
  await Burger.create(cheeseBurgerMock);
  await Burger.create(cheeseBurgerMock);
  await Burger.create(cheeseBurgerMock);
  await Burger.create(cheeseBurgerMock);
  await Burger.create(cheeseBurgerMock);
  await Burger.create(cheeseBurgerMock);
  await Burger.create(cheeseBurgerMock);
});

afterAll(async () => {
  await mongoose.disconnect();
  await database.stop();
});

describe("Given a BurgerMongooseRepository's getBurgers method", () => {
  const repository = new BurgerMongooseRepository();
  describe("When it receives a valid request", () => {
    test("Then it returns a promise for an array with a classic burger and a cheeseburger", async () => {
      const burgers = await repository.getBurgers();

      expect(burgers[0]).toHaveProperty("name", classicBurgerMock.name);

      expect(burgers[1]).toHaveProperty("name", cheeseBurgerMock.name);
    });
  });

  describe("When it receives a valid request with limit option set to 1", () => {
    test("Then it returns a promise for an array with length of 1", async () => {
      const limit = 1;
      const burgers = await repository.getBurgers({ limit });

      expect(burgers).toHaveLength(1);
    });
  });

  describe("When it receives a valid request with an empty options object", () => {
    test("Then it should return 10 items by default", async () => {
      const expectedBurgersLength = 10;
      const options: BurgerRepositoryOptions = {};
      const burgers = await repository.getBurgers(options);

      expect(burgers).toHaveLength(expectedBurgersLength);
    });
  });
});
