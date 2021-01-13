pragma solidity ^0.7.0;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Lottery {
    using SafeMath for uint256;
    address public manager;
    address[] public players;
    address public winner;

    constructor() public {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }

    function random() private view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(block.difficulty, block.timestamp, players)
                )
            );
    }

    function pickWinner() public {
        uint256 index = random() % players.length;
        winner = players[index];
        payable(players[index]).transfer(address(this).balance);
        players = new address[](0);
    }

    function getWinner() public view returns (address) {
        return winner;
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }
}
