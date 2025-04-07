import React, { useState } from 'react'
import TodoItem from './TodoItem'



function TodosList( {todos, padding, setTodos, uncompleted_todos} ) {

  

  return (
    <>
      {
    uncompleted_todos.map((item, index) => (
      <TodoItem padding={padding} key={index} todo={item} uncompleted_todos={uncompleted_todos} todos={todos} setTodos={setTodos} />
    ))
    } 
    </>
  )
}

export default TodosList