import React, { useState } from 'react';
import axios from 'axios';
import "./SearchForm.css"
import { format } from 'date-fns';

function SearchForm() {
  const [searchValue, setSearchValue] = useState('');
  const [weather, setWeather] = useState(null);
  const [timezone, setTimezone] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [touristicSites, setTouristicSites] = useState([]);

  const handleSearch = async () => {
    try {
      const { data: weatherData } = await axios.get(`/api/weather/${searchValue}`);
      setWeather(weatherData);
      setTimezone(weatherData.timezone);

      const { data: restaurantData } = await axios.get(`/api/restaurants/${searchValue}`);
      setRestaurants(restaurantData.businesses);

      const { data: touristicSiteData } = await axios.get(`/api/touristic-sites/${searchValue}`);
      setTouristicSites(touristicSiteData.businesses);
    } catch (error) {
      console.log(error);
    }
  };

  const renderCityInfo = () => {
    if (weather) {
        const timeInUserTimezone = format(new Date(), 'h:mm a zzz', {timeZone: timezone});
      return (
        <div>
          <h2>Weather in {searchValue}</h2>
          <p>Temperature: {weather.temperature} °F</p>
          <p>Conditions: {weather.conditions}</p>
          <p>Wind Speed: {weather.windSpeed} mph</p>
          <p>Time in {searchValue}: {timeInUserTimezone}</p>
        </div>
      );
    }
    return null;
  };

  const renderRestaurants = () => {
    if (restaurants && restaurants.length) {
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
    return null;
  };

  const renderTouristicSites = () => {
    if (touristicSites && touristicSites.length) {
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
    return null;
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