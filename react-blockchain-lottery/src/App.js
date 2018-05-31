import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import web3 from './web3';
import Web3 from 'web3';
import lottery from './lottery';

class App extends Component {
  state = {
    manager:'',
    players: [],
    balance: '',
    value : '',
    message: ''
  };

  //const web3 = new Web3(window.web3.currentProvider);

async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();

    const blah = new Web3(window.web3.currentProvider);
    const balance = await blah.eth.getBalance(lottery.options.address);
    this.setState({ manager, players, balance });
  }

  onSubmit = async (event) => {
    event.preventDefault();
    const blah = new Web3(window.web3.currentProvider);
    const accounts = await blah.eth.getAccounts();

    this.setState({ message: 'waiting on transaction sucess...'});
    await lottery.methods.enter().send({
      from: accounts[0],
      value: blah.utils.toWei(this.state.value, 'ether')

  });

  this.setState({ message: 'you have been entered!'});
};

onClick = async () => {
  const blah = new Web3(window.web3.currentProvider);

  const accounts = await blah.eth.getAccounts();
  this.setState({message:' waiting on transaction sucess...'})
  await lottery.methods.pickWinner().send({
    from: accounts[0],
  });
this.setState({message: 'A winner has been picked!'});
};
   render() {
     console.log(window);
     console.log(window.web3.currentProvider);
     const blah = new Web3(window.web3.currentProvider);
     console.log(blah);

     //const accounts = await blah.eth.getAccounts();
     console.log(blah.eth.getAccounts());

    console.log(blah.version.bind);
    return (
      <div>
      <h2>Lottery contract</h2>
      <p>This contract is managed by {this.state.manager}.
      There are currently {this.state.players.length} people entered,
      competing to to win {blah.utils.fromWei(this.state.balance,'ether')} ether !
      </p>
      <hr />
      <form onSubmit={this.onSubmit}>
        <h4>want to try your luck?</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input
          value={this.state.value}
            onChange={event => this.setState({ value: event.target.value})}
            />
        </div>
        <button>Enter</button>
      </form>
      <hr />
      <h4>Ready to pick a winner?</h4>
      <button onClick={this.onClick}>pick a winner!</button>
      <hr/>




      <h1>{this.state.message}</h1>
      </div>
            // web3.eth.getAccounts().then(console.log);


    );
  }
}

export default App;
