import React, { useState } from 'react';
import axios from 'axios';
import "./SearchForm.css"
import { DateTime } from "luxon";
// import { format } from 'date-fns';
// import moment from 'moment-timezone';

function SearchForm() {
  const [searchValue, setSearchValue] = useState('');
  const [weather, setWeather] = useState(null);
  const [timezone, setTimezone] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [touristicSites, setTouristicSites] = useState([]);

  const getCityTimezone = async (location) => {
    const apiUrl = `https://maps.googleapis.com/maps/api/timezone/json?location=${location}&timestamp=${Math.floor(Date.now() / 1000)}&key=<YOUR_API_KEY>`;
    
    try {
      const response = await axios.get(apiUrl);
      const timezoneId = response.data.timeZoneId;
      return timezoneId;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  

  const handleSearch = async () => {
    try {
      const { data: weatherData } = await axios.get(`/api/weather/${searchValue}`);
      setWeather(weatherData);
      setTimezone(timezone.weatherdata);

      const { restaurants } = await axios.get(`/api/restaurants/${searchValue}`);
      setRestaurants(restaurants);

      const { data: touristicSiteData } = await axios.get(`/api/touristic-sites/${searchValue}`);
      setTouristicSites(touristicSiteData.businesses);

      const cityTimezone = await getCityTimezone(searchValue);
      setTimezone(cityTimezone);

    } catch (error) {
      console.log(error);
    }
  };

  const renderCityInfo = () => {
    if (weather) {
        const utcTime = DateTime.utc();
        const timeInCity = utcTime.setZone(cityTimezone);
        const cityTimeString = timeInCity.toLocaleString(DateTime.TIME_WITH_SECONDS);
        // const localTime = DateTime.fromObject({ zone: timezone }).toLocaleString(DateTime.TIME_WITH_SECONDS);
        console.log(timeInCity)
        // const zipTime = DateTime.now().setZone(timezone);
        // const timeInZipTimezone = zipTime.toLocaleString(DateTime.TIME_WITH_SECONDS);
        // const timeInUserTimezone = moment.utc().tz(timezone.toString()).format('h:mm A z');
        // const timeInUserTimezone = format(new Date(), 'h:mm a zzz', {timeZone: timezone});
      return (
        <div>
          <h2>Weather in {searchValue}</h2>
          <p>Temperature: {weather.temperature} °F</p>
          <p>Conditions: {weather.conditions}</p>
          <p>Wind Speed: {weather.windSpeed} mph</p>
          <p>Time in {searchValue}: {cityTimeString}</p>
        </div>
      );
    }
    return null;
  };

  const renderRestaurants = () => {
    if (restaurants?.length > 0) {
      return (
        <div>
          <h2>Best Restaurants in {searchValue}</h2>
          <ul>
            {restaurants.map((restaurant, index) => (
              <li key={index}>
                <h3>{restaurant.name}</h3>
                <p>Rating: {restaurant.rating}</p>
                <p>Address: {restaurant.address}</p>
                <p>Phone: {restaurant.phone}</p>
                <img src={restaurant.image} alt={`${restaurant.name} restaurant`} width="200" />
              </li>
            ))}
          </ul>
        </div>
      );
    }
    // return null;
  };

  const renderTouristicSites = () => {
    if (touristicSites?.length > 0) {
      return (
        <div>
          <h2>Touristic Sites in {searchValue}</h2>
          <ul>
            {touristicSites.map((site, index) => (
              <li key={index}>
                <h3>{site.name}</h3>
                <p>Rating: {site.rating}</p>
                <p>Address: {site.address}</p>
                <p>Phone: {site.phone}</p>
                <img src={site.image} alt={`${site.name}`} width="200" />
              </li>
            ))}
          </ul>
        </div>
      );
    }
    // return null;
  };

  return (
    <div className="card">
      <h1 className='city'>Travluxe</h1>
      <label> Please enter Zip or City: </label>
      <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      {renderCityInfo()}
      {renderRestaurants()}
      {renderTouristicSites()}
    </div>
  )
}

export default SearchForm;

// import React, { useState } from 'react';
// import {Button} from 'react-bootstrap';
// import axios from 'axios';
// import './SearchForm.css';

// function SearchForm() {
// const [zipCode, setZipCode] = useState('');
// // const [ city, setCity ] = useState('')

// const handleSubmit = async (evt) => {
//     evt.preventDefault();
//     try { 
//     const res = await axios.get(`/search/${zipCode}`);
//     const data = res.data;
//     setZipCode(data.zipCode);
//     } catch (err) {
//         console.error(err)
//     }
// }

//   return (
//     <div className="card">
//     <form className="search" onSubmit={handleSubmit}>
//         <label>
//             Zip Code or City:
//             </label>
//             <input type="text" 
//                    value={zipCode}
//                    onChange={(evt) => setZipCode(evt.target.value)}
//                    className="search-bar" 
//                    placeholder="Search City"
//             />
    
//         <div className="weather">
//             <h1 className="city"> Weather here is</h1>
//             <h1 className="temp">80°C</h1>
//             <div className="flex">
//             <img src="https://openweathermap.org/img/wn/02d.png" alt="" className="icon" />
//             <div className="description">Cloudy</div>
//             </div>
//             <div className="humidity">Humidity; 60%</div>
//             <div className="wind">Wind Speed: 6.2km</div>
//         </div>
//         <Button variant="Primary" type="submit">
//             Search
//         </Button>
//     </form>
//     </div>
//   );
// }
// export default SearchForm;