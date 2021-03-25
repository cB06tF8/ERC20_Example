pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/** @title MyToken is a sample ERC20 token
    * @author Chris Ball
    * @notice This contract is the ERC20 token used in the ERC20_Example project      
*/
contract MyToken is ERC20 {    
    constructor(uint256 initialSupply) public ERC20("StarDucks Cappucino Token", "CAPPU") {
        _setupDecimals(0);
        _mint(msg.sender, initialSupply);        
    }
}