	var OracleContract = require('./build/contracts/LandTest.json')
var contract = require('truffle-contract')
var fetch = require('node-fetch')
var mysql = require('mysql')
const util = require('util')

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

// Truffle abstraction to interact with our
// deployed contract
var oracleContract = contract(OracleContract)
oracleContract.setProvider(web3.currentProvider)

var con = mysql.createConnection({
  host: "raaminstance.cusq3yvfunhb.us-west-2.rds.amazonaws.com",    // ip address of server running mysql
  user: "suraj",    // user name to your mysql database
  password: "surajsuraj",
  database: "suraj"   // corresponding password
});
con.connect(function(err, result) {
  if (err) throw err;
  //console.log('error connecting: ' +err.stack);
  //else
    console.log("good");
});

// Dirty hack for web3@1.0.0 support for localhost testrpc
// see https://github.com/trufflesuite/truffle-contract/issues/56#issuecomment-331084530
if (typeof oracleContract.currentProvider.sendAsync !== "function") {
  oracleContract.currentProvider.sendAsync = function() {
    return oracleContract.currentProvider.send.apply(
      oracleContract.currentProvider, arguments
    );
  };
}

// Get accounts from web3
web3.eth.getAccounts((err, accounts) => {
  oracleContract.deployed()
  .then((oracleInstance) => {
    // Watch event and respond to event
    // With a callback function  
	
    oracleInstance.CallbackGetResult()
    .watch((err, event) => {
      // Fetch data
      // and update it into the contract
	  
	  const oraclePromises = [
	oracleInstance.getquery()      
    ]
    // Map over all promises
    Promise.all(oraclePromises)
    .then((result) => {
		console.log('error no ' + result)
      con.query(result.toString(), function (err, answer, fields) {
	    if (err)
    console.log('error connecting: ' +err.stack)
    else {
      oracleInstance.setResult(util.inspect(answer[0], {showHidden: true, depth: null}),{from: accounts[0]})
	console.log('error  no ' +util.inspect(answer[0], {showHidden: true, depth: null}))
		console.log(JSON.stringify(answer))
	}
	 })
	}) 
	  
  })
  .catch((err) => {
    console.log(err)
  })
})
})