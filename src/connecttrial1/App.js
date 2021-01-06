import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {
  state = {
    players: [],
    balance: '',
    value: '',
    message: '',
    loading: false,
    pageLoading: true
  };

  async componentDidMount() {
   
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({  players, balance });

    web3.eth.subscribe('newBlockHeaders', function (err, result) {
      if(err) {
        console.log(err);
      }
    });

    this.setState({pageLoading: false})
  }

  onSubmit = async event => {
    event.preventDefault();

    if (this.state.value <= 0.01) {
      this.setState({ message: 'Entry must exceed 0.01 ether.' });
      return;
    }

    const accounts = await web3.eth.getAccounts();

    this.setState({ loading: true });
    this.setState({
      message: 'This may take up to a minute. Waiting on transaction success...'
    });

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    }); 

    this.setState({ message: 'You have been entered!' });
    this.setState({ value: '' });

   
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ players, balance });
    this.setState({ loading: false });
  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ loading: true });
    this.setState({
      message: 'Hold up...'
    });

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    this.setState({ message: 'Check your account. The winner is picked!' + accounts[0] });

   
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({  players, balance });
    this.setState({ loading: false });
  };

  render() {
    if (this.state.pageLoading) {
      return <h1>Connecting....</h1>
    } else {
      return (
        <div>
         
          <p>
            There are currently{' '}
            {this.state.players.length} in the game, competing to win{' '}
            {web3.utils.fromWei(this.state.balance, 'ether')} ether!
          </p>
          
          <hr />
          
          <form onSubmit={this.onSubmit}>
          
            <label>Amount of ether to enter. This will be converted to tokens </label>
            <input
              type="number"
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
            <button disabled={this.state.loading}>Enter</button>
          </form>

          <form onSubmit={this.onSubmit}>
          
          <label>Bet a number (Change BE) </label>
          <input
            type="number"
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value })}
          />
          <button disabled={this.state.loading}>Enter</button>
        </form>



          <hr />
          <h4> Token conversion</h4>
          Number of tokens : {this.state.value}

          <h4>Ready to pick a winner?</h4>

         
    
          ? {this.state.players.length} != 5

        //need to compare with number of players 

          <button
            onClick={this.onClick}
            disabled={this.state.loading || !this.state.players.length}
          >
            Pick a Winner!
          </button>
          <hr />
          <h1>{this.state.message}</h1>
        </div>
      );
    }
  }
}

export default App;
