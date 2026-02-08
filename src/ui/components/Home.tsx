import FocusTimer from "./FocusTimer";
import Analytics from './analytics'
import {useTimer} from '../timerContext'
import { useNavigate } from "react-router-dom";

function Home() {
    const {
      timerState,
    } = useTimer();
    const navigate = useNavigate(); 

    function showInDepth() {
      navigate("/indepthanalytics");
    }
  return (
    <>
      {/* <h5>this is the home page of our app. greeting + weather. then 2 components for focus session and progress. </h5> */}
      <main className="w-3xl">
 
        <section className="rounded-lg text-[#1A2421] bg-gradient-to-b from-white/60 to-white/30 border-[1px] border-solid border-white border-opacity-30 shadow-black/70 shadow-sm">
          <div className="rounded-t-md relative h-6 ">
            <span className="absolute left-2 z-10 opacity-100">Focus Session</span>
          </div>
          <div className=" h-80">
            <FocusTimer />
          </div>
          <div className="rounded-b-md h-6">
          </div>
          {/* //today's progress */}
        </section>
        { (timerState === "Intialized" || timerState === "Completed") && <section className="mt-4 h-28 rounded-lg text-[#1A2421] bg-gradient-to-b from-white/60 to-white/30 border-[1px] border-solid border-white border-opacity-30 shadow-black/70 shadow-sm hover:scale-102 transition duration-200 ease-in-out backfacae-hidden transform-gpu translate3d antialiased" onClick={showInDepth}>
          <Analytics />
        </section>}
      </main>
    </> 
  )
}

export default Home