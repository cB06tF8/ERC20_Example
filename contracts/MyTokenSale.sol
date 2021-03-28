pragma solidity ^0.6.0;

import "./Crowdsale.sol";
import "./MintedCrowdsale.sol";
import "./KycContract.sol";

/** @title MyTokenSale contract
    * @author Chris Ball
    * @notice This contract handles the Crowdsale of MyToken ERC20 tokens      
*/
contract MyTokenSale is MintedCrowdsale {

        KycContract kyc;

        constructor(
        uint256 rate,    // rate in TKNbits
        address payable wallet,
        IERC20 token,
        KycContract _kyc
    )
        MintedCrowdsale() 
        Crowdsale(rate, wallet, token)
        public
    {
        kyc = _kyc;
    }

    /** @notice function validates whether the address purchasing tokens is currently whitelisted 
      * @dev this function overrides the Crowdsale function of the same name.
      * @param beneficiary address purchasing tokens 
      * @param weiAmount amount of tokens being purchased in wei
      */
    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view override {
        super._preValidatePurchase(beneficiary, weiAmount);
        require(kyc.IsCustomerValid(msg.sender), "Please complete the Customer Information form. Purchanse is not allowed.");
    }
}