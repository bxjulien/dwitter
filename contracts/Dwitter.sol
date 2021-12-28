//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Dwitter {
    struct Dweet {
        uint256 id;
        address user;
        string text;
        uint256 timestamp;
    }

    uint256 totalDweets;
    Dweet[] dweets;

    event newDweet(Dweet dweet);

    function getAllDweets() public view returns (Dweet[] memory) {
        return dweets;
    }

    function postDweet(string memory _text) public returns (Dweet memory) {
        totalDweets++;
        Dweet memory dweet = Dweet(
            totalDweets,
            msg.sender,
            _text,
            block.timestamp
        );

        dweets.push(dweet);

        emit newDweet(dweet);

        return dweet;
    }

    function getTotalDweets() public view returns (uint256) {
        return totalDweets;
    }
}
