import React, { useState } from 'react'
import TodoItem from './TodoItem'



function TodosList( {todos, padding, setTodos} ) {

  return (
    <>
      {
    todos.map((item, index) => (
      <TodoItem padding={padding} key={index} todo={item} todos={todos} setTodos={setTodos} />
    ))
    }
    </>
  )
}

export default TodosList