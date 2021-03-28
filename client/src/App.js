import React, { Component } from "react";
import MyToken from "./contracts/MyToken.json";
import MyTokenSale from "./contracts/MyTokenSale.json";
import KycContract from "./contracts/KycContract.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { loaded: false, kycAddress: "0x123...", TokenSaleAddress: null, userTokens: 0, totalMintedTokens: 0};

  componentDidMount = async () => {
    try {
      /** @dev Get network provider and web3 instance. */
      this.web3 = await getWeb3();
      
      /** @dev Using web3 to get the user's accounts. */
      this.accounts = await this.web3.eth.getAccounts();
      
      this.networkId = await this.web3.eth.net.getId();      
      
      /** @dev Get the MyToken contract instance. */
      this.TokenInstance = new this.web3.eth.Contract(
        MyToken.abi,
        MyToken.networks[this.networkId] && MyToken.networks[this.networkId].address,
      );
      
      /** @dev Get the MyTokenSale instance */
      this.TokenSaleInstance = new this.web3.eth.Contract(
        MyTokenSale.abi,
        MyTokenSale.networks[this.networkId] && MyTokenSale.networks[this.networkId].address,
      );
      
      /** @dev Get the KycContract instance */
      this.KycContractInstance = new this.web3.eth.Contract(
        KycContract.abi,
        KycContract.networks[this.networkId] && KycContract.networks[this.networkId].address,
      );

      /** @dev
        *  Setting web3, accounts, and contracts to the state, and then proceed with an example of 
        * interacting with the contract's methods.
        * IMPORTANT: setState can accept a 2nd arg: after the setState is done, call the function
        * to updateUserTokens 
      */
      this.listenToTokenTransfer();      
      this.setState({loaded: true, TokenSaleAddress: MyTokenSale.networks[this.networkId].address}, this.updateTotalAndUserTokens);
      
    } catch (error) {      
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  /** @dev KYC address input handler */ 
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });    
  }
  
  /** @dev KYC submit button handler - sending the address from the input
    * to the KYC contract for approval */
  handleSubmit = async () => {
    await this.KycContractInstance.methods.setKycCompleted(this.state.kycAddress).send({from: this.accounts[0]});
    alert("KYC for " + this.state.kycAddress + " is complete.");
  }

  /** @dev update to the number of tokens handler (for account[0])  */
  updateTotalAndUserTokens = async () => {
    /** @dev Note: "call()" is a reading operation, whereas "send()" is a writing operation */
    let userTokens = await this.TokenInstance.methods.balanceOf(this.accounts[0]).call();
    let totalTokens = await this.TokenInstance.methods.totalSupply().call();
    this.setState({userTokens: userTokens, totalMintedTokens: totalTokens});
  }
    
  /** @dev token transfer event listener */
  listenToTokenTransfer = () => {
    // IMPORTANT: this will only listen for when the "to" param if the event is set to accounts[0]
    this.TokenInstance.events.Transfer({to: this.accounts[0]}).on("data", this.updateTotalAndUserTokens);
  }

  /** @dev token purchase handler   */
  handleBuyTokens = async() => {
    await this.TokenSaleInstance.methods.buyTokens(this.accounts[0]).send({from: this.accounts[0], value: this.web3.utils.toWei("1", "wei")});
  }

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Capuccino Sales</h1>
        <p>Get one today!</p>
        <h2>Please Enter Customer Address</h2>
        <table className='App-table'>
          <tr>
            <td>Paste or type address to allow purchase:&nbsp;&nbsp;</td>
            <td><input type='text' name='kycAddress' defaultValue={this.state.kycAddress} onChange={this.handleInputChange} /></td>            
          </tr>
          <tr><td colspan='2'><button type='button' onClick={this.handleSubmit} >Click to Add Address</button></td></tr>
        </table>
        <h2>Buy Tokens</h2>
        <p>If you would like to purchase tokens manually, send wei this address: {this.state.TokenSaleAddress} </p>
        <p>Total Tokens issued: {this.state.totalMintedTokens} CAPPU </p>
        <p>Tokens purchased by the current account displayed (refresh to display): {this.state.userTokens} CAPPU</p>
        <button type="button" onClick={this.handleBuyTokens}>Buy Single Tokens</button>
        <p><br /></p>
      </div>
    );
  }
}

export default App;
