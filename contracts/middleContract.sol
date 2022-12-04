// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract MuliSigMap {
	using Counters for Counters.Counter;
    Counters.Counter public _gullakIds;

    struct GullakInfo {
        string planName;
        address account;
        address creator;
    }
    // mapping of sturct to ids
    mapping(uint256 => GullakInfo) public idToGullakInfo;
    // mapping of creator address to ids
    mapping(address => uint256[]) public creatorAddressToids;
    // mapping of pariticipant address to their group addresses 
    mapping(address => address[]) public participantAddressToaccountlist;
    // mapping of gullak address to individual id
    mapping(address => uint256) public gullakToId;

    // registers all the mappings
	function register(address _creatorAddress, string memory _planName, address _accountAddress, address[] memory _participants) public {
        _gullakIds.increment();
        uint256 newId = _gullakIds.current();
        idToGullakInfo[newId] = GullakInfo(
            _planName,
            _accountAddress,
            _creatorAddress
        );
        creatorAddressToids[_creatorAddress].push(newId);
        for (uint i = 0; i < 3 ; i++)
        {
            participantAddressToaccountlist[_participants[i]].push(_accountAddress);
        }
        gullakToId[_accountAddress] = newId;
	}
    
    // returns balance address of particular gnosis safe wallet
    function balanceOfAccount(address _tokenAddress, address _accountAddress) public view returns(uint256) {
        uint256 balance = IERC20(_tokenAddress).balanceOf(_accountAddress);
        return balance;
    }

    // returns ids of gnosis safe created by a paritcular creator account
    function viewIds(address creatorAddress) public view returns(uint256[] memory){
        return creatorAddressToids[creatorAddress];
    }
}