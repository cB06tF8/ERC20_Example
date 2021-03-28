pragma solidity ^0.6.0;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./ERC20Mintable.sol";

/** @title MyToken is a sample ERC20 token
  * @author Chris Ball
  * @notice This contract is the ERC20 token used in the ERC20_Example project      
*/
contract MyToken is ERC20Mintable {    
    constructor() ERC20("StarDucks Cappucino Token", "CAPPU") public {
        _setupDecimals(0);
    }
}