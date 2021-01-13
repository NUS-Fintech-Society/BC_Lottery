import React, { useState, useEffect, useCallback } from 'react';
import { useWeb3 } from '@openzeppelin/network/react';
import Avatar from '@material-ui/core/Avatar';
import gambler from './images/gambler.jpg';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import dice from './images/dice.gif';
import money from './images/money.gif';


const infuraProjectId = '95202223388e49f48b423ea50a70e336';

const useStyles = makeStyles((theme) => ({

  large: {
    width: theme.spacing(18),
    height: theme.spacing(18),
    
  },
}));

const Account = () => {
  const web3Context = useWeb3(`wss://mainnet.infura.io/ws/v3/${infuraProjectId}`);
  const { networkId, accounts, providerName, lib } = web3Context;
  const requestAuth = async web3Context => {
    try {
      await web3Context.requestAuth();
    } catch (e) {
      console.error(e);
    }
  };

  const [balance, setBalance] = useState(0);

  const getBalance = useCallback(async () => {
    let balance =
      accounts && accounts.length > 0 ? lib.utils.fromWei(await lib.eth.getBalance(accounts[0]), 'ether') : 'Unknown';
    setBalance(balance);
  }, [accounts, lib.eth, lib.utils]);

  useEffect(() => {
    getBalance();
  }, [accounts, getBalance, networkId]);

  const classes = useStyles();


   
    return  <div className="App">
   <header className="App-header">
      <box className = "row"> 
      <img alt="dice" className="dice" src={money} />
      <img alt="dice" className="dice" src={dice} />
      <img alt="dice" className="dice" src={money} />
      </box>
   
     
      <p1>

       Your Account
      </p1> 
      
      
      </header>
      <div  className="spacecontainer"> </div>
    
    
    {accounts && accounts.length ? (
        <div  className="overall">
       <div  className="containerprofile">
       
       <div  className="spacecontainer"> </div>

<Avatar alt="containerprofile-dice" className={classes.large} src={gambler}  />
  
  <div  className="spacecontainer"> </div>
      
  <div  className="infocontainer"> 
     
      <b>The Wallet Address used is</b> <br></br><br></br>
      
      { accounts[0] }
     
      <br></br>  

      <div  className="sidenote"> 
     
     <i> **You will be unknown to others.  </i>
      </div>
      
      <br></br>
      <br></br>
     <b>Balance (Eth) :</b> {balance} 
     
     </div>
     </div>
     <br></br>

     
        </div>
        
      ) : !!networkId && providerName !== 'infura' ? ( 
       
       <div>
      Cant see any account details? Login to metamask!



        </div>
      ) : (
        <div>  </div>
      )}
  <Wave/>
</div>




  
  }


  const Wave = () => {
    return(
      <svg height="100%" width="100%" id="bg-svg" viewBox="0 0 1440 500" xmlns="http://www.w3.org/2000/svg" 
      class="transition duration-300 ease-in-out delay-150"><defs><linearGradient id="gradient"><stop offset="5%" 
      stop-color="#9b7bc488"></stop><stop offset="95%" stop-color="#374b8c88"></stop></linearGradient></defs>
      <path d="M 0,500 C 0,500 0,166 0,166 C 108.42105263157893,194.86124401913878 216.84210526315786,223.72248803827753 319,
      207 C 421.15789473684214,190.27751196172247 517.0526315789474,127.97129186602871 618,112 C 718.9473684210526,
      96.02870813397129 824.9473684210525,126.39234449760764 900,154 C 975.0526315789475,181.60765550239236 1019.1578947368423,
      206.45933014354068 1104,208 C 1188.8421052631577,209.54066985645932 1314.4210526315787,187.77033492822966 1440,166 C 1440,
      166 1440,500 1440,500 Z" stroke="none" stroke-width="0" fill="url(#gradient)" class="transition-all duration-300 ease-in-out 
      delay-150"></path><defs><linearGradient id="gradient"><stop offset="5%" stop-color="#9b7bc4ff"></stop><stop offset="95%" 
      stop-color="#374b8cff"></stop></linearGradient></defs><path d="M 0,500 C 0,500 0,333 0,333 C 88.99521531100481,
      306.18660287081343 177.99043062200963,279.3732057416268 268,288 C 358.0095693779904,296.6267942583732 449.0334928229664,
      340.69377990430627 547,335 C 644.9665071770336,329.30622009569373 749.8755980861246,273.85167464114835 865,271 C 980.1244019138754,
      268.14832535885165 1105.4641148325359,317.8995215311005 1203,337 C 1300.5358851674641,356.1004784688995 1370.267942583732,
      344.55023923444975 1440,333 C 1440,333 1440,500 1440,500 Z" stroke="none" stroke-width="0" fill="url(#gradient)" 
      class="transition-all duration-300 ease-in-out delay-150"></path></svg>
    )
  }
export default Account; 