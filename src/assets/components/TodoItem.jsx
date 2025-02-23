import React from 'react'

function TodoItem( {todo, index} ) {
  return (
    <div key={index} className='bg-gray-500 inline-flex justify-between'>
      {todo}
      <input type="radio" name="" id="" />
      </div>
  )
}

export default TodoItem