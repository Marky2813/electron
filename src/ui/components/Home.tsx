import FocusTimer from "./FocusTimer";

function Home() {
  return (
    <>
      {/* <h5>this is the home page of our app. greeting + weather. then 2 components for focus session and progress. </h5> */}
      <main className="w-3xl">
 
        <section className=" rounded-lg text-[#1A2421] bg-gradient-to-b from-white/60 to-white/30 border-[1px] border-solid border-white border-opacity-30 shadow-black/70 shadow-sm">
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
        {/* <section className="mt-4">

          <div className="bg-[#1b1a1a] h-28 rounded-md flex items-center justify-center">
            
            <div className="flex items-center justify-center gap-3">
              <div className="h-23 w-33 bg-[#141414] rounded-lg ">
                <div className="bg-[#2e96c9] rounded-t-lg relative h-6">
                  <span className="absolute left-1 top-0.5 text-sm opacity-100 text-black">Deep Work</span>
                </div>
                <div className="text-xl h-full relative">
                 <span className="absolute right-2 bottom-7">1hr 45mins</span>
                </div>
              </div>
              <div className="h-23 w-33 bg-[#141414] rounded-lg ">
                <div className="bg-[#2e96c9] rounded-t-lg relative h-6">
                  <span className="absolute left-1 top-0.5 text-sm opacity-100 text-black">Context Switches</span>
                </div>
                <div className="text-xl h-full relative">
                 <span className="absolute left-1 top-0 text-2xl">12</span>
                </div>
              </div>
            </div>
          </div>
          {/* //today's progress 
        </section> */}

      </main>
    </>
  )
}

export default Home