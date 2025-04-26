import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Onboarding from './Onboarding.jsx'
import { useState } from 'react'

function Root() {
  const [seenOnboarding, setSeenOnboarding] = useState(() => {
    const state = JSON.parse(localStorage.getItem('ONBOARDING'))
    return state || false
  })

  useEffect(() =>{
    const seen = localStorage.getItem('onboarding')
  }
  ), [seenOnboarding]

  if(!seenOnboarding){
    return <Onboarding setSeenOnboarding={setSeenOnboarding}/>
  } else {
    return <App />
  }

}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
