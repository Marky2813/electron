import { useState } from 'react';
import { useTimer } from '../timerContext';
function FocusTimer() {
  const [showSeconds, setShowSeconds] = useState("Show Seconds");
  const [stateButton, setStateButton]  =  useState("Pause"); 
  const {
    setStartTime,
    timerState,
    setTimerState,
    duration,
    setDuration,
    remainingTime,
  } = useTimer();
  let minutes = String(Math.floor(remainingTime / 60_000));
  let seconds = String(Math.floor(remainingTime % 60_000 / 1000));

  return (
    <>
      {
        (timerState === "Running" || timerState === "Paused" || timerState === "Resumed") ?
          <section>
            {(showSeconds === "Hide Seconds") ? 
            <h3>focus session running<h4>remaining time: {minutes.padStart(2, "0")}:{seconds.padStart(2, "0")}s</h4></h3>
            :
            <h3>focus session running<h4>remaining time: {minutes.padStart(2, "0")}min</h4></h3>
            }
            <button onClick={() => {
              setTimerState("Completed")
            }}>End Session</button>
            <button onClick={() => {
              if(timerState === "Running" || timerState === "Resumed") {
              setStateButton("Resume"); 
              setTimerState("Paused")
              }
              else {
                setStateButton("Pause"); 
                setStartTime(Date.now())
                setTimerState("Resumed")
              }
            }}>{stateButton}</button>
          </section>
          :
          <section>
            <button onClick={() => {
              if(showSeconds === "Hide Seconds") 
              {
              setShowSeconds("Show Seconds");
              }
              else {
              setShowSeconds("Hide Seconds");
              }
            }}>{showSeconds}</button>
            {(showSeconds === "Hide Seconds") ? 
            <h3>Enter Duration: <input type="text"
              placeholder="focus time in minutes"
              value={duration}
              onChange={(e) => {
                const value = (e.target.value);
                if (Number(value) <= 240) {
                  setDuration(Number(value));
                }
              }}></input>:00 mins</h3>
              :
              <h3>Enter Duration: <input type="text"
              placeholder="focus time in minutes"
              value={duration}
              onChange={(e) => {
                const value = (e.target.value);
                if (Number(value) <= 240) {
                  setDuration(Number(value));
                }
              }}></input>mins</h3>
            }
            <button onClick={() => {
              if (duration > 15 && duration <= 30) {
                setDuration((prev: any) => prev - 5);
              } else if (duration > 30) {
                setDuration((prev: any) => prev - 15)
              }
              else {
                return;
              }
            }}>dec</button>
            <button onClick={() => {
              setTimerState("Running")
              setStartTime(Date.now())
            }}>Start</button>
            <button onClick={() => {
              if (duration < 30) {
                setDuration((prev: any) => prev + 5);
              }
              else if (duration >= 30 && duration < 240) {
                setDuration((prev: any) => prev + 15);
              }
              else {
                return;
              }
            }}>inc</button>
          </section>
      }
    </>
  )
}

export default FocusTimer; 