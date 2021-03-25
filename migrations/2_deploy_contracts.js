var MyToken = artifacts.require("MyToken.sol");
var MyTokenSale = artifacts.require("MyTokenSale.sol");
var KYC = artifacts.require("KycContract.sol");

// .env resource file: note the syntax
require("dotenv").config({path: ".env"});

// a function is called thru this deploy_contract migration
// the deployer here is the "handle" to the blockchain
module.exports = async function(deployer) {
    let addrs = await web3.eth.getAccounts();
    
    // step 1: instantiate MyToken
    await deployer.deploy(MyToken, process.env.INITIAL_COINAMOUNT);
    
    // add KYC functionality
    await deployer.deploy(KYC);
    
    // instantiate MyTokenSale which takes 4 args: rate, a wallet addr, token object & a KYC object
    await deployer.deploy(MyTokenSale, 1, addrs[0], MyToken.address, KYC.address);
    
    // grab MyToken instance
    let instance = await MyToken.deployed();
    
    // transfer all tokens from MyToken instance to MyTokenSale contract 
    await instance.transfer(MyTokenSale.address, process.env.INITIAL_COINAMOUNT);
}