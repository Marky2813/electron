import FocusTimer from "./FocusTimer"; 

function Home({duration, setDuration, setTimerState, setStartTime, remainingTime, timerState}) {
  return (
   <>
    <h5>this is the home page of our app. greeting + weather. then 2 components for focus session and progress. </h5>
    <FocusTimer duration={duration} setDuration={setDuration} setTimerState={setTimerState} setStartTime={setStartTime} remainingTime={remainingTime} timerState={timerState}/>
   </>
  )
}

export default Home