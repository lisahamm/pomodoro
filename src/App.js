import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const ONE_SECOND = 1000
const SIXTY_SECONDS = ONE_SECOND * 60
const TWENTY_FIVE_MINUTES = SIXTY_SECONDS * 25
const DEFAULT_TIME_INTERVAL = TWENTY_FIVE_MINUTES

class App extends Component {
  constructor(props) {
    super(props)

    this.startTimer = this.startTimer.bind(this)
    this.pauseTimer = this.pauseTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
    this.updateTimeInterval = this.updateTimeInterval.bind(this)

    this.state = {
      timeInterval: DEFAULT_TIME_INTERVAL
    }
  }

  formatSeconds(seconds) {
    if (seconds < 10) {
      return `0${seconds}`
    } else {
      return String(seconds)
    }
  }

  formatTimeInterval() {
    const timeInterval = this.state.timeInterval
    const minutes = Math.floor(timeInterval / SIXTY_SECONDS)
    const seconds = Math.floor((timeInterval % SIXTY_SECONDS) / ONE_SECOND)

    return `${minutes}:${this.formatSeconds(seconds)}`
  }

  startTimer() {
    const intervalId = setInterval(this.updateTimeInterval, ONE_SECOND)

    this.setState({
      intervalId: intervalId
    })
  }

  pauseTimer() {
    clearInterval(this.state.intervalId)
  }

  stopTimer() {
    clearInterval(this.state.intervalId)
    alert("Pomodoro is over!")
  }

  updateTimeInterval() {
    if (this.state.timeInterval >= ONE_SECOND) {
      this.setState((prevState) => ({
        timeInterval: prevState.timeInterval - ONE_SECOND
      }))
    } else {
      this.stopTimer()
    }
  }

  resetTimer() {
    this.setState({
      timeInterval: DEFAULT_TIME_INTERVAL
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Pomodoro Timer</h2>
        </div>
        <div className="App-body">
          <p className="time-display">{this.formatTimeInterval()}</p>
          <button onClick={this.startTimer}>Start</button>
          <button onClick={this.pauseTimer}>Pause</button>
          <button onClick={this.resetTimer}>Reset</button>
        </div>
      </div>
    );
  }
}

export default App;
