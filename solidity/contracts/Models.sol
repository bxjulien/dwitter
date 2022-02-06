//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

library Models {
    struct Dweet {
        uint256 id;
        address user;
        string text;
        address[] likes;
        uint256 replies;
        uint256 timestamp;
        bool exists;
        bool isReply;
        string username;
        string picture;
    }

    struct User {
        uint256 id;
        address addr;
        string username;
        string bio;
        string picture;
        bool exists;
    }

    struct DweetInfos {
        string username;
        string picture;
    }
}
