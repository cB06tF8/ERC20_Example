# ERC20_Example

This project was done for the Udemy course "Ethereum Blockchain Developer Bootcamp With Solidity (2021)" which can be found at
https://www.udemy.com/course/blockchain-developer/

As such, it is a learning project and should not be considered production ready. 

## How To Use
To test using the UI, add your Metamask mnemonic to the .env file

In order to purchase tokens from the UI, Metamask needs to be the owner of the contract. Send Metamask eth if your account does not already have eth on the network you've chosen before migrating to your chosen network.

### UI
- Add your address in the "Customer Address" area in order to whitelist your address for purchases
- Click the "Click to Add Address" button
- If the transaction is successful, an alert box should appear stating the address has been whitelisted
- You can purchase tokens either 1 at a time using the button or by pasting the contract address
displayed on the page into Metamask and transfering eth to the contract. Current rate is 1 wei = 1 token. Current total tokens are 1,000,000.

## Known Issues
- Upon attempting to migrate to the Goerli test network (and/or Ropsten) using Infura, I ran into the issue described here (3/24/2021): https://github.com/trufflesuite/truffle/issues/3935
Therefore, for now this project may need to be run from a local network (see the 'ganache_local' network in truffle-config.js) if you have similar issues.

- HSWallet-provider version differences: For the class, we were using HDWallet-provider@1.0.32, which was needed when running everything locally. But this version would not work when attempting to deploy to Goerli using Infura. I had to switch to the latest version.

- This is an early project for me and as such many more packages may be included in this project than are actually needed (added to Git ignore upon repository build). My apologies for that! I may remove unneeded packages as I have time to and as I gain understanding.

- 'Current Token Amount' displayed in the UI is only for accounts[0].
