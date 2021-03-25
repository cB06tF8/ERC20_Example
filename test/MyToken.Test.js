/** @dev IMPORTANT: this file was adapted by the teacher from  */
/** @dev  https://github.com/OpenZeppelin/openzeppelin-test-helpers/blob/master/src/setup.js */

const Token = artifacts.require("MyToken");
require("dotenv").config({path: "./.env"}); 

const BN = web3.utils.BN;
const chai = require("./SetupChai.js");
const expect = chai.expect;

contract("Token Test", async (accounts) => {

    /** @dev this gives us 3 accounts to use in testing (indexes 0, 1, 2) */
    const [deployerAcct, recipientAcct, anotherAcct] = accounts;

    beforeEach(async() => {
        this.myToken = await Token.new(process.env.INITIAL_COINAMOUNT);
    });

    it("All tokens should be in my account", async () => {

        // this is how you get the token instance once it is deployed on the chain
        let instance = this.myToken;
        let totalSupply = await instance.totalSupply();
        
        /** @dev this also works
         * const depAmount = await instance.balanceOf(accounts[0]);
         * const totSupp = await totalSupply.valueOf();
         * expect(String(depAmount)).to.equal(String(totSupp));  \
        */
            
        expect(instance.balanceOf(deployerAcct)).to.eventually.be.a.bignumber.equal(totalSupply);
    });

    it("We can transfer tokens between accounts", async () => {
        const sendTokens = 1; 
        let instance = this.myToken;
        let totalSupply = await instance.totalSupply();

        expect(instance.balanceOf(deployerAcct)).to.eventually.be.a.bignumber.equal(totalSupply);
        expect(instance.transfer(recipientAcct, sendTokens)).to.eventually.be.fulfilled;
        expect(instance.balanceOf(deployerAcct)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
        return expect(instance.balanceOf(recipientAcct)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
    });

    it("Is not possible to send more tokens than we have in total.", async () => {
        const sendTokens = 1000001; 
        let instance = this.myToken;
        let totalSupply = await instance.totalSupply();
        
        expect(instance.balanceOf(deployerAcct)).to.eventually.be.a.bignumber.equal(totalSupply);
        
        /** @dev  this also works 
         * expect(instance.transfer(recipientAcct, sendTokens)).to.eventually.not.be.fulfilled; 
        */
        
        expect(instance.transfer(recipientAcct, sendTokens)).to.eventually.be.rejected;
        return expect(instance.balanceOf(deployerAcct)).to.eventually.be.a.bignumber.equal(totalSupply);
    });
});