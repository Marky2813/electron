import '../App.css'
import Home from './Home'
import { TimerProvider } from '../timerContext'

//to implement the pause functionality. 
function App() {
  return (
    <>
      {/*each of our component must perform a single function. As of now we have a home page. in that home page we have 2 components. home and the other one is progress.*/}
      <TimerProvider>
        <Home />
      </TimerProvider>
    </>
  )
}

export default App
