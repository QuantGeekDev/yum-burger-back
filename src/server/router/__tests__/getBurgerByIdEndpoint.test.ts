import request from "supertest";
import app from "../../app";
import { type BurgerStructure } from "../../../app/features/burger/types";
import { connectToDatabase } from "../../../database";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import Burger from "../../../app/features/burger/model/Burger";
import { classicBurgerMock } from "../../../app/features/burger/mocks/BurgerMocks";

let server: MongoMemoryServer;
let classicBurgerMockId: mongoose.Types.ObjectId;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const serverUrl = server.getUri();
  await connectToDatabase(serverUrl);
  const classicBurgerDocument = new Burger(classicBurgerMock);
  classicBurgerMockId = new mongoose.Types.ObjectId();
  classicBurgerDocument._id = classicBurgerMockId;
  await classicBurgerDocument.save();
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});

describe("Given a GET /burgers/:id endpoint", () => {
  describe("When it receives a request to get a classic burger", () => {
    test("Then it should return a classic burger and status 200", async () => {
      const expectedStatusCode = 200;
      const path = `/burgers/${classicBurgerMockId.toString()}`;
      const classicBurgerName = "Classic Burger";
      const response = await request(app).get(path).expect(expectedStatusCode);

      const { burger } = (await response.body) as {
        burger: BurgerStructure;
      };
      expect(burger.name).toBe(classicBurgerName);
    });

    describe("When it encounters an error handling the request", () => {
      test("Then it should return status code 500 and error 'Error getting burger' ", async () => {
        jest
          .spyOn(Burger, "findById")
          .mockRejectedValue(new Error("Test Error"));

        const expectedStatusCode = 500;
        const path = `/burgers/${classicBurgerMockId.toString()}`;
        const expectedErrorMessage = "Error getting burger by id";

        const response = await request(app)
          .get(path)
          .expect(expectedStatusCode);

        const errorMessage = response.body as { error: string };

        expect(errorMessage).toEqual({ error: expectedErrorMessage });
      });
    });
  });
});
