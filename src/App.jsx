import { useState } from 'react'
import './App.css'
import TodoBox from './assets/components/TodoBox'
import CourseBox from './assets/components/CourseBox'

function App() {

  const COURSES = {
    ELECTRICAL: 'Electrical',
    PHYSICS: 'Physics',
    PHYSICS_LAB: 'Physics Lab',
    LATINO_LITERATURE: 'Latino Literature',
    MATH: 'Math'
  }

  const [todos, setTodos] = useState(['ralph'])


  return (
    <div className="inline-flex w-full items-center max-w-7xl mx-auto shadow-md rounded-lg px-4 py-2 my-30 bg-gray-800 text-orange-500">
      <TodoBox todos={todos} setTodos={setTodos}/>
      <CourseBox todos={todos} courses={COURSES}/>
    </div>
  )
}

export default App
