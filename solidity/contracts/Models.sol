//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

library Models {
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
