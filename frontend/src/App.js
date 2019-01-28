import React, { Component,Fragment } from 'react';
import Button from './images/button.png';
import axios from 'axios';
import './App.css';
const webURL  = 'http://localhost:3000';
class App extends Component {
  constructor() {
    super();
    this.state = {
      totalCoins : 10000,
      hasWonText : '',
      isRoundFree : false,
      result:[]
    }
    this.startPlay = this.startPlay.bind(this);
  }

  getDataFromServer = async () =>  {
  try {
    let output = await axios.get(`${webURL}/play`);
      return output.data;
  }catch(e) {
    console.log(`Status: Error, ${e}`);
  }
  }
  checkIfEqual = (arr) =>  arr.every( v => v === arr[0] )

  async startPlay() {
      if(!this.state.isRoundFree) {
        this.setState({totalCoins : this.state.totalCoins-10});
      }
      this.setState(prevState => ({
          isRoundFree : !prevState.isRoundFree
      }));
      let data = await this.getDataFromServer();
      if(data) {
        this.setState({result : data});
        if(this.checkIfEqual(data)) {
        this.setState({hasWonText : `Big Win, you've earned 20 coins to your total`, totalCoins : this.state.totalCoins+20});
        } else {
          this.setState({hasWonText: "No Win. Hence no coins added to your total"})
        }
      } else {
        console.log("server error");
      }

  }

  render() {
    const {totalCoins, result= [], hasWonText= "",isRoundFree=false} = this.state;
    return (
      <div className="container">
        <Fragment>
          <p id="win-text">{isRoundFree ? 'Free Round' : 'Normal Round'}</p>
          <p id="win-text">{hasWonText}</p>
          <div id="symbol-space">
            {result.length>0 && result.map((value, index)=>(
               <img  key= {index} src= {require(`./images/Symbol_${value}.png`)} className = "symbol-img" alt= "test" />
            )) }
          </div>

          <p id="bonus-text"></p>
          <button id="play-btn" onClick = {this.startPlay}>
            <img alt="button" src={Button}/>
          </button>
        </Fragment>
      <div className="footer">
        <p>Total Coins : {totalCoins}</p>
      </div>
    </div>
    );
  }
}


export default App;
