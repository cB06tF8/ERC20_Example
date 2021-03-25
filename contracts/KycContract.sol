pragma solidity ^0.6.0;

import "@openzeppelin/contracts/access/Ownable.sol";

    /** @title Know You Customer contract
      * @author Chris Ball
      * @notice This contract handles basic "white listing" of addresses      
    */
contract KycContract is Ownable {
    mapping(address => bool) allowed; /** @dev valid kyc addresses */

    /** @notice function whitelistis of the incoming address
      * @param _addr the address to whitelist
    */
    function setKycCompleted(address _addr) public onlyOwner {
        allowed[_addr] = true;
    }

    /** @notice function revokes whitelisting of the incoming address
      * @param _addr the address to revoke
    */
    function setKycRevoked(address _addr) public onlyOwner {
        allowed[_addr] = false;
    }

    /** @notice function returns true or false as to whether an address is currently whitelisted
      * @param _addr address to query 
      * @return true/false
    */
    function IsCustomerValid(address _addr) public view returns (bool) {
        return allowed[_addr];
    }
}