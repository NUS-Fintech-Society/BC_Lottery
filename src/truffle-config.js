var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "fun order crack figure junk fragile welcome velvet tunnel boost zero olive";

module.exports = {

  networks: {
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 7545,            // Standard Ethereum port (default: none)
     network_id: "5777",       // Any network (default: none)
    },
    rinkeby: {
      provider: function() { 
       return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/b1ec87bfce05489c88207743bef3e3a6");
      },
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000,
  }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
       version: "0.7.0"    // Fetch exact version from solc-bin (default: truffle's version)
    }
  }
};
