import React, { useState, useRef, useEffect } from 'react'
import { compile } from 'tailwindcss'

function RecentItem( {todo, index, padding, todos, setTodos} ) {

  const [taskTitle, setTaskTitle] = useState(todo.task)

  const inputRef = useRef(null)

  const deleteTodo = (id) => {
    const filteredTodos = todos.filter((focus) => {
      return focus.id !== id
    })
    setTodos(filteredTodos)
  }

  return (
    <div key={todo.id} className={`bg-gray-500 group inline-flex justify-between w-full my-1 p-${padding} rounded-2xl`}>
      <div className='ml-2'>
        {taskTitle}
      </div>
      <div className='inline-flex mr-2 gap-2'>
        <button
        onClick={() => {setTodos((prevTodos) => 
          prevTodos.map((t) =>
            t.id === todo.id ? {...t, completed: !t.completed } : t
          )
        )}}
        className='hover:cursor-pointer hover:bg-gray-600 rounded-2xl'
        >
          Restore
        </button>
        <button 
        onClick={() => {deleteTodo(todo.id)}}
        className='hover:cursor-pointer hover:bg-gray-600 rounded-2xl'>Delete</button>
      </div>
    </div>
  )
}

export default RecentItem