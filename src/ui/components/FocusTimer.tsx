import { useEffect, useState } from "react";


function FocusTimer() {
  const [duration, setDuration] = useState(15);
  const [remaianingTime, setRt] = useState(0);
  const [started, setStarted] = useState(false);

  function Timer() {
    setStarted(true);
    setRt(duration);
    console.log("timer started!")
    const intervalId = setInterval(() => {
      setRt((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalId);
          setStarted(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 60 * 1000);
  }
  useEffect(() => {
    setRt(duration);
  }, [duration])

  useEffect(() => {
    console.log(remaianingTime)
  }, [remaianingTime])

  return (
    <>
      {
        started ?
          <section>
            <h3>focus session running<h4>remaining time: {remaianingTime}min</h4></h3>
            <button>pause</button>
          </section>
          :
          <section>
            <h3>Enter Duration: <input type="text"
              placeholder="focus time in minutes"
              value={duration}
              onChange={(e) => {
                const value = (e.target.value);
                setDuration(Number(value));
              }}></input>mins</h3>
            <button onClick={Timer}>Start</button>
          </section>
      }
    </>
  )
}

export default FocusTimer; 