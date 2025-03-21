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
      console.log(data)
      const icon = allIcons[data.weather[0].icon || clear_icon]

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
          timeZone: "EST",
          hour: '2-digit',
          minute: '2-digit'
        })
      } catch (error) {

      }

      setWeather({
        temp: (data.main.temp ? data.main.temp : '0%'),
        speed: (data.wind.speed ? data.wind.speed * 2.237 : '0%'),
        rain : (data.rain ? data.rain : '0%'),
        sun : (sun ? sun : '0%'),
        icon: icon
      })

      console.log("Hello")

    } catch (error) {

    }


  }

  useEffect(() => {
    search('New York')

  }, [])

  return (
    <div className="text-white h-150 bg-gray-700 flex flex-col justify-between w-full mx-2 shadow-md rounded-lg px-4 py-0 my-0">
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
        <div className='flex h-10 m-2 bg-red-700 justify-center items-center'>
          City
        </div>
      </div>
    </div>
  )
}

export default Weather