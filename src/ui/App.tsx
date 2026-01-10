import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [ idleTime, setIdleTime ] = useState(0); 

  useEffect(() => {
    const timer = setInterval( async () => {

      const time = await (window as any).electron.getIdleTime();
      setIdleTime(time); 
      console.log(idleTime)
    }, 1000)

    return () => clearInterval(timer);
  }, [])

  return (
    <>
      <h1>Invisible</h1>
      <h2>System Idle: {idleTime}s</h2>
    </>
  )
}

export default App
