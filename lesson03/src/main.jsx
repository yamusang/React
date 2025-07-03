import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App' //최종
// import App from './ArrayTest.jsx'
import App from './App_V1.jsx'
import {EffectAndRef, FocusInput, PreviousValue} from './RefHookTest'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <App></App> */}
    {/* ref 훅 테스트 */}
    {/* <FocusInput></FocusInput> */}
    {/* <EffectAndRef/> */}
    <PreviousValue></PreviousValue>
  </StrictMode>,
)
