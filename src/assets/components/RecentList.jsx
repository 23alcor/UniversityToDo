import React from 'react'
import TodoItem from './TodoItem'
import RecentItem from './RecentItem'

function RecentList( {todos, completed_todos, setTodos} ) {
  return (
    <>
    {
      completed_todos.map((item, index) => (
        <RecentItem todo={item} todos={todos} setTodos={setTodos} completed_todos={completed_todos} key={index} />
      ))
    }
  </>
  )
}

export default RecentList