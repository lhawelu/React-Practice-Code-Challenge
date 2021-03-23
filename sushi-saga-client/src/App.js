import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  state = {
    sushis: [],
    page: 0,
    ate: false,
    money: 100,
    eatenSushi: []
  }

  componentDidMount() {
    fetch(API)
    .then(response => response.json())
    .then(sushis => this.setState({sushis}))
  }

  displayFirstFour() {
    let sushiRolls = this.state.sushis.slice(this.state.page, this.state.page + 4)
    sushiRolls.forEach(sushi => sushi.isEaten = false)
    return sushiRolls
  }
  
  handleClick = () =>  {
    this.setState({
      page: this.state.page + 4
    })
  }

  handleAteSushi = (sushi) => {
    if(sushi.price <= this.state.money && !sushi.eaten) {
      this.setState(prevState => {
        const newSushi = [...prevState.sushis]
        const i = newSushi.indexOf(sushi)
        newSushi[i].eaten = true
        const newMoneyBank = this.state.money - sushi.price
        const updatedEatenSushi = [...prevState.eatenSushi]
        updatedEatenSushi.push(sushi)
        return {sushis: newSushi, money: newMoneyBank, eatenSushi: updatedEatenSushi}
      })
    } else if (sushi.eaten) {
      alert("Already ate")
      return null
    } else {
      alert("No more funds")
      return null
    }
  }
  
  render() {
    return (
      <div className="app">
        <SushiContainer sushis={this.displayFirstFour()} handleClick={this.handleClick} handleAteSushi={this.handleAteSushi} ate={this.state.ate}/>
        <Table moneyBank={this.state.money} eatenSushi={this.state.eatenSushi}/>
      </div>
    );
  }
}

export default App;
