# YUM - Back-End

Yum Back-End is the server-side component of the YUM application, providing RESTful API endpoints for ordering food from a restaurant with digital menu.

## Quality and Coverage

- **Quality Gate Status**:
  [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=QuantGeekDev_yum-burger-back&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=QuantGeekDev_yum-burger-back)

- **Coverage**:
  [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=QuantGeekDev_yum-burger-back&metric=coverage)](https://sonarcloud.io/summary/new_code?id=QuantGeekDev_yum-burger-back)

- **Maintainability Rating**:
  [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=QuantGeekDev_yum-burger-back&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=QuantGeekDev_yum-burger-back)

## API Endpoints

- **GET Burgers**

  - Endpoint: `http://localhost:1337/burgers`
  - Description: Retrieve a list of burgers in the development environment.

- **GET Burger by ID **

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

- **GET 404**

  - Endpoint: `http://localhost:1337/asdasdas`
  - Description: Returns a 404 status in the development environment.

## License

This project is licensed under the [MIT License](LICENSE).
