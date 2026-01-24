import FocusTimer from "./FocusTimer";

function Home() {
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
        <section className="mt-4 h-28 rounded-lg text-[#1A2421] bg-gradient-to-b from-white/60 to-white/30 border-[1px] border-solid border-white border-opacity-30 shadow-black/70 shadow-sm">

          <div className="relative h-8">
            <span className="absolute left-2">Analytics</span>
          </div>
          <div className="flex items-center justify-center gap-2 h-17">
            <div className="bg-[#f8f8f8] grow ml-2 h-full rounded-lg">
              <div className="flex flex-col items-start ml-2 mt-2 justify-center">
                <div className="text-xs">Deep Work</div>
                <div className="text-3xl">1h 45m</div>
              </div>
            </div>
            <div className="bg-[#f8f8f8] grow mr-2 h-full rounded-lg">
              <div className="flex flex-col items-start ml-2 mt-2 justify-center">
                <div className="text-xs">Context Switches</div>
                <div className="text-3xl">12</div>
              </div>
            </div>
          </div>
        </section> 

      </main>
    </>
  )
}

export default Home