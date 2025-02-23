import React, { useState } from 'react'
import TodoItem from './TodoItem'



function TodosList( {todos} ) {

  return (
    <>
      {
    todos.map((item, index) => (
      <TodoItem key={index} todo={item} />
    ))
    }
    </>
  )
}

export default TodosList