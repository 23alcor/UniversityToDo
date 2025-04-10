import React from 'react'
import TodoItem from './TodoItem'
import RecentItem from './RecentItem'

function RecentList( {todos, completed_todos, setTodos} ) {

  console.log(completed_todos)


  return (
    <>
    {
      completed_todos.map((item, index) => (
        <RecentItem todo={item} todos={todos} setTodos={setTodos} completed_todos={completed_todos} key={item.id} />
      ))
    }
  </>
  )
}

export default RecentList