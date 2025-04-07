import React, { useState, useRef, useEffect } from 'react'

function TodoItem( {todo, index, padding, todos, setTodos , uncompleted_todos} ) {

  const [checked, setChecked] = useState(false)
  const [optionsVisibility, setOptionsVisibility] = useState(false)
  const [editTask, setEditTask] = useState(false)
  const [taskTitle, setTaskTitle] = useState(todo.task)

  const inputRef = useRef(null)
 
  const clicked = () => {
    setChecked(checked => !checked)
    setTodos((prevTodos) => 
      prevTodos.map((t) =>
        t.id === todo.id ? {...t, completed: !t.completed } : t
      )
    )
  }
  
  const optionsClicked = () => {
    setOptionsVisibility((prev) => !prev)
  }

  const deleteTodo = (id) => {
    const filteredTodos = todos.filter((focus) => {
      return focus.id !== id
    })
    setTodos(filteredTodos) 
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [editTask])

  return (
    <div key={index} className={`bg-gray-500 group inline-flex justify-between mx-2 my-1 p-${padding} rounded-2xl`}>
      <div className='inline-flex items-center mx-2'>
        <div className='inline-flex justify-between w-full'>
          <div className='flex justify-center items-center'>
            <button 
            onClick={clicked}
            className='bg-gray-200 h-5 w-5 hover:bg-green-600 hover:cursor-pointer'
            >

            </button>
          </div>
          <div className='mx-2 w-full'>
            {!editTask ? todo.task : 
              <input 
                ref={inputRef}
                type="text"
                value={taskTitle}
                onChange={(e) => {
                  todos.filter((todo) => {
                    return 
                  })
                  setTaskTitle(e.value)
                }}
              />
            }
          </div>
        
          {!editTask ? '' :
          <button
          onClick={() => {
            setEditTask(prev => !prev)
            setOptionsVisibility(false)
          }}
          className='hover:cursor-pointer hover:bg-gray-600'>
            DONE
          </button>
          }
          {!optionsVisibility ? '' : 
            <div className='inline-flex gap-2 ml-2'>
              <button 
              onClick={() => {deleteTodo(todo.id)}}
              className='hover:cursor-pointer hover:bg-gray-600 rounded-2xl'>Delete</button>
              <button 
              onClick={() => {
                setEditTask(true)
                inputRef.current?.focus()
              
              }}
              className='hover:cursor-pointer hover:bg-gray-600 rounded-2xl'>
                Edit
              </button>
            </div>
          }
        </div>
      </div>
      <div>
        
        <button 
        onClick={optionsClicked}
        className='mx-2 text-2xl opacity-0 transition-opacity group-hover:opacity-100 hover:cursor-pointer'>
          ⋯
        </button>
      </div> 


    </div>
  )
}

export default TodoItem