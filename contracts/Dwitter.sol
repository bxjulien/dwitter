//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Dwitter {
    struct Dweet {
        uint256 id;
        address user;
        string text;
        uint256 timestamp;
    }

    uint256 totalDweets = 0;
    mapping (uint256 => Dweet) private dweets;

    event newDweet(Dweet dweet);

    function getAllDweets() public view returns (Dweet[] memory) {
        Dweet[] memory allDweets = new Dweet[](totalDweets);
        for (uint i = 0; i < totalDweets; i++) {
            allDweets[i] = dweets[i];
        }
        return allDweets;
    }

    function postDweet(string memory _text) public returns (Dweet memory) {
        Dweet memory dweet = Dweet(
            totalDweets,
            msg.sender,
            _text,
            block.timestamp
        );

        dweets[dweet.id] = dweet;
        totalDweets++;

        emit newDweet(dweet);

        return dweet;
    }

    function deleteDweet(uint256 id) public {
        delete dweets[id];
        totalDweets--;
    }

    function getTotalDweets() public view returns (uint256) {
        return totalDweets;
    }
}
