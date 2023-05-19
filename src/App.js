import React, { useState} from 'react';
const api = {
  key: "f2cbfef9785ccd6cb91245e913b82638",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

{/* Unpack useState() method by using [array destructuring syntax] and initialize 'query' to an empty 'string' 
and pass the setQuery variable to the setQuery function, where the setQuery function can be used to update the 
value of the 'query' state variable later in the component's lifecycle. */}
  const [query, setQuery] = useState('');
{/* Equal to an empty {object} so we can store more complicated data than just a value or string */}
  const [weather, setWeather] = useState({});


{/* 'search' function uses 'evt' argument, to basically perform a search operation when the Enter key is pressed. 
Whatever our 'query' got set to above is what we will search for, and then set our units, and API weather update key*/}
  const search = evt => {
    evt.preventDefault(); // Prevent the default form submission behavior
      {/* Send a GET request for query, metric units, and APP ID (weathermap api key) */}
      {/* Then response is it is parsed as JSON, and the 'result' data is used to update the weather state variable using the setWeather function. 
       This allows the weather data to be stored and accessible within the component.  */}
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery(''); {/* Replace query with an empty string again ebcasue once we've submitted we want to restart so we can type something in again */}
          console.log(result);
        })
        .catch(error => {
          console.error("Error fetching weather data:", error);
        });
    };

  const dateBuilder = (d) => { 
  {/* Month and Day arrays */}
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; {/* 0 = sunday, 1 = monday, etc */}
  
  {/* d is a Date object representing the current date and time. So this method returns the current day as number from 0-6 */}
  let day = days[d.getDay()]; {/* [Ex: Monday] is a method that returns a number, from 0 to 7, representing the current day, then we pass that to the days array. */}
  let date = d.getDate();  {/* [Ex: 13] is a method that returns a number, from 1 to 31, representing the current date. */}
  let month = months[d.getMonth()]; {/* [Ex: May] is a method that returns a number, from 0 to 11, representing the current month, then we pass that to the months array. */}
  let year = d.getFullYear(); {/* [Ex: 2023] is a method that returns the date year */}
  {/* Then combine the date variables and return: Sunday, May 14, 2023*/}
  return `${day}, ${month} ${date}, ${year}` 
  }

  return (
    // In React, use 'className' instead of 'class', becasue 'class' is a reserved word in JavaScript for defining CSS classes
    <div className = {
      (typeof weather.main != "undefined") // if weather.main is undefined, aka we ahven't done a search query, then just set className to 'app' (default is cold)
      ? ((weather.main.temp > 16) // if its above 16 deg
        ? 'app warm' // then lets return 'app warm' as the className instead
        : 'app') // otherwise return app if its below 16 deg
      : 'app'}>
      <main> 
      {/* Create a searchbar */}
        <div className ='search-box'>
          <form onSubmit={search}>
            <input
              type = "text"
              className='search-bar'
              placeholder='Search'
              onChange = {e => setQuery(e.target.value)} // Get the value of what was typed in
              value = {query}
            />
          </form>
        </div>
        
        {/* Under the searchbar code, we want to add location functionality */}
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className = 'location-box'>
            <div className = 'location'> {weather.name}, {weather.sys.country} </div> {/* Map to actual weather api database */}
            <div className = "date">{dateBuilder(new Date())} </div>  {/* Get using datebuilder function */}
          </div> 

          {/* Add code to add weather location functionality */}
          <div className = "weather-box">
            <div className = "temp">
              {Math.round(weather.main.temp)}°C {/* Temperature. Note: Press Alt + 0176 = for degree symbol '°' */}
            </div>
            <div className = "weather">
              {weather.weather[0].main} {/* Weather of main area of city */}
            </div>
          </div> 
      </div>
      ) : ('')}
      </main>
    </div>
    // create a main tag 
  );
}
export default App;
