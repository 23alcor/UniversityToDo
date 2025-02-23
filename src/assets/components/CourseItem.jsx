import React, { useState } from 'react'

function CourseItem( {index, course} ) {

  const [details, setDetails] = useState(false)

  return (
    <div key={index} className='bg-gray-500 m-2 p-1 justify-between'>
      <div className='inline-flex justify-between w-full'>
        <div>{course}</div>
        <button 
        className='hover:cursor-pointer'
        onClick={() => {
          setDetails(prev => !prev)
        }}
        >
          {!details ? '▼' : '▲'}
        </button>
      </div>
      {!details ? "" : <div>hello</div>} 
    </div>
  )
}

export default CourseItem
