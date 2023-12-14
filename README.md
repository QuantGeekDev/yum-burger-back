# Nyam Burger - Back-End

Nyam Burger Back-End is the server-side component of the Nyam Burger application, providing RESTful API endpoints for CRUD operations on burgers.

## API Endpoints

### Development Environment

- **GET 404 Dev**

  - Endpoint: `http://localhost:1337/asdasdas`
  - Description: Returns a 404 status in the development environment.

- **GET Burgers Dev**

  - Endpoint: `http://localhost:1337/burgers`
  - Description: Retrieve a list of burgers in the development environment.

- **GET Burger by ID Dev**

  - Endpoint: `http://localhost:1337/burgers/6567d60e9fbd027bb1d9d750`
  - Description: Retrieve a specific burger by its ID in the development environment.

- **DELETE Burgers Dev**

  - Endpoint: `http://localhost:1337/burgers/`
  - Description: Delete a burger in the development environment. Requires the burger's ID in the request body.

- **POST Add Burgers Dev**

  - Endpoint: `http://localhost:1337/burgers`
  - Description: Add a new burger to the development environment. Requires a JSON body with burger details.

- **PUT Modify Burger Dev**

  - Endpoint: `http://localhost:1337/burgers`
  - Description: Modify an existing burger in the development environment. Requires a JSON body with the updated burger details.

- **GET Ping Dev**
  - Endpoint: `http://localhost:1337/`
  - Description: Ping the server in the development environment.

### Production Environment

- **GET 404 Prod**

  - Endpoint: `https://alex-andru-202309-bcn-back.onrender.com//asdasdas`
  - Description: Returns a 404 status in the production environment.

- **GET Ping Prod**

  - Endpoint: `https://alex-andru-202309-bcn-back.onrender.com/`
  - Description: Ping the server in the production environment.

- **GET Burgers Prod**
  - Endpoint: `https://alex-andru-202309-bcn-back.onrender.com/burgers/`
  - Description: Retrieve a list of burgers in the production environment.

## Quality and Coverage

- **Quality Gate Status**:
  [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=isdi-coders-2023_Alex-Andrushevich-Final-Project-back-202309-bcn&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=isdi-coders-2023_Alex-Andrushevich-Final-Project-back-202309-bcn)

- **Coverage**:
  [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=isdi-coders-2023_Alex-Andrushevich-Final-Project-back-202309-bcn&metric=coverage)](https://sonarcloud.io/summary/new_code?id=isdi-coders-2023_Alex-Andrushevich-Final-Project-back-202309-bcn)

- **Maintainability Rating**:
  [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=isdi-coders-2023_Alex-Andrushevich-Final-Project-back-202309-bcn&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=isdi-coders-2023_Alex-Andrushevich-Final-Project-back-202309-bcn)

## Scripts

- **build:dev**: Watch and build TypeScript files in the development environment.
- **build**: Build TypeScript files.
- **start**: Start the server.
- **start:dev**: Start the server in watch mode.
- **test**: Run Jest tests (passing with no tests).
- **test:dev**: Run Jest tests in watch mode.
- **test:coverage**: Run Jest tests with coverage reporting (no cache).

## License

This project is licensed under the [MIT License](LICENSE).
