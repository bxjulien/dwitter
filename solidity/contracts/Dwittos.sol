//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "./Models.sol";

contract Dwittos {
    uint256 totalUsers = 0;

    mapping(address => Models.User) users;

    event reload();

    function getUser(address _addr) public view returns (Models.User memory) {
        return users[_addr];
    }

    function postUser(
        string memory _username,
        string memory _bio,
        string memory _picture
    ) public returns (Models.User memory) {
        Models.User memory newUser = Models.User(
            totalUsers,
            msg.sender,
            _username,
            _bio,
            _picture,
            true
        );

        users[msg.sender] = newUser;
        totalUsers++;
        emit reload();
        return users[msg.sender];
    }

    function updateUser(
        string memory _username,
        string memory _bio,
        string memory _picture
    ) public returns (Models.User memory) {
        Models.User memory user = users[msg.sender];
        require(user.exists, "User does not exists");
        user.username = _username;
        user.bio = _bio;
        user.picture = _picture;
        emit reload();
        return user;
    }

    function getDweetInfos(address _addr)
        public
        view
        returns (Models.DweetInfos memory)
    {
        Models.User memory user = users[_addr];
        require(user.exists, "User does not exists");
        Models.DweetInfos memory dweetInfos = Models.DweetInfos(user.username, user.picture);
        return dweetInfos;
    }
}
