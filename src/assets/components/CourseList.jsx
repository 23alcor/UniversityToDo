import React from 'react'
import CourseItem from './CourseItem'

function CourseList( {todos, courses} ) {
  return (
    <>
      {Object.values(courses).map((item, index) => (
        <CourseItem key={index} course={item} todos={todos}/>
      ))}

    </> 
  )
}

export default CourseList