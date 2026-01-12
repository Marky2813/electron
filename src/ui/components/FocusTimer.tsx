// import { useEffect, useState, } from "react";

import { useState } from "react";


function FocusTimer({duration, setDuration, setTimerState, setStartTime, remainingTime, timerState}) {

  let minutes = String(Math.floor(remainingTime/60_000));
  let seconds = String(Math.floor(remainingTime%60_000/1000)); 
  // const [started, setStarted] = useState(false);
  // const [seconds, setSeconds] = useState(0); 
  // const [mins, setMins] = useState(true); 
  // const [unit, setUnit] = useState("min"); 

  // function Timer() {
  //   setStarted(true);
  //   setRt(duration);
  //   console.log("timer started!")
  //   const intervalId = setInterval(() => {
  //     setRt((prevTime) => {
  //       if (prevTime == 2) {
  //         clearInterval(intervalId);
  //         setMins(false);
  //         setUnit("sec");  
  //         displaySeconds(); 
  //         return 0;
  //       }
  //       return prevTime - 1;
  //     });
  //     //Whenever we use setInterval, it creates a closure with the callback and use the values at the time of creating the interval. this leads to a logical error in our program. thus it is required to put the setInterval in an useEffect hook so that we can create a new interval each time a dependency is changed. also your timer logic is flawed. it may also be required in the analytics page so we either need to lift the state up or we need to learn about contextAPIs and custom hooks. 
  //   }, 60 * 1000);
  // }
  

  // function displaySeconds() {
  //   console.log("hello")
  //   setSeconds(59);
  //   const IntervalId = setInterval(() => {
  //     setSeconds((prevTime) => {
  //       if(prevTime <= 1) {
  //         clearInterval(IntervalId); 
  //         setStarted(false); 
  //         return 0;
  //       }
  //       return prevTime - 1;
  //     })
  //   }, 1000)
  // }  
  // useEffect(() => {
  //   setRt(duration);
  // }, [duration])

  // useEffect(() => {
  //   console.log(remaianingTime)
  // }, [remaianingTime])

  return (
    <>
      {
        (timerState === "Running") ?
          <section>
            <h3>focus session running<h4>remaining time: {minutes.padStart(2, "0")}:{seconds.padStart(2, "0")}s</h4></h3>
            <button onClick={() => {
              setTimerState("Completed")
            }}>End Session</button>
          </section>
          :
            <section>
            <h3>Enter Duration: <input type="text"
              placeholder="focus time in minutes"
              value={duration}
              onChange={(e) => {
                const value = (e.target.value);
                setDuration(Number(value));
              }}></input>mins</h3>
            <button onClick={()=> {
              setTimerState("Running")
              setStartTime(Date.now())
            }}>Start</button>
          </section>
      }
    </>
  )
}

export default FocusTimer; 