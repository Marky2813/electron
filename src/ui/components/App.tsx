import '../App.css'
import Home from './Home'
import { useEffect, useState } from 'react'; 

//to implement the pause functionality. 
function App() {
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

  return (
    <>
     {/*each of our component must perform a single function. As of now we have a home page. in that home page we have 2 components. home and the other one is progress.*/}
     @ts-ignore 
     <Home duration={duration} setDuration={setDuration}
     setTimerState={setTimerState} setStartTime={setStartTime} remainingTime = {remainingTime} timerState={timerState} setStartTime={setStartTime}/>

    </>
  )
}

export default App
