import React, { useState, useEffect } from 'react'
import TodosList from './TodosList'
import RecentList from './RecentList'

function TodoBox( {todos, setTodos, selectedCourse} ) {

  const [showRecents, setShowRecents] = useState(false)
  

  const [uncompleted_todos, setUncompleted_Todos] = useState([])
  const [completed_todos, setCompleted_Todos] = useState([])

  useEffect(() => {
    setUncompleted_Todos(todos.filter((todo) => !todo.completed))
    setCompleted_Todos(todos.filter((todo) => todo.completed))
  }, [todos])

  return (
    <div className="text-white h-150 bg-gray-700 flex flex-col w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-0 my-0">
      <h2 className='h-10 bg-gray-700 m-2 text-3xl'>Coming Up</h2>
      <div className='w-full h-full flex flex-col justify-between'>
        <TodosList padding={2} setTodos={setTodos} uncompleted_todos={uncompleted_todos} todos={todos}/>
        <div>
          {showRecents ? 
          <div className='w-full bg-gray-700 rounded-2xl h-45 my-2 p-2 border-8 border-gray-800 flex-col' >
            <div className='flex justify-between'>
              <h1>Recently Deleted</h1>
              <button className='px-2 rounded-lg bg-gray-600 hover:bg-gray-500 hover:cursor-pointer' onClick={() => {setShowRecents((prev) => !prev)}}>Hide Recents</button>
            </div>
            <RecentList completed_todos={completed_todos} setTodos={setTodos} todos={todos}/>
          </div> : 
            <button className='my-4 p-1 px-2 rounded-lg bg-gray-600 hover:bg-gray-500 hover:cursor-pointer' onClick={() => {setShowRecents((prev) => !prev)}}>Show Recents</button>
            }
        </div>
      </div>
    </div>
  )
}

export default TodoBox