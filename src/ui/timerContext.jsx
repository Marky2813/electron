import { createContext , useState, useEffect, useContext } from "react";

const TimerContext = createContext(); 

export function TimerProvider({ children }) {
  const [startTime, setStartTime] = useState(0);
     const [timerState, setTimerState] = useState("Intialized");
     const [duration, setDuration] = useState(15);
     const [remainingTime, setRemainingTime] = useState(0);
     const [durationMs, setDurationMs] = useState(15 * 60000);
     const [progressPercentage, setProgressPercentage] = useState(0);
     const [analytics, setAnalytics] = useState();
     const [deepWork, setDeepWork] = useState(0);
     const [contextSwitches, setContextSwitches] = useState(0); 
     

    //deep work contains our details about the session and context switches contains the number of switches.        

        

     useEffect(() => {
      setDurationMs(duration*60_000);
     }, [duration])

     useEffect(() => {
      let Intervalid;
      
      if(timerState === 'Intialized') {
        const analysis = async () => {
          try{
            let data = await window.electron.getSessionDetails(); 
            return data; 
          } catch (err) {
            console.error("trouble fetching session time", err)
          }
        }

        analysis()
        .then(val => {
          console.log(val.contextSwitch)
          setContextSwitches(val.contextSwitch);
          console.log(val.todaySessionDetails)
          setDeepWork(val.todaySessionDetails);
        })
        .catch(err => console.log(err));  
        }
      if(timerState === "Running") {
        // setProgressPercentage(0);
        setRemainingTime((duration*60*1000) - ((Date.now() - startTime)));
        Intervalid = setInterval(() => {
          let time = (duration*60*1000) - ((Date.now() - startTime));
          setRemainingTime(time);
          if(Math.floor(time/60_000) < 0) 
          {
            window.electron.sendNotification();
            setTimerState("Completed")
            clearInterval(Intervalid);
            return;
          }
        }, 1000)
        return () => {
          clearInterval(Intervalid)
        }
      }
      if(timerState === "Paused") {
          let elapsedTime = Date.now() - startTime; 
          setRemainingTime(durationMs - elapsedTime);
          setDurationMs(durationMs - elapsedTime);
          
               const analysis = async () => {
          try{
            let data = await window.electron.getSessionDetails(); 
            return data; 
          } catch (err) {
            console.error("trouble fetching session time", err)
          }
        }

        analysis()
        .then(val => {
          setContextSwitches(val.contextSwitch);
          setDeepWork(val.todaySessionDetails);
        })
        .catch(err => console.log(err));  
        }

        if(timerState === "Resumed") { 
          Intervalid = setInterval(() => {
          let time = (durationMs) - ((Date.now() - startTime));
          setRemainingTime(time);
          if(Math.floor(time/60_000) < 0) 
          {
            setTimerState("Completed")
            setProgressPercentage(0);
            clearInterval(Intervalid);
            return;
          }
        }, 1000)
        return () => {
          clearInterval(Intervalid)
        }
      }
      if(timerState === "Completed") {
        setDurationMs(duration * 60_000);
        const analysis = async () => {
          try{
            let data = await window.electron.getSessionDetails(); 
            return data; 
          } catch (err) {
            console.error("trouble fetching session time", err)
          }
        }

        analysis()
        .then(val => {
          setContextSwitches(val.contextSwitch);
          setDeepWork(val.todaySessionDetails);
        })
        .catch(err => console.log(err));  
        }
        // console.log(analysis()); 
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
      setRemainingTime, 
      progressPercentage, 
      setProgressPercentage,
      deepWork,
      contextSwitches
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