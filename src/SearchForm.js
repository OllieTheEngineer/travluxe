import React, { useState } from 'react';
import {Button} from 'react-bootstrap';
import './SearchForm.css';

function SearchForm() {
const [zipCode, setZipCode] = useState('');
const [ city, setCity ] = useState('')

const handleSubmit = async (evt) => {
    evt.preventDefault();
    const res = await fetch(`/search/${zipCode || city}`);
    const data = await res.json();
    console.log(data)
}

  return (
    <div className="card">
    <form className="search" onSubmit={handleSubmit}>
        <label>
            Zip Code or City:
            <input type="text" 
                   value={zipCode || city}
                   onChange={(evt) => setZipCode && setCity(evt.target.value)}
                   className="search-bar" 
                   placeholder="Search City"/>
        </label>
        <div className="weather">
            <h1 className="city"> Weather here is</h1>
            <h1 className="temp">80°C</h1>
            <div className="flex">
            <img src="https://openweathermap.org/img/wn/02d.png" alt="" className="icon" />
            <div className="description">Cloudy</div>
            </div>
            <div className="humidity">Humidity; 60%</div>
            <div className="wind">Wind Speed: 6.2km</div>
        </div>
        <Button variant="Primary" type="submit">
            Search
        </Button>
    </form>
    </div>
  );
}
export default SearchForm;