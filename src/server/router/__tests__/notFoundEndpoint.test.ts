import request from "supertest";
import app from "../../app";

describe("Given a notFound middleware", () => {
  describe("When it receives a request", () => {
    test("Then it should return a 404 status code and error message 'Endpoint not found' ", async () => {
      const expectedStatusCode = 404;
      const expectedPath = "/i-dont-exist";

      const response = await request(app)
        .get(expectedPath)
        .expect(expectedStatusCode);

      const { body: responseBody } = response as { body: { error: string } };

      expect(responseBody).toHaveProperty("error", "Endpoint not found");
    });
  });
});
