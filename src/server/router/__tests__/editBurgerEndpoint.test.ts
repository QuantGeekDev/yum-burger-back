import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { type Types } from "mongoose";
import {
  cheeseBurgerFromDbMock,
  editedCheeseBurgerMock,
} from "../../../app/features/burger/mocks/BurgerMocks";
import Burger from "../../../app/features/burger/model/Burger";
import { connectToDatabase } from "../../../database";
import request from "supertest";
import app from "../../app";
import { type BurgerFromMongooseStructure } from "../../../app/features/burger/types";

let server: MongoMemoryServer;
let cheeseBurgerMockId: Types.ObjectId;
beforeAll(async () => {
  const server = await MongoMemoryServer.create();
  const dbUri = server.getUri();
  await connectToDatabase(dbUri);
  const cheeseBurgerDocument = new Burger(cheeseBurgerFromDbMock);
  cheeseBurgerMockId = new mongoose.Types.ObjectId();
  cheeseBurgerDocument._id = cheeseBurgerMockId;
  await cheeseBurgerDocument.save();
});

afterAll(async () => {
  await mongoose.disconnect();
  await server?.stop();
});

describe("Given a PUT /burgers/:id endpoint", () => {
  describe("When it receives a request to edit a Cheeseburger's price from 6 to 15", () => {
    test("Then it should return a status code 200 and a Cheeseburger with price 15", async () => {
      const expectedStatusCode = 200;
      const expectedNewPrice = 15;
      const path = `/burgers/${cheeseBurgerMockId.toString()}`;
      const editedCheeseBurger = editedCheeseBurgerMock;
      editedCheeseBurger._id = cheeseBurgerMockId.toString();
      const response = await request(app)
        .put(path)
        .send(editedCheeseBurger)
        .expect(expectedStatusCode);

      const editedBurger = (await response.body
        .burger) as BurgerFromMongooseStructure;

      expect(editedBurger.price).toBe(expectedNewPrice);
    });
  });
  describe("When it encounters an error", () => {
    test("Then it should return status code 500 and error 'Error editing burger'", async () => {
      jest.spyOn(Burger, "findByIdAndUpdate").mockRejectedValue("Error");
      const expectedStatusCode = 500;
      const expectedErrorMessage = "Error editing burger";
      const path = `/burgers/${cheeseBurgerMockId.toString()}`;
      const editedCheeseBurger = editedCheeseBurgerMock;
      editedCheeseBurger._id = cheeseBurgerMockId.toString();

      const response = await request(app)
        .put(path)
        .send(editedCheeseBurger)
        .expect(expectedStatusCode);

      const actualErrorMessage = response.body as { error: string };

      expect(actualErrorMessage).toEqual({ error: expectedErrorMessage });
    });
  });
});
