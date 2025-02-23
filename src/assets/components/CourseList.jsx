import React from 'react'
import CourseItem from './CourseItem'

function CourseList( {courses} ) {
  return (
    <>
      {Object.values(courses).map((item, index) => (
        <CourseItem key={index} course={item} />
      ))}

    </>
  )
}

export default CourseList