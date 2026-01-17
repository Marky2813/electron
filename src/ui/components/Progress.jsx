import { useRef, useEffect } from "react"

function Progress({time, progressPercentage, setProgressPercentage}) {
  const inputRef = useRef(null);
  useEffect(() => {
   inputRef.current.setAttribute("role", "progressbar"); 
  }, [])
  useEffect(() => {
    inputRef.current.setAttribute("aria-valuetext", time); 
    inputRef.current.style.setProperty('--progress', progressPercentage + "%")

  }, [time, progressPercentage])
  return (
   <>
    <div className="progress-bar" ref={inputRef}>
    </div>
   </>
  ); 
}

export default Progress