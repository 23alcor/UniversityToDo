import React from 'react'

function CourseNameListItem( {courses, course, setCourses, id} ) {

  const deleteCourse = (id) => {

    const confirmation = window.confirm("Are you sure you want to delete this course?");

    if (confirmation) {
      const filteredCourses = Object.entries(courses)
        .filter(([key, value]) => value[1] !== id)  // value[1] is the date (id)
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
          console.log(value[1])
          console.log(id)
        }, {});  // Rebuild the object
    
      setCourses(filteredCourses);  // Update the state
      console.log(id)
    }

  };

  return (
    <div className='flex justify-between'>
      <div>{course}</div>
      <button onClick={() => {deleteCourse(id)}} className='w-20 h-8 rounded-2xl bg-gray-500 hover:bg-gray-400 hover:cursor-pointer'>Remove</button>
    </div>
  )
}

export default CourseNameListItem