import { useTimer } from "../timerContext";

function Analytics() {
  const {
        deepWork, 
        contextSwitches
      } = useTimer();
      let seconds = 0;
      for(let key in deepWork) 
      {
        seconds = seconds + deepWork[key] * 5;
      }
      let workTime;
      let numberOfSwitches = 0;  
      if(seconds / 3600 >= 1) {
        workTime = `${Math.floor(seconds/3600)}h ${Math.floor((seconds%3600)/60)}m`;
      }
      else 
      {
        workTime = `${Math.floor(seconds/60)}m`;
      }
      for(let contextSwitch in contextSwitches) {
        numberOfSwitches = numberOfSwitches + contextSwitches[contextSwitch]; 
      }
  return (
    <>
    <div className="relative h-8">
            <span className="absolute left-2">Analytics</span>
          </div>
          <div className="flex items-center justify-center gap-2 h-17">
            <div className="text-white 
                bg-[#373737] grow ml-2 h-full rounded-lg">
              <div className="flex flex-col items-start ml-2 mt-2 justify-center ">
                <div className="text-xs font-medium">Deep Work</div>
                <div className="text-3xl">{workTime}</div>
              </div>
            </div>
            <div className="grow mr-2 h-full rounded-lg text-white bg-[#373737]">
              <div className="flex flex-col items-start ml-2 mt-2 justify-center">
                <div className="text-xs font-medium">Context Switches</div>
                <div className="text-3xl">{numberOfSwitches}</div>
              </div>
            </div>
          </div>
    </>
  )
}

export default Analytics;