//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Dwitter {
    struct Dweet {
        uint256 id;
        address user;
        string text;
        address[] likes;
        uint256 timestamp;
    }

    uint256 totalDweets = 0;
    mapping(uint256 => Dweet) private dweets;

    event newDweet(Dweet dweet);

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
            block.timestamp
        );

        dweets[dweet.id] = dweet;
        totalDweets++;

        emit newDweet(dweet);

        return dweet;
    }

    function deleteDweet(uint256 _id) public {
        delete dweets[_id];
        totalDweets--;
    }

    function getDweet(uint256 _id) public view returns (Dweet memory) {
        return dweets[_id];
    }

    function getTotalDweets() public view returns (uint256) {
        return totalDweets;
    }

    function likeDweet(uint256 _dweetId) public {
        Dweet storage dweet = dweets[_dweetId];
        bool hasAlreadyLiked = false;

        for (uint256 i = 0; i < dweet.likes.length; i++) {
            if (dweet.likes[i] == msg.sender) delete dweet.likes[i];
            hasAlreadyLiked = true;
        }

        if (!hasAlreadyLiked) dweet.likes.push(msg.sender);
    }
}
