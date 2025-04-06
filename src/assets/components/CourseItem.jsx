import React, { useState } from 'react'
import TodoItem from './TodoItem'
import TodosList from './TodosList'

function CourseItem( {index, course, todos} ) {

  const [details, setDetails] = useState(false)

  const filteredTodos = todos.filter(todo => todo.course === course[0])

  return ( 
    <div key={index} className='bg-gray-500 m-2 p-1 justify-between rounded-xl'>
      <div className='inline-flex justify-between w-full'>
        <div className='mx-1 py-1'>{course[0]}</div>
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
          <TodosList padding={0} uncompleted_todos={filteredTodos} todos={todos}/>
        } 
      </div>
    </div>
  )
}

export default CourseItem
