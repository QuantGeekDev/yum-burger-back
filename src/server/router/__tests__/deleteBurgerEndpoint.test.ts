import request from "supertest";
import { connectToDatabase } from "../../../database";
import { MongoMemoryServer } from "mongodb-memory-server";
import Burger from "../../../app/features/burger/model/Burger";
import {
  cheeseBurgerFromDbMock,
  classicBurgerMock,
} from "../../../app/features/burger/mocks/BurgerMocks";
import mongoose from "mongoose";
import app from "../../app";
import { type BurgerStructure } from "../../../app/features/burger/types";

let server: MongoMemoryServer;

let classicBurgerMockId: mongoose.Types.ObjectId;

beforeAll(async () => {
  const database = await MongoMemoryServer.create();
  const dbUri = database.getUri();
  await connectToDatabase(dbUri);
  const classicBurgerDocument = new Burger(classicBurgerMock);
  classicBurgerMockId = new mongoose.Types.ObjectId();
  classicBurgerDocument._id = classicBurgerMockId;
  await classicBurgerDocument.save();
  await Burger.create(cheeseBurgerFromDbMock);
});

afterAll(async () => {
  await mongoose.disconnect();
  await server?.stop();
});

describe("Given a DELETE /burger/6567d60e9fbd027bb1696969 endpoint", () => {
  describe("When it receives a request to delete a Classic Burger", () => {
    test("Then it should delete the Classic Burger and return the Classic Burger and status code 200", async () => {
      const path = `/burgers/${classicBurgerMockId.toString()}`;
      const classicBurgerName = "Classic Burger";
      const expectedStatusCode = 200;
      const response = await request(app)
        .delete(path)
        .expect(expectedStatusCode);

      const burger = response.body.burger as BurgerStructure;
      expect(burger.name).toBe(classicBurgerName);
    });
  });

  describe("When it encounters an error handling the request", () => {
    test("Then it should return status code 500 and error 'Couldn't delete burger' ", async () => {
      jest
        .spyOn(Burger, "findByIdAndDelete")
        .mockRejectedValue(new Error("Test Error"));

      const expectedErrorMessage = "Error deleting burger";
      const expectedStatusCode = 500;
      const path = `/burgers/${classicBurgerMockId.toString()}`;

      const response = await request(app)
        .delete(path)
        .expect(expectedStatusCode);

      const actualErrorMessage = (await response.body.error) as {
        error: string;
      };

      expect(actualErrorMessage).toBe(expectedErrorMessage);
    });
  });
});
