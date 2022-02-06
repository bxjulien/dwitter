//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./Dwittos.sol";
import "./Models.sol";

contract Dwitter {
    Dwittos dwittosContract;

    constructor(address _dwittosAddr) {
        dwittosContract = Dwittos(_dwittosAddr);
    }

    uint256 totalDweets = 0;
    mapping(uint256 => Models.Dweet) private dweets;

    uint256 totalReplies = 0;
    mapping(uint256 => Models.Dweet[]) private replies;

    event reload();
    event like(address _address);

    function getAllDweets() public view returns (Models.Dweet[] memory) {
        Models.Dweet[] memory allDweets = new Models.Dweet[](totalDweets);
        for (uint256 i = 0; i < totalDweets; i++) {
            if (!dweets[i].isReply) {
                allDweets[i] = dweets[i];
            }
        }
        for (uint256 i = 0; i < allDweets.length; i++) {
            Models.DweetInfos memory dweetInfos = dwittosContract.getDweetInfos(
                allDweets[i].user
            );
            allDweets[i].username = dweetInfos.username;
            allDweets[i].picture = dweetInfos.picture;
        }
        return allDweets;
    }

    function postDweet(string memory _text) public returns (Models.Dweet memory) {
        Models.User memory user = dwittosContract.getUser(msg.sender);
        require(user.exists, "User does not exists");

        address[] memory likes;
        Models.Dweet memory dweet = Models.Dweet(
            totalDweets,
            msg.sender,
            _text,
            likes,
            0,
            block.timestamp,
            true,
            false,
            user.username,
            user.picture
        );

        dweets[dweet.id] = dweet;
        totalDweets++;

        emit reload();

        return dweet;
    }

    function postReply(string memory _text, uint256 _dweetId)
        public
        returns (Models.Dweet memory)
    {
        Models.User memory user = dwittosContract.getUser(msg.sender);
        require(user.exists, "User does not exists");

        Models.Dweet storage dweetToReply = dweets[_dweetId];
        require(dweetToReply.exists, "Dweet to reply doesn't exists");

        dweetToReply.replies++;

        address[] memory likes;

        Models.Dweet memory reply = Models.Dweet(
            totalReplies,
            msg.sender,
            _text,
            likes,
            0,
            block.timestamp,
            true,
            true,
            user.username,
            user.picture
        );

        replies[dweetToReply.id].push(reply);
        totalReplies++;

        emit reload();

        return reply;
    }

    function getReplies(uint256 _dweetId) public view returns (Models.Dweet[] memory) {
        return replies[_dweetId];
    }

    function deleteDweet(uint256 _id) public {
        delete dweets[_id];
        totalDweets--;
        emit reload();
    }

    function getDweet(uint256 _id) public view returns (Models.Dweet memory) {
        return dweets[_id];
    }

    function getTotalDweets() public view returns (uint256) {
        return totalDweets;
    }

    function likeDweet(uint256 _dweetId) public {
        Models.Dweet storage dweet = dweets[_dweetId];
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
