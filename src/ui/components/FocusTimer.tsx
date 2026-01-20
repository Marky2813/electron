import { useState, useEffect } from 'react';
import { useTimer } from '../timerContext';
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from 'lucide-react';
import Progress from './Progress';


function FocusTimer() {
  const [showSeconds, setShowSeconds] = useState("Show Seconds");
  const [stateButton, setStateButton] = useState("Pause");
   
  const {
    setStartTime,
    timerState,
    setTimerState,
    duration,
    setDuration,
    remainingTime,
    progressPercentage, 
    setProgressPercentage
  } = useTimer();


  useEffect(() => {
    setProgressPercentage(100 - Math.floor((remainingTime/(duration * 600))));
  }, [remainingTime])
  
  let minutesSeconds = String(Math.floor(remainingTime / 60_000));
  let minutes = String((Math.floor(remainingTime / 60_000)) + 1);
  let seconds = String(Math.floor(remainingTime % 60_000 / 1000));
  let time; 
  if(showSeconds === 'Hide Seconds') 
  {
    time = `${minutesSeconds.padStart(2, "0")}:${seconds.padStart(2, "0")}s`; 
  }
  else {
    time = `${(minutes).padStart(2, "0")}min`
  }
  
  return (
    <>
      {
        (timerState === "Running" || timerState === "Paused" || timerState === "Resumed") ?
          <section>
            <div className='justify-items-center items:center pt-4 pb-2'>
              <Progress time={time} progressPercentage={progressPercentage} setProgressPercentage={setProgressPercentage}/>
            </div>
            {timerState === "Paused" && <button 
            className='mr-3 p-1
            hover:bg-gray-100 rounded-full transition-colors'
            onClick={() => {
              setTimerState("Completed")
              setStateButton("Pause")
              setProgressPercentage(0)
            }}><RotateCcw color='#000'/></button>}
            <button 
            className='hover:bg-gray-100 rounded-full transition-colors p-1'
            onClick={() => {
              if (timerState === "Running" || timerState === "Resumed") {
                setStateButton("Resume");
                setTimerState("Paused")
              }
              else {
                setStateButton("Pause");
                setStartTime(Date.now())
                setTimerState("Resumed")
              }
            }}>{stateButton === "Pause" ? <Pause fill='#000'color='#000' strokeWidth={1} size={26}/> : <Play fill='#000' color='#000' strokeWidth={1}/ >}</button>
          </section>
          :
          <section className='h-full'>
            <div className='flex flex-col justify-between h-full'>
              {/* height full tells the div to take the entire height of it's parent element. while the height auto will start from zero filling only the height required to fit all the element.s*/}
              <button
                id="seconds-btn"
                className={`border-2
                border-[#1f78aa]
                text-sm
                px-3
                py-1 
                rounded-xl
                transition-all
                duration-100 
                mt-4 
                w-30 
                self-center
                font-semibold
                hover:bg-[#1f78aa]
                hover:shadow-sm
                ${showSeconds === "Hide Seconds" ? 
                  'bg-black text-white hover:hover:bg-[#262626]' 
                  :
                  ''
                }`}
                onClick={() => {
                  if (showSeconds === "Hide Seconds") {
                    setShowSeconds("Show Seconds");
                  }
                  else {
                    setShowSeconds("Hide Seconds");
                  }
                }}>{showSeconds}</button>
              {(showSeconds === "Hide Seconds") ?
                <div>
                  <div className='flex justify-center items-center gap-5'>
                    <button
                      className='
                      pt-3
                      transition-transform hover:-translate-x-0.5'
                      onClick={() => {
                        if (duration > 15 && duration <= 30) {
                          setDuration((prev: any) => prev - 5);
                        } else if (duration > 30) {
                          setDuration((prev: any) => prev - 15)
                        }
                        else {
                          return;
                        }
                      }}><ChevronLeft size={32} strokeWidth={3} /></button>
                    <div>
                      <input type="text"
                        placeholder="focus time in minutes"
                        className="bg-transparent text-center border-none outline-none ring-0 focus:ring-0 focus:outline-none focus:placeholder-transparent min-w-[1ch] [field-sizing:content]
                    text-6xl
                    font-bold
                    "
                        value={duration}
                        onChange={(e) => {
                          const value = (e.target.value);
                          if (Number(value) <= 480) {
                            setDuration(Number(value));
                          }
                        }}></input><span className='text-6xl
                    font-bold '>:00</span>
                    </div>
                    <button
                      className='pt-3
                      transition-transform hover:translate-x-0.5'
                      onClick={() => {
                        if (duration < 30) {
                          setDuration((prev: any) => prev + 5);
                        }
                        else if (duration >= 30 && duration < 480) {
                          setDuration((prev: any) => prev + 15);
                        }
                        else {
                          return;
                        }
                      }}><ChevronRight size={32} strokeWidth={3} /></button></div>
                  <div className='font-semibold
                    -mt-2 text-m'>minutes</div></div>
                :
                <div>
                  <div className='flex justify-center items-center gap-5'>
                    <button
                      className='pt-3
                      transition-transform hover:-translate-x-0.5' onClick={() => {
                        if (duration > 15 && duration <= 30) {
                          setDuration((prev: any) => prev - 5);
                        } else if (duration > 30) {
                          setDuration((prev: any) => prev - 15)
                        }
                        else {
                          return;
                        }
                      }}><ChevronLeft size={32} strokeWidth={3}  /></button>
                    <div>
                      <input type="text"
                        placeholder="focus time in minutes"
                        className="bg-transparent text-center border-none outline-none ring-0 focus:ring-0 focus:outline-none focus:placeholder-transparent min-w-[1ch] [field-sizing:content]
                    text-6xl
                    font-bold
                    "
                        value={duration}
                        onChange={(e) => {
                          const value = (e.target.value);
                          if (Number(value) <= 480) {
                            setDuration(Number(value));
                          }
                        }}></input>
                    </div>
                    <button
                      className='pt-3
                      transition-transform hover:translate-x-0.5'
                      onClick={() => {
                        if (duration < 30) {
                          setDuration((prev: any) => prev + 5);
                        }
                        else if (duration >= 30 && duration < 480) {
                          setDuration((prev: any) => prev + 15);
                        }
                        else {
                          return;
                        }
                      }}><ChevronRight size={32} strokeWidth={3} /></button></div>
                  <div className='font-semibold
                    -mt-2 text-m'>minutes</div></div>
              }
              <button
                className='border-2 
                border-[#1f78aa] 
                rounded-xl 
                w-24
                pb-1 
                self-center 
                text-2xl 
                text-white 
                bg-black 
                font-medium
                hover:bg-[#262626]
                hover:shadow-sm'
                onClick={() => {
                  setTimerState("Running")
                  setStartTime(Date.now())
                  window.electron.startSessionTimeTracking(); 
                }}>Start</button>

            </div>
          </section>
      }
    </>
  )
}

export default FocusTimer; 