import { useState, useEffect } from 'react'
import './App.css'
import TodoBox from './assets/components/TodoBox'
import CourseBox from './assets/components/CourseBox'
import Weather from './assets/components/Weather/Weather'

function App() {

  let todoItems



  // This section is for local storage of Todos
  // Get localStorage todos / No bracket so that it runs once when page reloads

  const [todos, setTodos] = useState(() => {
    const savedTodos = JSON.parse(localStorage.getItem('TODO_ITEMS')) 
    return savedTodos || [{ task: 'First Task! Click Check Box to Complete and Add Your Own!', course: '', id: Date.now(), completed: false }]
  })
  const [inputText, setInputText] = useState("")
  const [courseChoice, setCourseChoice] = useState("")
  const [selectedCourse, setSelectedCourse] = useState('Course')

  // Store in localStorage
  useEffect(() => {
    window.localStorage.setItem('TODO_ITEMS', JSON.stringify(todos))
  }, [todos])


  const COURSES = {
    ELECTRICAL: 'Electrical',
    PHYSICS: 'Physics',
    PHYSICS_LAB: 'Physics Lab',
    LATINO_LITERATURE: 'Latino Literature',
    MATH: 'Math'
  }

  const handleChange = (event) => {
    setSelectedCourse(event.target.value)
  }

  const addTodo = () => {
    if (inputText.trim() !== "") {
      const newItem = {
        task: inputText,
        course: selectedCourse,
        id: Date.now(),
        completed: false
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
