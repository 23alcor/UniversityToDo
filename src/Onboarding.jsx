import { div } from 'motion/react-client'
import React, { useState } from 'react'

function Onboarding( {setSeenOnboarding} ) {

  const [stage, setStage] = useState(1)

  const increase = () => {
    if (stage < 6) {
      setStage(prev => prev + 1)
    }
  }

  const decrease = () => {
    if (stage > 1) {
      setStage(prev => prev - 1)
    }
  }

  const submit = () => {
    setSeenOnboarding(prev => !prev)
  }

  return (
    <div className='h-200 ml-60 mr-60 pt-10'>
      <div className=' h-full w-full inline-flex items-center justify-center rounded-2xl'>
        <div className='w-1/2 h-full rounded-2xl shadow-2xl shadow-blue-950 bg-gray-700 flex flex-col'>
          <div className='flex-1/34 bg-gray-600 rounded-2xl inline-flex items-center p-2'>
          <h1 className='text-4xl text-white font-mono'>Welcome to UniversityToDo!</h1>
          </div>
          <div className='flex-10'>
            <div className='flex flex-col items-start h-full p-4'>
              <div className='text-white text-3xl font-mono'>
                {stage==1? 'Welcome to my App! Please click next to continue on...' : ''}
                {stage==2? 
                <div>
                  <div className='mt-2 flex-col'>
                    <div className=''>
                      <p className=''>Please enter your first name.</p>
                      <input className='bg-gray-100/10' type="text" name="" id="" />
                    </div>
                    <div>
                      <p>Please enter your School.</p>
                      <input className='bg-gray-100/10' type="text" name="" id="" />
                    </div>
                    <div>
                      <p>Please enter your School.</p>
                      <input className='bg-gray-100/10' type="text" name="" id="" />
                    </div>
                  </div>
                </div>
                
                : ''}
                {stage==3? 'This is the Third Page!' : ''}
                {stage==4? 'This is the Fourth Page!' : ''}
                {stage==5? 'This is the Fifth Page!' : ''}
                {stage==6? 'This is the Sixth Page!' : ''}
                


              </div>
            </div>
          </div>
          <div className='bg-gray-600 rounded-b-2xl inline-flex flex-col flex-2'>
            <div className='bg-gray-650 inline-flex gap-5 px-10 py-2'>
              <div className='w-1/6 h-6 bg-gray-200'></div>
              <div className={`${stage>1? 'bg-gray-200' : 'bg-gray-500'} w-1/6 h-6`}></div>
              <div className={`${stage>2? 'bg-gray-200' : 'bg-gray-500'} w-1/6 h-6`}></div>
              <div className={`${stage>3? 'bg-gray-200' : 'bg-gray-500'} w-1/6 h-6`}></div>
              <div className={`${stage>4? 'bg-gray-200' : 'bg-gray-500'} w-1/6 h-6`}></div>
              <div className={`${stage>5? 'bg-gray-200' : 'bg-gray-500'} w-1/6 h-6`}></div>
            </div>
            <div className='bg-gray-600 rounded-b-2xl inline-flex flex-1 items-center p-1 pl-10 pr-10 gap-5'>
              <button onClick={decrease} className={`${stage==1? 'bg-gray-400' : 'bg-gray-300'} flex-1/2 h-3/4 rounded-bl-2xl rounded-tl-2xl font-mono ${stage==1? 'bg-gray-400' : 'hover:cursor-pointer hover:bg-gray-200'}`}>Back</button>
              {stage==6? <button onClick={submit} className='bg-gray-300 flex-1/2 h-3/4 rounded-br-2xl rounded-tr-2xl font-mono hover:cursor-pointer hover:bg-gray-200 '>Submit</button> : <button onClick={increase} className='bg-gray-300 flex-1/2 h-3/4 rounded-br-2xl rounded-tr-2xl font-mono hover:cursor-pointer hover:bg-gray-200 '>Next</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Onboarding