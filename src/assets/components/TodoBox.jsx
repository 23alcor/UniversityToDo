import React, { useState, useEffect } from 'react'
import TodosList from './TodosList'
import RecentList from './RecentList'
import { AnimatePresence, motion } from "motion/react"

function TodoBox( {todos, setTodos, selectedCourse} ) {

  const [showRecents, setShowRecents] = useState(false)

  const firstName = JSON.parse(localStorage.getItem('FIRST_NAME'))
  const schoolName = JSON.parse(localStorage.getItem('SCHOOL_NAME'))
  
  const [uncompleted_todos, setUncompleted_Todos] = useState([])
  const [completed_todos, setCompleted_Todos] = useState([])

  useEffect(() => {
    setUncompleted_Todos(todos.filter((todo) => !todo.completed))
    setCompleted_Todos(todos.filter((todo) => todo.completed))
  }, [todos])

  return (
    <div className='relative'>
      <div className='absolute -top-14 -left-4 rounded-t-2xl bg-gray-800 w-120 h-12 flex justify-center items-center'>
        <div className='text-4xl text-white font-mono bg-gray-500 w-105 rounded-2xl flex justify-center rounded-b-none'>
          University To/Do
        </div>
      </div>
      <div className='absolute -top-14 left-150 rounded-t-2xl bg-gray-800 w-120 h-12 flex justify-center items-center'>
        <div className='text-4xl text-white font-mono bg-gray-500 w-105 rounded-2xl flex justify-center rounded-b-none'>
          Welcome {firstName}
        </div>
      </div>
      <div className='absolute -top-14 left-365 rounded-t-2xl bg-gray-800 w-80 h-12 flex justify-center items-center'>
        <div className='text-1xl text-white font-mono bg-gray-500 w-70 rounded-2xl flex justify-center rounded-b-none'>
          Welcome {schoolName}
        </div>
      </div>

      <div className="text-white h-150 bg-gray-700 flex flex-col w-150 mx-auto shadow-md rounded-lg px-4 py-0 my-0">
        <h2 className='h-10 bg-gray-700 m-2 text-3xl'>Coming Up</h2>
        <div className='relative w-full h-full flex flex-col justify-between '>
          <div className='relative w-full flex-col flex overflow-y-scroll h-120 pb-12 scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-100'>
            <TodosList padding={2} setTodos={setTodos} completed_todos={completed_todos} uncompleted_todos={uncompleted_todos} todos={todos}/>
          </div>
          {!showRecents ? <div className="pointer-events-none absolute bottom-16 left-0 right-0 h-12 bg-gradient-to-t from-gray-700 to-transparent rounded-b"></div> : ''}
          
          <div className='h-20'>
          <AnimatePresence>
            {showRecents ? 
            <motion.div initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.4 } }}
            exit={{ opacity: 0, scale: 1, transition: { delay: 0} }}
            key="box"
            
             className='w-full h-40  p-2 -top-50 border-8 bg-gray-700 border-gray-800 rounded-2xl flex-col overflow-y-scroll scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-100' >
              <div className='flex justify-between'>
                <h1>Recently Completed</h1>
                <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                
                className='px-2 rounded-lg bg-gray-600 hover:bg-gray-500 hover:cursor-pointer' onClick={() => {setShowRecents((prev) => !prev)}}>Hide Recents</motion.button>
              </div>
              <RecentList completed_todos={completed_todos} setTodos={setTodos} todos={todos}/>
            </motion.div> : 
              <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, transition: { delay: 0.4 } }}
              exit={{ opacity: 0, scale: 1, transition: { delay: 0} }}
              key="showResults"
              
              className='my-4 p-1 px-2 rounded-lg bg-gray-600 hover:bg-gray-500 hover:cursor-pointer' onClick={() => {setShowRecents((prev) => !prev)}}>Show Recents</motion.button>
              }
          </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodoBox