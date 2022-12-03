// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/utils/Counters.sol";


contract MuliSigMap {
	using Counters for Counters.Counter;
    Counters.Counter public _gullakIds;

    struct GullakInfo {
        string planName;
        address account;
        address creator;
    }

    mapping(uint256 => GullakInfo) public idToGullakInfo;
    mapping(address => uint256[]) public addressToids;

	function register(address _creatorAddress, string memory _planName, address _accountAddress) public {
        _gullakIds.increment();
        uint256 newId = _gullakIds.current();
        idToGullakInfo[newId] = GullakInfo(
            _planName,
            _accountAddress,
            _creatorAddress
        );
        addressToids[_creatorAddress].push(newId);
	}

    function viewIds(address creatorAddress) public view returns(uint256[] memory){
        return addressToids[creatorAddress];
    }
}