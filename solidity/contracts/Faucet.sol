//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Faucet {
    address owner;
    mapping(address => uint256) timeouts;

    event withdraw(address indexed to);
    event deposit(address indexed from, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {
        emit deposit(msg.sender, msg.value);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function request(address payable _requestor) public payable {
        require(
            msg.sender == owner,
            "Only the owner can directly request the faucet."
        );
        require(
            address(this).balance >= 0.01 ether,
            "Our faucet is empty, please check back later."
        );
        require(
            timeouts[msg.sender] <= block.timestamp - 30 minutes,
            "You can withdraw every 30 minutes, please come back later."
        );

        _requestor.transfer(0.01 ether);
        timeouts[msg.sender] = block.timestamp;

        emit withdraw(msg.sender);
    }
}
