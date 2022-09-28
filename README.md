## Ezequiel web3/backend application challenge Solution.

Project Structure

- Dependency Injection for instanciating classes
  - Here we have a di-container that will register, in singleton scope, Services, Repositories and External Providers. Advantage: Responsible for instantiation in one place.
- API
  - We have routes and middlewares for the REST API. Inside of API we will find 2 endpoints:
  * Get All Transactions (This endpoint has some limitations, returns everything it finds in database. One improvement will be adding pagination and query params. Other improvemnt is to add Json Validation schema for POST methods).
  - Middlewares: We have an error handler middleware responsible for capturing and formating errors.
- Services
  - We have services to be consumed from API and Workers.
  - Services has services.interface responsible for declaring all services contracts.
- Smart Contract Component
  - Here we have a package responsible for interacting with Ethereum Network, create contracts and retrieve transaction information from the network.
  - We have ABI provider that creates a contract with SmartContractService. ABI provider has 2 providers that get abi information.
- Workers
  - Here we register for events. In this case only have the possibility to register event for Joe Doe contract address. Events will be saved to DB in order to be consumed by API
  - Further enhancement: Have the possibility to register events for a lot of addresses.
