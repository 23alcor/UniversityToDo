import React, { useState } from 'react'
import CourseList from './CourseList'
import CourseNameListItem from './CourseNameListItem'
import { motion, AnimatePresence } from "motion/react"
import { div } from 'motion/react-client'

function CourseBox( { selectedCourse, handleChange, inputText, setInputText, addTodo, todos, courses, addCourse, setCourses, setTodos, setCourseInputText, courseInputText} ) {

  const [showCourses, setShowCourses] = useState(true)
  const AddButtonClick = () => {
    addCourse()
    setShowCourses(prev => !prev)
    setCourseInputText('')
  }

  return (
    <div className="text-white h-150 bg-gray-700 flex flex-col justify-between w-600 mx-2 shadow-md rounded-lg px-4 py-0 my-0 overflow-hidden">
      <div> 
        <div className='flex justify-between'>
          <h2 className='mx-2 text-3xl my-2'>Courses</h2>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}


            onClick={() => setShowCourses(prev => !prev)}
            className='bg-gray-500 mt-4 mr-2 rounded-2xl h-8 w-12 hover:cursor-pointer hover:bg-gray-400'>
              {showCourses ? 'Edit' : 'Done'}
          </motion.button>
        </div>
        <div className='relative'>
        <AnimatePresence>
          {showCourses ?
            <motion.div
              layout
              initial={{ opacity: 0, x: -1000 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                transition: {
                  type: "spring",
                  stiffness: 100,  // Less stiffness = more bounce
                  damping: 18,    // Less damping = more oscillation
                  mass: 1       // Lower mass = snappier movement
                }
              }}
              exit= {{
                opacity: 0,
                x: -1000
              }}
              key="CourseList"
              className='absolute w-full'
            >
            <CourseList todos={todos} courses={courses}/>
            </motion.div> : 
            <motion.div
            layout
            initial={{ opacity: 0, x: 1000 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              transition: {
                type: "spring",
                stiffness: 100,  // Less stiffness = more bounce
                damping: 18,    // Less damping = more oscillation
                mass: 1       // Lower mass = snappier movement
              }
            }}
            
            exit= {{
              opacity: 0,
              x: 1000
            }}
            key='Edit' 
            
            className='flex flex-col h-50 absolute w-full'>
              <div className='mt-2'><h2 className='text-3xl'>Add a Course:</h2></div>
              <div className='my-2'><h3 className='text-2xl'>Course Name</h3></div>
              <input 
              className='border w-120 px-1' 
              type="text" 
              laceholder='Math...' 
              value={courseInputText}  
              onChange={(e) => setCourseInputText(e.target.value)}
              name="" 
              id="" />
              <button onClick={AddButtonClick} className='my-2 h-10 border w-24 text-s hover:cursor-pointer hover:bg-gray-400'>Add Course</button>
              <div className='flex flex-col'>
                <h2 className='text-3xl mb-2'>Remove a Course:</h2>
                <div className='relative'>
                  <div className='overflow-y-scroll h-70 scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-100 pb-8'>
                    <ul>
                      {Object.values(courses).map((item, index) => (
                        <li className='py-1' key={index}>
                          <CourseNameListItem courses={courses} course={item[0]} id={item[1]} setCourses={setCourses}/>
                        </li>
                      ))}
                    </ul>
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-700 to-transparent rounded-b" /></div>
                  </div>
              </div>
            </motion.div>
          }
        </AnimatePresence>
        </div>
      </div>
      <div className='flex flex-col'>
        <div className='pl-2'><h2 className='text-2xl'>Add a Task</h2></div>
        <div className='inline-flex justify-between h-8 pb-2'>
          <input 
          className='border mx-2 w-full px-2 rounded-2xl' 
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          />
          <select value={selectedCourse} onChange={handleChange} className='border rounded-2xl px-2' id="course">
            <option value="" disabled>Select a course</option>
            {Object.values(courses).map((item, index) => (
            <option key={index} value={item[0]}>{item[0]}</option>
            ))}
          </select>
          <button onClick={addTodo} className='border mx-2 w-26 text-xs rounded-2xl'>Add Todo</button>
        </div>
      </div>
        
    </div>
  )
}

export default CourseBox