import React from 'react';
import './App.css';
import Main from './Client(React)/components/Main';
import Navbar from './Client(React)/components/Navbar/Navbar';



function App3() {
  const Web3 = require("web3");
const ethEnabled = () => {
  if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
    window.ethereum.enable();
    return true;
  }
  return false;
}
if (!ethEnabled()) {
  alert("Please install MetaMask to use this dApp!");
}


return (
  <div>
  <Navbar />
  <Main />
  </div>


   

    

);
}

export default App3;