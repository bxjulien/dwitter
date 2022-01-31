//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Dwittos {
    struct User {
        uint256 id;
        address addr;
        string username;
        string bio;
        string picture;
        bool exists;
    }

    uint256 totalUsers = 0;

    mapping(address => User) users;

    event reload();

    function getUser(address _addr) public view returns (User memory) {
        return users[_addr];
    }

    function postUser(User memory _user) public returns (User memory) {
        _user.id = totalUsers;
        users[_user.addr] = _user;
        totalUsers++;
        emit reload();
        return users[_user.addr];
    }

    function updateUser(User memory _user) public returns (User memory) {
        User memory user = users[_user.addr];
        require(user.exists, "User does not exists");
        user = _user;
        emit reload();
        return user;
    }
}
