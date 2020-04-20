import React, { useState, useEffect, useRef } from 'react';
import './App.scss';


function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function App() {
  
  const displayMinutes = time => checkTime(Math.floor(time/60));
  const displaySeconds = time => checkTime(time % 60);

  //state
  const [timerLength,setTimerLength] = useState(1);
  const [breakLength,setBreakLength] = useState(5);
  const [total, setTotal] = useState(timerLength*60);
  const [minutes, setMinutes] = useState(displayMinutes(total));
  const [seconds, setSeconds] = useState(displaySeconds(total));
  const [running, setRunning] = useState(false);
  const [type, setType] = useState("Session");


  const runTimer = () => {
     let time = total - 1
    
      setTotal(time)
      setMinutes(displayMinutes(time))
      setSeconds(displaySeconds(time))
  }

  function checkTime(i) {
    if (i<10) {
      i = "0" + i;
    }
    return i;
  } 

  useEffect(()=>{
    let interval = null;
    if (running) {
      interval = setInterval(() => {
        runTimer()
      }, 1000);
    } else if (!running && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running, seconds])

  const startStop = () => {
    setRunning(!running)
  }

  const reset =() => {
    setTotal(timerLength*60)
  }
  
  
  

  return (
    <div id="app">
      <div className= "session flex">
          <div className = "session__section">
            <h3 id="session-label">Session Length</h3>
            <div className="session__display flex">
              <div id="session-increment" 
                  onClick={()=> {if(timerLength<= 59) setTimerLength(timerLength + 1)}}>+</div>
              <div id="session-length">{timerLength}</div>
              <div id="session-decrement" 
                    onClick={() => {if(timerLength>= 2) setTimerLength(timerLength - 1)}}>-</div>
            </div>
          </div>
          <div className = "session__section">
            <h3 id ="break-label">Break Length</h3>
            <div className="session__display flex">
              <div id="break-increment" onClick={()=> {if(breakLength<= 59) setBreakLength(breakLength + 1)}}>+</div>
              <div id="break-length">{breakLength}</div>
              <div id="break-decrement" onClick={()=> {if(breakLength>= 2) setBreakLength(breakLength - 1)}}>-</div>
            </div>
          </div>
      </div>
          <div className="display">
              <h1>{minutes}:{seconds}</h1>
          </div>
          <button onClick={startStop}>Start/Stop</button>
          <button onClick={reset}>Reset</button>
    </div>
  );
}



export default App;
