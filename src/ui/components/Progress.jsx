import { useRef, useEffect } from "react"

function Progress({time, progressPercentage, setProgressPercentage}) {
  const inputRef = useRef(null);
  
  useEffect(() => {
    inputRef.current.setAttribute("role", "progressbar"); 
  }, [])

  return (
    <div 
      className="progress-bar" 
      ref={inputRef}
      role="progressbar"
      aria-valuetext={time}
      style={{'--progress': `${progressPercentage}%`}}
    >
    </div>
  ); 
}

export default Progress