import { button, div } from 'motion/react-client'
import React, { useState } from 'react'

function Onboarding( {setSeenOnboarding} ) {

  const [firstName, setFirstName] = useState('')
  const handleFirstNameChange = (event) => {
    const value = event.target.value
    setFirstName(value)
  }
  
  const [schoolName, setSchoolName] = useState('')
  const handleSchoolNameChange = (event) => {
    const value = event.target.value
    setSchoolName(value)
  }
 

  const api_key = 'a284769519eb81aa5a7b465300f050fd'
  const [defaultCity, setDefaultCity] = useState(() => {
    const savedCity = JSON.parse(localStorage.getItem('DEFAULT_CITY')) 
    return savedCity || 'New York'
  })
  const [City, setCity] = useState(defaultCity)
  const [CitySuggestions, setCitySuggestions] = useState([])
  const [inputValue, SetInputValue] = useState('')

  const [courseInput, setCourseInput] = useState('')

  const [courses, setCourses] = useState(
    {
      ELECTRICAL: ['Electrical', Date.now()],
      PHYSICS: ['Physics', Date.now() + 1],
      PHYSICS_LAB: ['Physics Lab', Date.now() + 2],
      LATINO_LITERATURE: ['Latino Literature', Date.now() + 3],
      MATH: ['Math', Date.now() + 4]
  })
  const removeCourse = (idToRemove) => {
    setCourses(prevCourses => {
      // Create a copy
      const updatedCourses = { ...prevCourses };
  
      // Loop through keys and find the one with matching ID
      for (const key in updatedCourses) {
        if (updatedCourses[key][1] === idToRemove) {
          delete updatedCourses[key]; // delete that course
          break;
        }
      }
  
      return updatedCourses;
    });
  };

  const addCourse = (courseName) => {
    setCourseInput('')
    setCourses(prevCourses => {
      const newId = Date.now(); // unique id based on current time
  
      return {
        ...prevCourses,
        [courseName.toUpperCase().replaceAll(' ', '_')]: [courseName, newId],
      }
    })
  }

  const setDefault = () => {
    setDefaultCity(City)
    window.localStorage.setItem('DEFAULT_CITY', JSON.stringify(City))
  }

  const fetchCitySuggestions = async (query) => {
    if (query.length < 3) return // Only fetch suggestions when 3 or more characters are typed
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/find?q=${query}&appid=${api_key}`)
      const data = await response.json()
      setCitySuggestions(data.list || [])
    } catch (error) {
      console.error(error)
    }
  }
  
  const handleCityChange = (event) => {
    const value = event.target.value
    SetInputValue(value)
    fetchCitySuggestions(value) // Fetch city suggestions as the user types
  }

  const handleCourseChange = (event) => {
    const value = event.target.value
    setCourseInput(value)
  }

  const handleCitySelect = (selectedCity) => {
    setCity(selectedCity.name)
    SetInputValue('')
    setShowSearch(prev => !prev)
    search(selectedCity.name) // Search the weather data for the selected city
    setCitySuggestions([]) // Clear suggestions after selecting a city
  }

  const [stage, setStage] = useState(1)

  const increase = () => {
    if (stage < 6) {
      setStage(prev => prev + 1)
    }
  }

  const decrease = () => {
    if (stage > 1) {
      setStage(prev => prev - 1)
    }
  }

  const submit = () => {
    window.localStorage.setItem('COURSE_ITEMS', JSON.stringify(courses))
    window.localStorage.setItem('FIRST_NAME', JSON.stringify(firstName))
    window.localStorage.setItem('DEFAULT_CITY', JSON.stringify(City))
    window.localStorage.setItem('SCHOOL_NAME', JSON.stringify(schoolName))
    window.localStorage.setItem('ONBOARDING', JSON.stringify(true))



    setSeenOnboarding(prev => !prev)
  }

  const courseItem = (name, id) => {
    return  (
      <div className='inline-flex justify-between pt-1 w-auto'>
        <div>
          {name}
        </div>
        <button onClick={() => {removeCourse(id)}} className='hover:bg-gray-500 hover:cursor-pointer'>
          Remove
        </button>
      </div>
    )
  }

  return (
    <div className='h-200 m-auto pt-10 min-w-300 max-w-350'>
      <div className=' h-full w-full inline-flex items-center justify-center rounded-2xl'>
        <div className='w-1/2 h-full rounded-2xl shadow-2xl shadow-blue-950 bg-gray-700 flex flex-col'>
          <div className='flex-1/34 bg-gray-600 rounded-2xl inline-flex items-center p-2'>
          <h1 className='text-4xl text-white font-mono'>Welcome to UniversityToDo!</h1>
          </div>
          <div className='flex-10'>
            <div className='flex flex-col items-start h-full p-4'>
              <div className='text-white text-3xl font-mono'>
                {stage==1? 
                <div className='flex flex-col h-135 justify-between'>
                  <div className='pt-5 text-6xl'>
                  Welcome to my App! 
                  <div className='text-2xl pt-2'>
                  Please click next to continue on...
                  </div>
                  </div>
                  <div className='text-sm'>
                    Built by Ralphael Alcober
                    <div>
                      Manhattan University
                    </div>
                  </div>
                </div> : ''}
                {stage==2? 
                <div>
                  <div className='mt-2 flex-col'>
                    <div className=''>
                      <p className='py-5'>Please enter your first name.</p>
                      <input className='bg-gray-100/10' value={firstName} onChange={handleFirstNameChange} type="text" name="" id="" />
                    </div>
                  </div>
                </div>
                
                : ''}
                {stage==3? <div>
                  <div className=''>
                      <p className='py-5'>Please enter your School.</p>
                      <input className='bg-gray-100/10' value={schoolName} onChange={handleSchoolNameChange} type="text" name="" id="" />
                    </div>
                </div> : ''}
                {stage==4? <div>
                  <div className='flex-col'>
                      <p>Please enter your City.</p>
                      <input type="text" value={inputValue} placeholder='Search City' name="" id="" onChange={handleCityChange}/>
                      {inputValue==''? '' : <div>{CitySuggestions.length > 0 && (
                        <ul>
                          {CitySuggestions.map((suggestion) => {
                            return (
                            <li 
                            key={suggestion.id}
                            className='hover:cursor-pointer hover:bg-gray-500 px-2 rounded-xl'
                            onClick={() => {
                              handleCitySelect(suggestion)

                            }}
                            >
                              {suggestion.name}, {suggestion.sys.country}
                            </li>
                            )
                          })}
                        </ul>
                      )}</div>}
                      <div className='pt-20'>City Selected:</div>
                      <div>{City}</div>
                      
                    </div>
                </div> : ''}
                {stage==5? 
                <div className='flex-col w-2xl'>
                  <p>Please Add Your Courses!:</p>
                  <div className=' inline-grid min-w-140 max-w-290 pl-5'>
                  {Object.values(courses).map((item, index) => (
                    courseItem(item[0], item[1])
                  ))}
                  </div>
                  <div className='pt-5'>
                    Add A Course
                    <div className='inline-flex justify-between w-auto'>
                      <input className='bg-gray-400/40' value={courseInput} type="text" onChange={handleCourseChange} />
                      <button onClick={() => {addCourse(courseInput)}} className='hover:bg-gray-400 hover:cursor-pointer'>Add Course</button>
                    </div>
                  </div>
                </div> : ''}
                {stage==6? 'Click Submit to move on! Thank you for visiting my page!' : ''}
                


              </div>
            </div>
          </div>
          <div className='bg-gray-600 rounded-b-2xl inline-flex flex-col flex-2'>
            <div className='bg-gray-650 inline-flex gap-5 px-10 py-2'>
              <div className='w-1/6 h-6 bg-gray-200'></div>
              <div className={`${stage>1? 'bg-gray-200' : 'bg-gray-500'} w-1/6 h-6`}></div>
              <div className={`${stage>2? 'bg-gray-200' : 'bg-gray-500'} w-1/6 h-6`}></div>
              <div className={`${stage>3? 'bg-gray-200' : 'bg-gray-500'} w-1/6 h-6`}></div>
              <div className={`${stage>4? 'bg-gray-200' : 'bg-gray-500'} w-1/6 h-6`}></div>
              <div className={`${stage>5? 'bg-gray-200' : 'bg-gray-500'} w-1/6 h-6`}></div>
            </div>
            <div className='bg-gray-600 rounded-b-2xl inline-flex flex-1 items-center p-1 pl-10 pr-10 gap-5'>
              <button onClick={decrease} className={`${stage==1? 'bg-gray-400' : 'bg-gray-300'} flex-1/2 h-3/4 rounded-bl-2xl rounded-tl-2xl font-mono ${stage==1? 'bg-gray-400' : 'hover:cursor-pointer hover:bg-gray-200'}`}>Back</button>
              {stage==6? <button onClick={submit} className='bg-gray-300 flex-1/2 h-3/4 rounded-br-2xl rounded-tr-2xl font-mono hover:cursor-pointer hover:bg-gray-200 '>Submit</button> : 
              ((firstName && stage==2) || (schoolName && stage==3) || (stage==4) || (stage==5) || (stage==1))? <button onClick={increase} className='bg-gray-300 flex-1/2 h-3/4 rounded-br-2xl rounded-tr-2xl font-mono hover:cursor-pointer hover:bg-gray-200 '>
                Next
              </button> : 
              <button className='bg-gray-500 flex-1/2 h-3/4 rounded-br-2xl rounded-tr-2xl font-mono '>
                Next
              </button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Onboarding