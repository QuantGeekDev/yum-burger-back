import mongoose from "mongoose";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { connectToDatabase } from "../../../database";
import Burger from "../../../app/features/burger/model/Burger";
import {
  cheeseBurgerMock,
  classicBurgerMock,
} from "../../../mocks/Burger/BurgerMocks";
import app from "../../app";
import { type BurgerStructure } from "../../../app/features/burger/types";

let database: MongoMemoryServer;
beforeAll(async () => {
  database = await MongoMemoryServer.create();
  const databaseUrl = database.getUri();
  await connectToDatabase(databaseUrl);
  await Burger.create(classicBurgerMock);
  await Burger.create(cheeseBurgerMock);
});

afterAll(async () => {
  await mongoose.disconnect();
  await database.stop();
});

describe("Given a GET /burgers route", () => {
  const path = "/burgers";
  describe("When it receives a valid GET request", () => {
    test("Then it should return a status code 200 and an array with a classic burger and a cheese burger ", async () => {
      const expectedStatusCode = 200;

      const response = await request(app).get(path).expect(expectedStatusCode);
      const burgers = (await response.body.burgers) as BurgerStructure[];

      expect(burgers[0]).toHaveProperty("name", classicBurgerMock.name);
      expect(burgers[1]).toHaveProperty("name", cheeseBurgerMock.name);
    });
  });

  describe("When it encounters an error", () => {
    test("Then it should respond with code 400 and error message 'Error getting burgers' ", async () => {
      Burger.find = jest.fn().mockReturnValue(new Error("Test Error"));

      const expectedStatusCode = 400;
      const expectedErrorMessage = "Error getting burgers";

      const response = await request(app).get(path).expect(expectedStatusCode);
      const errorMessage = (await response.body) as { error: string };

      expect(errorMessage).toEqual({ error: expectedErrorMessage });
    });
  });
});
