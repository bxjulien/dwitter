//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Dwitter {
    struct Dweet {
        uint256 id;
        address user;
        string text;
        address[] likes;
        uint256 timestamp;
        bool exists;
        bool isReply;
    }

    uint256 totalDweets = 0;
    mapping(uint256 => Dweet) private dweets;

    uint256 totalReplies = 0;
    mapping(uint256 => Dweet[]) private replies;

    event reload();
    event like(address _address);

    function getAllDweets() public view returns (Dweet[] memory) {
        Dweet[] memory allDweets = new Dweet[](totalDweets);
        for (uint256 i = 0; i < totalDweets; i++) {
            allDweets[i] = dweets[i];
        }
        return allDweets;
    }

    function postDweet(string memory _text) public returns (Dweet memory) {
        address[] memory likes;
        Dweet memory dweet = Dweet(
            totalDweets,
            msg.sender,
            _text,
            likes,
            block.timestamp,
            true,
            false
        );

        dweets[dweet.id] = dweet;
        totalDweets++;

        emit reload();

        return dweet;
    }

    function postReply(string memory _text, uint256 _dweetId)
        public
        returns (Dweet memory)
    {
        Dweet storage dweetToReply = dweets[_dweetId];
        require(dweetToReply.exists, "Dweet to reply doesn't exists");

        address[] memory likes;

        Dweet memory reply = Dweet(
            totalDweets,
            msg.sender,
            _text,
            likes,
            block.timestamp,
            true,
            true
        );

        dweets[reply.id] = reply;
        totalDweets++;

        replies[dweetToReply.id].push(reply);
        totalReplies++;

        return reply;
    }

    function getReplies(uint _dweetId) public view returns (Dweet[] memory) {
        return replies[_dweetId];
    }

    function deleteDweet(uint256 _id) public {
        delete dweets[_id];
        totalDweets--;
        emit reload();
    }

    function getDweet(uint256 _id) public view returns (Dweet memory) {
        return dweets[_id];
    }

    function getTotalDweets() public view returns (uint256) {
        return totalDweets;
    }

    function likeDweet(uint256 _dweetId) public {
        Dweet storage dweet = dweets[_dweetId];
        require(dweet.exists, "Dweet doesn't exists");

        for (uint256 i = 0; i < dweet.likes.length; i++) {
            if (dweet.likes[i] == msg.sender) {
                dweet.likes[i] = dweet.likes[dweet.likes.length - 1];
                dweet.likes.pop();
                emit reload();
                return;
            }
        }

        dweet.likes.push(msg.sender);
        emit reload();
    }
}
