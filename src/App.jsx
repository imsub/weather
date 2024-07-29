/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios";
const SearchBar = ({onSearch})=>{
  const [city, setCity] = useState("");
  const handler = (searchCity)=>{
    onSearch(searchCity);
  }
  return (
    <div className='search-bar'>
      <input type='text' value={city}
      onChange={(e)=> setCity(e.target.value)}
      placeholder='Enter city name'
      />
      <button onClick={handler}>Search</button>
    </div>
  )
}
const WeatherCard = ({title,data})=>{
  return(
    <div className='weather-card'>
      <h3>{title}</h3>
      <p>{data}</p>
    </div>
  )
}
const WeatherDisplay = ({city})=>{
    const[weatherData,setWeatherData] = useState(null);
    const[loading,setLoading] = useState(false);
    useEffect(()=>{
      if(city){
        setLoading(true);
        // axios.get("https://api.weatherapi.com/v1/current.json",{
        //   Key:"41eba75c8e76461995d200553242907",
        //   q:"Kolkata"
        // })
        fetch(`https://api.weatherapi.com/v1/current.json?key=41eba75c8e76461995d200553242907&q=${city}`)
        .then((res)=> res.json())
        .then((data)=>{
          setWeatherData(data);
        })
        .catch((error)=>{
          console.error("Error fetching data: ",error);
          alert("Failed to fetch weather data");
        })
        .finally(()=>{
          setLoading(false);
        })
      }
    },[city]);
    return (
      <div className='weather-display'>
        {loading && <p>Loading data...</p>}
        {
          !loading && weatherData && (
            <div className='weather-cards'> 
            <WeatherCard 
            title="Temperature"
            data={`${weatherData.current.temp_c}°C`}
            />
            <WeatherCard 
            title="Humidity"
            data={`${weatherData.current.humidity}%`}
            />
            <WeatherCard 
            title="Condition"
            data={weatherData.current.condition.text}
            />
            <WeatherCard 
            title="Wind Speed"
            data={`${weatherData.current.wind_kph} kph`}
            />
            </div>
          )
        }
      </div>
    )
}
function App() {
  const [city, setCity] = useState("");
  const handler = (searchCity)=>{
    setCity(searchCity.target.innerHTML);
  }
  return (
   <div className='App'>
    <SearchBar onSearch={handler}/>
    <WeatherDisplay city={city} /> 
   </div>
  )
}

export default App
