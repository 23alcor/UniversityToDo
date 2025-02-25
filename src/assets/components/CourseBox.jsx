import React, { useState } from 'react'
import CourseList from './CourseList'

function CourseBox( { selectedCourse, handleChange, inputText, setInputText, addTodo, todos, courses, setTodos} ) {

  return (
    <div className="text-white h-150 bg-gray-700 flex flex-col justify-between w-full mx-2 shadow-md rounded-lg px-4 py-0 my-0">
      <div>
        <h2 className='mx-2 text-3xl my-2'>Courses</h2>
        <CourseList todos={todos} courses={courses}/>
      </div>
      <div className='inline-flex'>
        <input 
        className='border mx-2 px-16' 
        type="text" 
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        />
        <select value={selectedCourse} onChange={handleChange} className='border' id="course">
          <option value="" disabled>Select a course</option>
          {Object.values(courses).map((item, index) => (
          <option key={index} value={item}>{item}</option>
          ))}
        </select>
        <button onClick={addTodo} className='border mx-2'>Add Todo</button>
      </div>
        
        
    </div>
  )
}

export default CourseBox