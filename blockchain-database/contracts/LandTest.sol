pragma solidity ^0.4.17;

contract LandTest {
  // Contract owner
  address public owner;

  // BTC Marketcap Storage
  string public Result;
  
  string public qry;

  // Callback function
  event CallbackGetResult();

  function LandTest() public {
    owner = msg.sender;
  }

  function updateResult() public returns (string) {
    // Calls the callback function
    emit CallbackGetResult();
  }

  function setResult(string cap) public {
    // If it isn't sent by a trusted oracle
    // a.k.a ourselves, ignore it
    require(msg.sender == owner);
    Result = cap;
  }

  function getResult() constant public returns (string) {
    return Result;
  }
  
  function setquery(string _qry) public {
    // If it isn't sent by a trusted oracle
    // a.k.a ourselves, ignore it
    require(msg.sender == owner);
    qry = _qry;
  }
  
  function getquery() constant public returns (string) {
    return qry;
  }
}