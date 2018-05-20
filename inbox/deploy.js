const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'exchange account mixed tobacco just cradle provide leader slight wave retreat ivory',
  'https://rinkeby.infura.io/uSt7BzH9NUQK0BuKZd5z'
);

const web3 = new Web3(provider);

const deploy = async() => {
  const accounts = await web3.eth.getAccounts();
  const balance = await web3.eth.getBalance(accounts[0]);

  console.log('Attempting to deploy from account', accounts[0]);
  console.log('Account balance ', balance);

  const result = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({
        data : '0x' + bytecode,
        arguments: ['Hi there!']})
      .send({ gas : '1000000', gasPrice: web3.utils.toWei('2', 'gwei'), from : accounts[0] });

  const address = await result.options.address;
  console.log('Contract deployed to ', result.options.address);

};

deploy();
