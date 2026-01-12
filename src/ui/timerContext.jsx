import { createContext , useState, useEffect, useContext } from "react";

const TimerContext = createContext(); 

export function TimerProvider({ children }) {
  const [startTime, setStartTime] = useState(0);
     const [timerState, setTimerState] = useState("Intialized");
     const [duration, setDuration] = useState(15);
     const[remainingTime, setRemainingTime] = useState(0);   
     useEffect(() => {
      let Intervalid;
      if(timerState === "Running") {
        setRemainingTime((duration*60*1000) - ((Date.now() - startTime)));
        Intervalid = setInterval(() => {
          let time = (duration*60*1000) - ((Date.now() - startTime));
          setRemainingTime(time);
          if(Math.floor(time/60_000) < 0) 
          {
            setTimerState("Completed")
            clearInterval(Intervalid);
            return;
          }
        }, 1000)
  
        return () => {
          clearInterval(Intervalid)
        }
      }
      return () => {
          clearInterval(Intervalid)
        }; 
     }, [timerState])

     const value = {
      startTime, 
      setStartTime, 
      timerState, 
      setTimerState, 
      duration, 
      setDuration, 
      remainingTime, 
      setRemainingTime
     }; 

     return (
      <TimerContext.Provider value={value}>
        {children}
      </TimerContext.Provider>
     )
}

export function useTimer() {
      return useContext(TimerContext)
     }