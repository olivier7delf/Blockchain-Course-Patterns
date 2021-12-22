# Solidity Patterns

Part of the course on Ethereum Blockchain Decentralized Apps Development & Design.
The code is my personal answer and not an official correction.

http://acloudfan.com/learn-blockchain
http://www.bcmentors.com


# Tests

Here are tested smart contracts from "./contracts".
In order to run the test, you will need these packages:

To test require() function:
- npm install --save-dev chai
- npm install --save-dev chai-as-promised  

Time manipulation
- npm install --save-dev @openzeppelin/test-helpers

You can use a local private blockchain or just launch Ganache. Check configs.

>truffle test ./test/**name of the file**

# Local Blockchain

Repositories:
- privnw_one : details to run the network: ./privnw_one/bnode/README.md
- privnw_poa : proof of authority : ./privnw_poa/README.md
Allow to run local network with one or 2 nodes.

Blockchain-Course-Patterns/