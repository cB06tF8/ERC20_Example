# ERC20_Example

This project was done for the Udemy course "Ethereum Blockchain Developer Bootcamp With Solidity (2021)" which can be found at
https://www.udemy.com/course/blockchain-developer/

As such, it is a learning project and should not be considered production ready. 

## How To Use
To test using the UI, add your Metamask mnemonic to the .env file

In order to purchase tokens from the UI, Metamask needs to be the owner of the contract. Metamask account needs to have eth berforehand in order to migrate.

### UI
- Add your address in the "Customer Address" area in order to whitelist your address for purchases
- Click the "Click to Add Address" button
- If the transaction is successful, an alert box should appear stating the address has been whitelisted
- You can purchase tokens either 1 at a time using the button or by pasting the contract address
displayed on the page into Metamask and transfering eth to the contract. Current rate is 1 wei = 1 token. Current total tokens are 1,000,000.

## Known Issues
- HSWallet-provider version differences must be @1.2.2 -- For the class, we were using HDWallet-provider@1.0.32, which was needed when running everything locally (instead of the latest version). But this version would not work when attempting to deploy to Goerli using Infura. I had to switch to @1.2.2. Note, 1.2.2 is not the latest version, as that also had an issue during deployment to Infura. @1.2.2 was the key for a succesful migration.

- This is an early project for me and as such many more packages may be included in this project than are actually needed (added to Git ignore upon repository build). My apologies for that! I may remove unneeded packages as I have time to and as I gain understanding.

- 'Current Token Amount' displayed in the UI is only for accounts[0].
