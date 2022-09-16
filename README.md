## Cryptologic web3/backend application challenge.

The main goal of this challenge is to create a backend application writen in nodejs/typescript that consumes, processes and store blockchain data.

To achieve this, the following items are required.

- Create a fork of the current repository, once the challenge is done submit a proper PR.
- Instantiate a web3 o etherjs object with an public RPC (in this case we will use Avalanche EVM C-Chain)
- create a MongoDB database connection withing the runtime

Having this transaction as a starting point [0x508217c172c3cfe006ee9ca5bef621ba11a359461bacfc0494f1449a7d00f443](https://snowtrace.io/tx/0x508217c172c3cfe006ee9ca5bef621ba11a359461bacfc0494f1449a7d00f443) it is required to:

- Use web3.js or ethers.js proper methods to fetch transaction data details

- Fetch and save main contract ABI and bytecode and save them into a file and database

- Understand and parse the event log to show in a básic REST response the decoded events and its parameters

- Create a basic REST endpoint that once queried saves the parsed data into a MongoDB document.

- Create a basic REST endpoint to get the previously saved data.


Must have:

- Basic error handling
- Basic README file
- Basic explaination of the work done

Extra points:
- unit testing
- Docker build

#### References:

[Event logs](https://medium.com/mycrypto/understanding-event-logs-on-the-ethereum-blockchain-f4ae7ba50378)

[Web3 doc](https://web3js.readthedocs.io/en/1.0/web3-eth.html)

[EthersJS dock](https://docs.ethers.io/v5/)

[topics & getPastLogs](https://ethereum.stackexchange.com/questions/61585/how-to-setup-topics-for-function-getpastlogs)
