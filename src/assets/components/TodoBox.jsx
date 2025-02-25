import React, { useState } from 'react'
import TodosList from './TodosList'

function TodoBox( {todos, setTodos, selectedCourse} ) {



  return (
    <div className="text-white h-150 bg-gray-700 flex flex-col w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-0 my-0">
      <h2 className='h-10 bg-gray-700 m-2 text-3xl'>Coming Up</h2>
      <TodosList padding={2} setTodos={setTodos} todos={todos}/>
    </div>
  )
}

export default TodoBox