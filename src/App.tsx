import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Kingdom from './Kingdom'
import { cascadeMoons, cascadeReq, cascadeMultiMoons } from './config'



function App() {



  return (
    <>
    <Kingdom name="Cascade" moonNames={cascadeMoons} moonsToLeave={5} moonColor='yellow' multiMoons={cascadeMultiMoons} moonRequirements={cascadeReq}></Kingdom>
    </>
  )
}

export default App
