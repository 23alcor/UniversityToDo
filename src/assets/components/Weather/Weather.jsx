import React, { useEffect, useState } from 'react'

import clear_icon from '../../images/01d.png'
import cloud_icon from '../../images/02d.png'
import drizzle_icon from '../../images/09d.png'
import rain_icon from '../../images/10d.png'
import snow_icon from '../../images/13d.png'
import mist_icon from '../../images/50d.png'
import wind from '../../images/wind.png'
import rain from '../../images/rain.png'
import sun_png from '../../images/sunrise.png'


function Weather() {

  const api_key = 'a284769519eb81aa5a7b465300f050fd'

  const [Weather, setWeather] = useState(null)
  const [defaultCity, setDefaultCity] = useState(() => {
    const savedCity = JSON.parse(localStorage.getItem('DEFAULT_CITY')) 
    return savedCity || 'New York'
  })
  const [City, setCity] = useState(defaultCity)
  const [CitySuggestions, setCitySuggestions] = useState([])
  const [showSearch, setShowSearch] = useState(false)
  const [inputValue, SetInputValue] = useState('')

  const setDefault = () => {
    setDefaultCity(City)
    window.localStorage.setItem('DEFAULT_CITY', JSON.stringify(City))
  }


  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": rain_icon,
    "13n": snow_icon,
    "50d": mist_icon,
    "50n": mist_icon
  }

  const search = async (city) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`)
      const data = await response.json()
      const icon = allIcons[data.weather[0].icon || clear_icon]

      const timezoneOffset = data.timezone 

      const now = Math.floor(Date.now() / 1000)
      let sun
      try {
        if (now > data.sys.sunrise && now < data.sys.sunset) {
          sun = data.sys.sunset
        }
        else {
          sun = data.sys.sunrise
        }

        sun = new Date(sun * 1000).toLocaleTimeString("en-US", { 
          hour: '2-digit',
          minute: '2-digit'
        })

      } catch (error) {

      }

      const rainAmount = data.rain ? data.rain["1h"] || 0 : 0

      setWeather({
        temp: (data.main.temp ? data.main.temp : '0%'),
        speed: (data.wind.speed ? data.wind.speed * 2.237 : '0%'),
        rain : rainAmount,
        sun : (sun ? sun : '0%'),
        icon: icon
      })

    } catch (error) {

    }


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

  const handleCitySelect = (selectedCity) => {
    setCity(selectedCity.name)
    SetInputValue('')
    setShowSearch(prev => !prev)
    search(selectedCity.name) // Search the weather data for the selected city
    setCitySuggestions([]) // Clear suggestions after selecting a city
  }

  useEffect(() => {
    search(City) // Call search with the initial city
  }, [City]) // Re-run when the city changes

  useEffect(() => {
    search('New York')

  }, [])



  return (
    <div className="text-white h-150 bg-gray-700 flex flex-col justify-between w-250 mx-2 shadow-md rounded-lg px-4 py-0 my-0">
      <div>
        <div className='my-4 text-2xl mx-2'>
          Weather
        </div>
        {/* This is the Data box */}
        <div className='bg-gray-500 rounded-2xl'>
          <div className='flex justify-around items-center h-40'>
            <img src={Weather ? Weather.icon : clear_icon} alt="" />
          </div>
          <div className="flex justify-around items-center h-30">
            <div className='flex-col w-30'>
              <div className='flex justify-between'>
                <img src={wind} alt="" className='h-8' />
                <div className='flex items-center'>{Weather ? Weather.speed.toFixed(1) : 'Loading...'} mph</div>
              </div>
              <div className='flex justify-between'>
              <img src={rain} alt="" className='h-8' />
                <div className='flex items-center'>{Weather ? Weather.rain : 'Loading...'}</div>
              </div>
              <div className='flex justify-between'>
              <img src={sun_png} alt="" className='h-8' />
                <div className='flex items-center'>{Weather ? Weather.sun : 'Loading...'}</div>
              </div>
            </div>
            <div className='text-4xl'>
              {Weather ? `${Math.floor((Weather.temp - 273.15) * (9/5) + 32)}°` : 'Loading...'}
            </div>
          </div>
        </div>
        {/* City Box */}
        <div className='bg-gray-500 rounded-2xl flex justify-center mt-1'>
          <div className='flex-col'>
            <div className='flex'>
              <div className='my-2 p-0 px-2 w-60 flex justify-between'>{City} {(defaultCity !== City ? <button onClick={() => setDefault()} className='bg-gray-700 rounded-2xl w-20 text-xs hover:bg-gray-600 hover:cursor-pointer'>Set Default</button> : '')}</div>
              <button className='hover:cursor-pointer' onClick={() => {setShowSearch(prev => !prev)}}>
              {!showSearch ? '▼' : '▲'}
              </button>
            </div>
            {showSearch ? 
            <div className='pl-1 pt-0 flex'>
              <div>Default: {defaultCity}</div>
            </div> : <div></div>}
            {showSearch ? <div className='bg-gray-600 w-60 p-1 px-2 my-1 rounded-xl flex-col'>
            <input type="text" value={inputValue} placeholder='Search City' name="" id="" onChange={handleCityChange}/>

            {CitySuggestions.length > 0 && (
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
            )}
            </div> : <div></div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather