import { useState, useEffect } from 'react'
import './App.css'
import TodoBox from './assets/components/TodoBox'
import CourseBox from './assets/components/CourseBox'
import Weather from './assets/components/Weather/Weather'

function App() {



  // This section is for local storage of Todos
  // Get localStorage todos / No bracket so that it runs once when page reloads

  const [todos, setTodos] = useState(() => {
    const savedTodos = JSON.parse(localStorage.getItem('TODO_ITEMS')) 
    return savedTodos || [{ task: 'First Task! Click Check Box to Complete and Add Your Own!', course: '', id: Date.now(), completed: false }]
  })
  const [inputText, setInputText] = useState("")
  const [courseChoice, setCourseChoice] = useState("")
  const [selectedCourse, setSelectedCourse] = useState('Course')
  
  const [courses, setCourses] = useState(() => {
    const savedCourses = JSON.parse(localStorage.getItem('COURSE_ITEMS'))
    return savedCourses || {
      ELECTRICAL: ['Electrical', Date.now()],
      PHYSICS: ['Physics', Date.now() + 1],
      PHYSICS_LAB: ['Physics Lab', Date.now() + 2],
      LATINO_LITERATURE: ['Latino Literature', Date.now() + 3],
      MATH: ['Math', Date.now() + 4]
    }
  })


  const [courseInputText, setCourseInputText] = useState("")

  // Store in localStorage
  useEffect(() => {
    window.localStorage.setItem('TODO_ITEMS', JSON.stringify(todos))
    window.localStorage.setItem('COURSE_ITEMS', JSON.stringify(courses))
  }, [todos, courses])

  const handleChange = (event) => {
    setSelectedCourse(event.target.value)
  }

  const addCourse = () => {

    const key = courseInputText.trim().toUpperCase().replace(/\s+/g, '_') // Make a safe key
    const value = courseInputText.trim()

    console.log(key)
    console.log(value)
    
    setCourses(prev => ({
      ...prev,
      [key]: [value, Date.now()]
    }))
    console.log(courses)
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


  return (
    <div className='flex justify-center'>
      <div className="inline-flex w-full items-center max-w-7xl shadow-md rounded-lg px-4 py-2 my-30 bg-gray-800 text-orange-500">
        <TodoBox todos={todos} setTodos={setTodos}/>
        <CourseBox 
        selectedCourse={selectedCourse} 
        handleChange={handleChange} 
        courseChoice={courseChoice} 
        setCourseChoice={setCourseChoice} 
        setInputText={setInputText} 
        inputText={inputText} 
        addTodo={addTodo} 
        todos={todos} 
        setTodos={setTodos} 
        courses={courses}
        setCourses={setCourses}
        courseInputText={courseInputText}
        setCourseInputText={setCourseInputText}
        addCourse={addCourse}
        />
        <Weather/>
      </div>
    </div>
  )
}

export default App
