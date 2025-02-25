import React, { useState } from 'react'
import TodoItem from './TodoItem'
import TodosList from './TodosList'

function CourseItem( {index, course, selectedCourse, todos} ) {

  const [details, setDetails] = useState(false)

  const filteredTodos = todos.filter(todo => todo.course === course)

  return (
    <div key={index} className='bg-gray-500 m-2 p-1 justify-between rounded-xl'>
      <div className='inline-flex justify-between w-full'>
        <div className='mx-1 py-1'>{course}</div>
        <button 
        className='hover:cursor-pointer px-3'
        onClick={() => {
          setDetails(prev => !prev)
        }}
        >
          {!details ? '▼' : '▲'}
        </button>
      </div>
      <div className='flex flex-col my-0'>
        {!details ? "" : 
          <TodosList padding={0} todos={filteredTodos}/>
        } 
      </div>
    </div>
  )
}

export default CourseItem
