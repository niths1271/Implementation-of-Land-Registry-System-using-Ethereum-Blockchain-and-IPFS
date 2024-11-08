# Implementation of Land Registry System using Ethereum Blockchain and IPFS

A decentralized application is created, and its performance is assessed by evaluating costs and execution time. By leveraging the inherent qualities of blockchain, we aim to implement it within India’s Land Registration System, an area notorious for fraudulent activities. This integration results in a more advanced system that facilitates efficient and trustworthy transactions for activities such as buying and selling.

## Tech

We use a number of open source projects to work properly:

- [React JS] - HTML enhanced for web apps!
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework
- [Metamask] - Crypto Currency wallet for blockchain applications.
- [Truffle ] - Development framework for Ethereum
- [Ganache] - Used to create Ethereum development ecosystem to facilitate the development, testing, and deployment of smart contracts.
- [Solidity] - Programming language designed specifically for developing smart contracts on the Ethereum blockchain and other blockchain platforms.
- [Infura] - Infura for IPFS storage.


## Installation(Frontend)
Install the dependencies and devDependencies and start the server.

```sh
cd material-react-app
npm install
npm start
```

Note:
- The application by default will run at port 3000.
- Please make sure .env file is configured properly before running the application as it contains all
the details about ports,api token,secret keys etc.

## Installation(Backend)

Install Ganache in your environment which helps us to create a local blockchain network

```sh
cd blockchain
npm install
truffle compile 
truffle migrate
```
Note:
- By default 10 accounts will be provided in local blockchain network by ganache.
- Make sure metamask extension is installed in your browsers.
- Metamask wallet can be used to store the private keys of all blockchain accounts and sign all our
transactions.
- To add an account into metamask just get the private key of your account and access your account 
using that.
- Make sure your connected to the right blockchain network.


   [node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>
   [React JS]: <https://react.dev/>
   [Metamask]: <https://metamask.io/>
   [Truffle ]: <https://archive.trufflesuite.com/>
   [Ganache]: <https://archive.trufflesuite.com/ganache/>
   [Solidity]: <https://soliditylang.org/>
   [Infura]: <https://www.infura.io/>
