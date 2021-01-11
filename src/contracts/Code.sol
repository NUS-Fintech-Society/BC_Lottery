pragma solidity ^0.7.0;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Tokencreation is Ownable {
    struct Player {
        uint256 totaltokens;
        uint256 bettokens;
        uint256 selectednr;
        bool userexists;
    }

    struct Change {
        bool isChanged;
    }
    mapping(address => Player) playerinfo;
    mapping(address => Change) changes;

    address payable[] globallist;

    function EthertoToken() public payable {
        require(msg.value >= 1 ether, "Need to change more than 1 Ether");
        require(
            msg.sender.balance >= msg.value / 1 ether,
            "Not enough funds to convert to Tokens"
        );
        playerinfo[msg.sender].totaltokens += msg.value / 1 ether;
        if (changes[msg.sender].isChanged == false) {
            globallist.push(msg.sender);
            changes[msg.sender].isChanged = true;
        }
    }

    function Playertokens() public view returns (uint256) {
        return playerinfo[msg.sender].totaltokens;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function checklength() public view returns (uint256) {
        return globallist.length;
    }
}

//Each contract will represent a gameplay instance.
contract HollyRollyPolly is Tokencreation {
    using SafeMath for uint256;

    enum GameState {NOTSTARTED, INPROGRESS, ENDED}
    //address payable owner;
    address payable[] playerlist;
    address payable[] winnerlist;
    uint256 tokenpot;
    uint256 counter = 1;
    uint256 betFixed = 0;
    GameState state = GameState.NOTSTARTED;

    // constructor() public{
    //     owner=msg.sender;
    // }

    function rndGenerate(uint256 mod) internal returns (uint256) {
        counter++; //Cannot be view since we are modifying sth in the function.
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        counter,
                        block.timestamp,
                        block.difficulty,
                        msg.sender
                    )
                )
            ) % mod;
    }

    function participate(uint256 _nroftokens, uint256 _numselected)
        public
        payable
    {
        require(
            betFixed == 0 || _nroftokens == betFixed,
            "Please bet tokens according to the bet allocated to room."
        );
        require(_nroftokens > 0, "Need to bet more than 0");
        require(
            !playerinfo[msg.sender].userexists,
            "Player is already inside the game"
        );
        require(
            playerinfo[msg.sender].totaltokens >= _nroftokens,
            "You have bet more tokens than you have in your account"
        );
        require(
            _numselected >= 1 && _numselected <= 6,
            "Choose a number from 1 to 6"
        );
        if (betFixed == 0) {
            //Set the base template bet of the room.
            betFixed = _nroftokens;
        }
        playerlist.push(msg.sender);
        playerinfo[msg.sender].bettokens = _nroftokens;
        playerinfo[msg.sender].selectednr = _numselected;
        tokenpot = tokenpot.add(_nroftokens);
        playerinfo[msg.sender].totaltokens = playerinfo[msg.sender]
            .totaltokens
            .sub(_nroftokens);
        playerinfo[msg.sender].userexists = true;
    }

    function numberofplayers() public view returns (uint256) {
        return playerlist.length;
    }

    function potsize() public view returns (uint256) {
        return tokenpot;
    }

    //Only owner can start the game...
    function gameplay() public payable onlyOwner {
        require(playerlist.length >= 1, "Not enough players");
        require(
            state == GameState.NOTSTARTED,
            "Game is either in progress or has ended. Please start a new game."
        );
        state = GameState.INPROGRESS;
        //uint answer = rndGenerate(6) + 1;
        uint256 answer = 2;

        uint256 winnertottokens;
        for (uint256 i = 0; i < playerlist.length; i++) {
            address payable playerAddress = playerlist[i];
            if (playerinfo[playerAddress].selectednr == answer) {
                winnerlist.push(playerAddress);
                winnertottokens += playerinfo[playerAddress].bettokens;
            }
        }
        if (winnerlist.length == 0) {
            for (uint256 i = 0; i < globallist.length; i++) {
                address payable playerAddress = globallist[i];
                if (playerinfo[playerAddress].totaltokens > 0) {
                    playerAddress.transfer(
                        playerinfo[playerAddress].totaltokens * 1 ether
                    );
                }
            }
        } else {
            uint256 payout = tokenpot / winnerlist.length;
            for (uint256 j = 0; j < winnerlist.length; j++) {
                address payable winnerAddress = winnerlist[j];
                //uint payout=(tokenpot/winnertottokens)*playerinfo[winnerAddress].bettokens;
                tokenpot = tokenpot.sub(payout);
                playerinfo[winnerAddress].totaltokens = playerinfo[
                    winnerAddress
                ]
                    .totaltokens
                    .add(payout);
            }
            //   if (tokenpot!=0){
            //       playerinfo[owner].totaltokens=playerinfo[owner].totaltokens.add(tokenpot);
            //       tokenpot=0;
            //   }

            for (uint256 i = 0; i < globallist.length; i++) {
                address payable playerAddress = globallist[i];
                if (playerinfo[playerAddress].totaltokens > 0) {
                    playerAddress.transfer(
                        playerinfo[playerAddress].totaltokens * 1 ether
                    );
                }
            }
        }
        state = GameState.ENDED;
        selfdestruct(payable(owner()));
    }
}
