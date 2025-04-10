import React, { useState } from 'react'
import TodoItem from './TodoItem'



function TodosList( {todos, padding, setTodos, uncompleted_todos, completed_todos} ) {

  

  return (
    <div className='flex flex-col'>
      {
    uncompleted_todos.map((item, index) => (
      <TodoItem padding={padding} key={index} todo={item} completed_todos={completed_todos} uncompleted_todos={uncompleted_todos} todos={todos} setTodos={setTodos} />
    ))
    } 
    </div>
  )
}

export default TodosList