import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Kingdom from './Kingdom'
import { cascadeMoons, cascadeReq } from './config'



function App() {



  return (
    <>
    <Kingdom name="Cascade" moonNames={cascadeMoons} moonsToLeave={5} moonColor='yellow' moonRequirements={cascadeReq}></Kingdom>
    </>
  )
}

export default App
