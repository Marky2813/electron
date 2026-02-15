import { Link } from 'react-router-dom';
import { useTimer } from '../timerContext';
import { X } from 'lucide-react';


function InDepthAnalytics() {
  const {
    //deepwork is the object which contains the app ka naam and the 5s periods spent on that app
    deepWork,
    contextSwitches
  } = useTimer();

  let switchLog = []
  let timeList = [];
  let workTime;
  let numberOfSwitches = 0;
  let seconds = 0;
  let othersObj = {
    name: 'Others',
    time: 0
  };
  let notOthers = 0;
  let focusQuality = "-";
  let avgFocus = 0;
  let totalMinutes =0;

  for (let key in deepWork) {
    let appObj = {};
    appObj.name = key;
    if(appObj.name === "Electron") {
      appObj.name = "Visible";
    }
    appObj.time = Math.floor((deepWork[key] * 5) / 60);
    notOthers = notOthers + appObj.time;
    if (appObj.time) {
      timeList.push(appObj)
    }
  }
  timeList.sort((a, b) => b.time - a.time)

  for (let key in deepWork) {
    seconds = seconds + deepWork[key] * 5;
  }
  totalMinutes = Math.floor(seconds/60);
  if (seconds / 3600 >= 1) {
    workTime = `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
  }
  else {
    workTime = `${Math.floor(seconds / 60)}m`;
  }
  
  for (let contextSwitch in contextSwitches) {
    numberOfSwitches = numberOfSwitches + contextSwitches[contextSwitch];
    let newOBj = {
      'name': contextSwitch,
      'switch': contextSwitches[contextSwitch]
    }
    switchLog.push(newOBj)
  }
  if(totalMinutes) {
  if(numberOfSwitches === 0) {
    avgFocus = totalMinutes; 
  } else {
  avgFocus = Number((totalMinutes/numberOfSwitches).toFixed(1));
  }
  }
  if(avgFocus < 3 && avgFocus > 0) focusQuality = "Poor";
  else if(avgFocus >=3 && avgFocus < 8) focusQuality ="Moderate";
  else if(avgFocus >=8 && avgFocus < 15) focusQuality ="Good";
  else if(avgFocus > 15) focusQuality ="Excellent";
  
  switchLog.sort((a, b) => b.switch - a.switch)
  if(timeList.length) {
  othersObj['time'] = Math.floor(seconds / 60) - notOthers;
  timeList.push(othersObj)
  }
  return (
    <>
      <section className="self-start pb-3 w-full rounded-lg text-[#1A2421] bg-gradient-to-b from-white/60 to-white/30 border-[1px] border-solid border-white border-opacity-30 shadow-black/70 shadow-sm "
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
              <div className='w-full max-h-20 overflow-y-auto sc'>
                {timeList.map((e) => {
                  return (
                    <div className='grid grid-cols-3 font-normal w-full text-sm '>
                      <div className='col-span-2 flex opacity-80'>{e.name} </div>
                      <div className='col-span-1'>{e.time ? e.time : '<1'}m </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mt-2">
          <div className="text-white 
                  bg-[#373737] grow ml-3 h-full rounded-lg mr-3">
            <div className="flex flex-col items-start ml-3 mt-2 justify-center mb-2">
              <div className="text-md font-semibold">Focus Metrics
              </div>
              <div className='grid grid-cols-3 font-normal w-full text-sm mt-1'>
                      <div className='col-span-2 flex opacity-80'>Focus Quality</div>
                      <div className='col-span-1'>{focusQuality}</div>
                      <div className='col-span-2 flex opacity-80'>Avg. Focus</div>
                      <div className='col-span-1'>{avgFocus}m</div>
                      <div className='col-span-2 flex opacity-80'>Context Switches</div>
                      <div className='col-span-1'>{numberOfSwitches}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mt-2">
          <div className="text-white 
                  bg-[#373737] grow ml-3 h-full rounded-lg mr-3">
            <div className="flex flex-col items-start ml-3 mt-2 justify-center mb-2">
              <div className="text-md font-semibold">Switch Log</div>
              {/*here we need to add the list which will display the time
              spent on each app, also make sure that the component grows
              as the list grows, basically first create 2. then put for loop
              over object and create an entire component for it. 
              use dummy data.*/}
              <div className='w-full max-h-17 overflow-y-auto sc mt-1'>
                {switchLog.map((e) => {
                  return (
                    <div className='grid grid-cols-3 font-normal w-full text-sm '>
                      <div className='col-span-2 flex opacity-80 text-xs text-left'>{e.name} </div>
                      <div className='col-span-1'>{e.switch} </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default InDepthAnalytics; 