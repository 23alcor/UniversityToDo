import React, { useState } from 'react'
import TodosList from './TodosList'

function TodoBox( {todos, setTodos} ) {

  const [inputText, setInputText] = useState("")

  const addTodo = () => {
    if (inputText.trim() !== "") {
      setTodos([...todos, inputText])
      setInputText("")
    }
  }

  return (
    <div className="text-white h-150 bg-red-700 flex flex-col w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-0 my-0">
      <p className='h-10 bg-blue-700'>Coming Up</p>
      <TodosList todos={todos}/>

      <input 
      className='border' 
      type="text" 
      value={inputText}
      onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={addTodo} className='border'>Add Todo</button>
    </div>
  )
}

export default TodoBox