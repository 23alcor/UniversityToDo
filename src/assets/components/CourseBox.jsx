import React from 'react'
import CourseList from './CourseList'

function CourseBox( {todos, courses} ) {
  return (
    <div className="text-white h-150 bg-red-700 flex flex-col w-full mx-2 shadow-md rounded-lg px-4 py-0 my-0">
      Courses
      <CourseList courses={courses}/>
    </div>
  )
}

export default CourseBox