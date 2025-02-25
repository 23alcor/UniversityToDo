import React from 'react'
import CourseItem from './CourseItem'

function CourseList( {courses, selectedCourse, todos} ) {
  return (
    <>
      {Object.values(courses).map((item, index) => (
        <CourseItem todos={todos} selectedCourse={selectedCourse} key={index} course={item} />
      ))}

    </>
  )
}

export default CourseList