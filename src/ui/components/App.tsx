import '../App.css'
import Home from './Home'
import { TimerProvider } from '../timerContext'
import { HashRouter, Routes, Route } from 'react-router-dom'; 
import InDepthAnalytics from './InDepthAnalytics';

//to implement the pause functionality. 
function App() {
  return (
    <>
      {/*each of our component must perform a single function. As of now we have a home page. in that home page we have 2 components. home and the other one is progress.*/}
      <TimerProvider>
        <HashRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/indepthanalytics' element={<InDepthAnalytics />} />
          </Routes>
        </HashRouter>
      </TimerProvider>
    </>
  )
}

export default App
