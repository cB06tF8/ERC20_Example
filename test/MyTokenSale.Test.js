
const TokenSale = artifacts.require("MyTokenSale");
const Token = artifacts.require("MyToken");
const MyKycContract = artifacts.require("KycContract");
require("dotenv").config({path: "./.env"});

const BN = web3.utils.BN;
const chai = require("./SetupChai.js");
const expect = chai.expect;

contract("TokenSale Test", async (accounts) => {

    /** @dev  this gives us 3 accounts to use in testing (indexes 0, 1, 2) */
    const [deployerAcct, recipientAcct, anotherAcct] = accounts;

    it("Deployer account should not have any tokens", async () => {
        let instance = await Token.deployed();
        expect(instance.balanceOf(deployerAcct)).to.eventually.be.a.bignumber.equal(new BN(0));
    });
    
    it("All tokens should be in the TokenSale Smart Contract", async () => {
        let instance = await Token.deployed();
        let contractBalance = await instance.balanceOf(TokenSale.address);
        let totalSupply = await instance.totalSupply(); // totalSupply() is an ERC20 token property
        expect(contractBalance).to.be.a.bignumber.equal(totalSupply);
    });

    it("Should be able to buy tokens", async () => {
        const sendTokens = "1"; 
        let tokenInstance = await Token.deployed();
        let tokenSaleInstance = await TokenSale.deployed();
        let kycInstance = await MyKycContract.deployed();

        await kycInstance.setKycCompleted(deployerAcct, {from: deployerAcct});
        await kycInstance.setKycCompleted(recipientAcct, {from: deployerAcct});

        let startRecipBal = await tokenInstance.balanceOf(recipientAcct);

        expect(tokenSaleInstance.sendTransaction({from: recipientAcct, value: web3.utils.toWei(sendTokens, "wei")})).to.be.fulfilled;

        let tokenSaleAddr = await tokenSaleInstance.address;
        let tokenSaleWallet = await tokenSaleInstance.wallet();
        /** @dev 
         * console.log("tokenSaleWallet=" + tokenSaleWallet);
         * console.log("tokenSaleAddr=" + tokenSaleAddr); */
        let tokenSaleAcctBal = await tokenInstance.balanceOf(tokenSaleAddr);
        /** @dev console.log("TokenSaleAcct bal=" + tokenSaleAcctBal); */
        let weiRaised = await tokenSaleInstance.weiRaised();
        /** @dev console.log("tokenSale weiRaised=" + weiRaised); */
        let rate = await tokenSaleInstance.rate();
        /** @dev console.log("tokenSale rate=" + rate); */

        let endRecipBal = startRecipBal.add(new BN(sendTokens));
        /** @dev 
         * console.log("recipAcctNum=" + recipientAcct);
        console.log("receiptAcct bal=" + endRecipBal); */
        return expect(tokenInstance.balanceOf(recipientAcct)).to.eventually.be.a.bignumber.equal(endRecipBal);
    });

});