import FocusTimer from "./FocusTimer";

function Home() {
  return (
    <>
      {/* <h5>this is the home page of our app. greeting + weather. then 2 components for focus session and progress. </h5> */}
     <main className="w-3xl"> 
      <header className="flex justify-between items-center mb-5">
        <span className="font-[CoromontGaramond] text-3xl">Good Afternoon!</span>
      </header>
      <section>
        <div className="bg-[#f8e9b4] rounded-t-2xl relative h-6">
          <span className="absolute left-3 z-10 opacity-100">Focus Session</span>
        </div>
        <div className="bg-[#F6D868] h-58">
          <FocusTimer />
        </div>
        <div className="bg-[#F6D868] rounded-b-2xl h-6">
        </div>
      {/* //today's progress */}
      </section>
    </main>
    </>
  )
}

export default Home