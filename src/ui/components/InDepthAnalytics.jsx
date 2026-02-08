import { Link } from 'react-router-dom';
import { useTimer } from '../timerContext';
import { X } from 'lucide-react';


function InDepthAnalytics() {
  const {
    deepWork,
    contextSwitches
  } = useTimer();
  let timeList = []; 
  for (let key in deepWork) {
    let appObj = {}; 
    appObj.name = key;
    appObj.time = Math.floor((deepWork[key] * 5)/60);
    timeList.push(appObj)
  }
  console.log(timeList)
  let seconds = 0;
  for (let key in deepWork) {
    seconds = seconds + deepWork[key] * 5;
  }
  let workTime;
  let numberOfSwitches = 0;
  if (seconds / 3600 >= 1) {
    workTime = `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
  }
  else {
    workTime = `${Math.floor(seconds / 60)}m`;
  }
  for (let contextSwitch in contextSwitches) {
    numberOfSwitches = numberOfSwitches + contextSwitches[contextSwitch];
  }
  return (
    <>
      <section className="w-full rounded-lg text-[#1A2421] bg-gradient-to-b from-white/60 to-white/30 border-[1px] border-solid border-white border-opacity-30 shadow-black/70 shadow-sm"
      >
        <div className="relative h-8 mb-1">
          <span className="absolute left-2.5 text-lg">
            Progress
          </span>
          <span className='absolute right-2 top-1.5'><Link to='/'><X size={18} strokeWidth={3} /></Link></span>
        </div>
        <div className="flex items-center justify-center">
          <div className="text-white 
                  bg-[#373737] grow ml-3 h-full rounded-lg mr-3">
            <div className="flex flex-col items-start ml-3 mt-2 justify-center mb-2">
              <div className="text-sm font-semibold">Deep Work</div>
              <div className="text-5xl mb-2">{workTime}</div>
              {/*here we need to add the list which will display the time
              spent on each app, also make sure that the component grows
              as the list grows, basically first create 2. then put for loop
              over object and create an entire component for it. 
              use dummy data.*/}
              
              {timeList.map((e) => {
                return (   
               <div className='grid grid-cols-3 font-normal w-full text-sm '>   
                <div className='col-span-2 flex'>{e.name} </div>
                <div className='col-span-1'>{e.time ? e.time: '<1'}m </div>
               </div> 
                )
              })}
            </div>
          </div>
          {/* <div className="grow mr-2 h-full rounded-lg text-white bg-[#373737]">
                <div className="flex flex-col items-start ml-2 mt-2 justify-center">
                  <div className="text-xs font-medium">Context Switches</div>
                  <div className="text-3xl">{numberOfSwitches}</div>
                </div>
              </div> */}
        </div>

      </section>
    </>
  )
}

export default InDepthAnalytics; 