import React, { useState, useEffect } from 'react';
import './App.scss';

function App() {
  const displayMinutes = (time) => checkTime(Math.floor(time / 60));
  const displaySeconds = (time) => checkTime(time % 60);

  //state
  const [timerLength, setTimerLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [total, setTotal] = useState(timerLength * 60);
  const [running, setRunning] = useState(false);
  const [type, setType] = useState('Session');

  const timerLogic = () => {
    if (type === 'Session' && total === 0) {
      setType('Break');
      setTotal(breakLength * 60);
    } else if (type === 'Break' && total === 0) {
      setType('Session');
      setTotal(timerLength * 60);
    }
  };

  const runTimer = () => {
    setTotal(total - 1);
  };

  const clockDisplay = (time) => {
    let min = displayMinutes(time);
    let sec = displaySeconds(time);
    return `${min}:${sec}`;
  };

  function checkTime(i) {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  }

  useEffect(() => {
    let interval = null;
    if (running) {
      timerLogic();
      interval = setInterval(() => {
        runTimer();
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [running, total]);

  const startStop = () => {
    setRunning(!running);
  };

  const reset = () => {
    setTotal(timerLength * 60);
    setRunning(false);
  };

  return (
    <div id="app">
      <div className="session flex">
        <div className="session__section">
          <h3 id="session-label">Session Length</h3>
          <div className="session__display flex">
            <div
              id="session-increment"
              onClick={() => {
                if (timerLength <= 59) setTimerLength(timerLength + 1);
              }}
            >
              +
            </div>
            <div id="session-length">{timerLength}</div>
            <div
              id="session-decrement"
              onClick={() => {
                if (timerLength >= 2) setTimerLength(timerLength - 1);
              }}
            >
              -
            </div>
          </div>
        </div>
        <div className="session__section">
          <h3 id="break-label">Break Length</h3>
          <div className="session__display flex">
            <div
              id="break-increment"
              onClick={() => {
                if (breakLength <= 59) setBreakLength(breakLength + 1);
              }}
            >
              +
            </div>
            <div id="break-length">{breakLength}</div>
            <div
              id="break-decrement"
              onClick={() => {
                if (breakLength >= 2) setBreakLength(breakLength - 1);
              }}
            >
              -
            </div>
          </div>
        </div>
      </div>
      <div className="display">
        <h3 id="timer-label">{type}</h3>
        <h1 id="time-left">{clockDisplay(total)}</h1>
      </div>
      <button id="start_stop" onClick={startStop}>
        Start/Stop
      </button>
      <button id="reset" onClick={reset}>
        Reset
      </button>
    </div>
  );
}

export default App;
