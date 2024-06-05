// SPDX-License-Identifier: MIT
pragma solidity >=0.8.20;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";

contract Pauser is AccessControl, Pausable {
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant USER_ROLE = keccak256("USER_ROLE");

    event Deposit(address depositor, uint256 amount);

     event Withdraw(address depositor, uint256 amount);

    mapping(address => uint256) public balances;

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
    }

    function pause() external onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function deposit(uint256 amount) external  whenNotPaused {
        require(amount > 0, "Amount must be greater than 0");
        balances[msg.sender] += amount;
        emit Deposit(msg.sender, amount);
    }

    function withdraw(uint256 amount) external  whenNotPaused {
        require(amount > 0, "Amount must be greater than 0");
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        emit Withdraw(msg.sender, amount);
    }

    function withdrawTwice(uint256 amount) external whenNotPaused {
        require(amount > 0, "Amount must be greater than 0");
        require(balances[msg.sender] >= amount * 2, "Insufficient balance");
        balances[msg.sender] -= amount * 2;
        emit Withdraw(msg.sender, amount * 2);
    }
}
