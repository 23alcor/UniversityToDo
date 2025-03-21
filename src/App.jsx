import { useState } from 'react'
import './App.css'
import TodoBox from './assets/components/TodoBox'
import CourseBox from './assets/components/CourseBox'
import Weather from './assets/components/Weather/Weather'

function App() {

  const COURSES = {
    ELECTRICAL: 'Electrical',
    PHYSICS: 'Physics',
    PHYSICS_LAB: 'Physics Lab',
    LATINO_LITERATURE: 'Latino Literature',
    MATH: 'Math'
  }

  const [todos, setTodos] = useState([{task: 'Ralph', course: 'Electrical', id: Date.now()}])
  const [inputText, setInputText] = useState("")
  const [courseChoice, setCourseChoice] = useState("")
  const [selectedCourse, setSelectedCourse] = useState('Course')

  const handleChange = (event) => {
    setSelectedCourse(event.target.value)
  }

  const addTodo = () => {
    if (inputText.trim() !== "") {
      const newItem = {
        task: inputText,
        course: selectedCourse,
        id: Date.now()
      }
      setTodos([...todos, newItem])
      setInputText("")
      setSelectedCourse('')
    }
  }

  const deleteTodo = () => {

  }


  return (
    <div className='flex justify-center'>
      <div className="inline-flex w-full items-center max-w-7xl shadow-md rounded-lg px-4 py-2 my-30 bg-gray-800 text-orange-500">
        <TodoBox todos={todos} setTodos={setTodos}/>
        <CourseBox selectedCourse={selectedCourse} handleChange={handleChange} courseChoice={courseChoice} setCourseChoice={setCourseChoice} setInputText={setInputText} inputText={inputText} addTodo={addTodo} todos={todos} setTodos={setTodos} courses={COURSES}/>
        <Weather/>
      </div>
    </div>
  )
}

export default App
