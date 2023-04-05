const express = require('express');
const axios = require('axios');

const app = express();
const port = 3001;

const WEATHER_API_KEY = 'bd84656e9d09f5d5b44d2a7ce0cc18ec';
const YELP_API_KEY = 'lWnIKBBcAKTDz529HTfnEOon5qyyaaXddUPs-wV5ThWxMLGP9oOFJ390-dIZTr0f14W-MBI5i6B5lXN0fgRlBQ4MWGXmPwPWXmDDl6bV2wZrrk2VjFXgxjZDy94sZHYx';
app.maxHttpHeaderSize = 1000000;

// Weather endpoint
app.get('/api/weather/:location', async (req, res) => {
  try {
    const { location } = req.params;
    const { data } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${WEATHER_API_KEY}`);
    const temperature = Math.round((data.main.temp - 273.15) * 9/5 + 32); // Convert from Kelvin to Fahrenheit
    const conditions = data.weather[0].description;
    const windSpeed = data.wind.speed;
    const timezone = data.timezone;
    res.send({ temperature, conditions, windSpeed, timezone });
    console.log(temperature, conditions, windSpeed, timezone)
  } catch (error) {
    console.log(error);
    res.status(500).send('Error getting weather data');
  }
});

// Restaurants endpoint
app.get('/api/restaurants/:location', async (req, res) => {
  try {
    const { location } = req.params;
    const { data } = await axios.get(`https://api.yelp.com/v3/businesses/search?term=food&location=${location}&sort_by=rating&limit=5`, {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    const businesses = data.businesses.map(business => ({
      name: business.name,
      rating: business.rating,
      address: `${business.location.address1}, ${business.location.city}, ${business.location.state} ${business.location.zip_code}`,
      phone: business.display_phone,
      image: business.image_url
    }));
    res.send({ businesses });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error getting restaurant data');
  }
});

// Touristic sites endpoint
app.get('/api/touristic-sites/:location', async (req, res) => {
  try {
    const { location } = req.params;
    const { data } = await axios.get(`https://api.yelp.com/v3/businesses/search?term=attractions&location=${location}&sort_by=rating&limit=5`, {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    const businesses = data.businesses.map(business => ({
      name: business.name,
      rating: business.rating,
      address: `${business.location.address1}, ${business.location.city}, ${business.location.state} ${business.location.zip_code}`,
      phone: business.display_phone,
      image: business.image_url
    }));
    res.send({ businesses });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error getting touristic site data');
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));



// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const axios = require('axios');
// // const moment = require('moment-timezone');

// const app = express();

// app.use(bodyParser.json());
// app.use(cors());

// app.get('/search', async (req, res) => {
//   console.log("*****************************0")
//   try {
//     const { zipCode } = req.params;
//     const { OPENWEATHERMAP_API_KEY, YELP_API_KEY, GOOGLE_MAPS_API_KEY } = process.env;
//     console.log("*****************************1")
//     console.log(zipCode)
//     // Get weather data
//     const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q="
//                         + ${zipCode}
//                         + appid=${OPENWEATHERMAP_API_KEY}
//                         + &units=metric`;
//     const weatherResponse = await axios.get(weatherUrl);
//     console.log(weatherResponse);
//     if (weatherResponse.data.cod !== 200) {
//       throw new Error(`Weather API returned status code ${weatherResponse.data.cod}`);
//     }
//     const { name: city, main: { temp: temperature } } = weatherResponse.data;
//     console.log("*****************************2")
//     // Get timezone data
//     const timezoneUrl = `https://maps.googleapis.com/maps/api/timezone/json?location=${zipCode}&timestamp=${Date.now() / 1000}&key=${GOOGLE_MAPS_API_KEY}`;
//     const timezoneResponse = await axios.get(timezoneUrl);
//     const timezone = timezoneResponse.data.timeZoneId;
//     console.log("*****************************3")
//     // Get restaurant data
//     const restaurantUrl = `https://api.yelp.com/v3/businesses/search?location=${zipCode}&sort_by=rating&categories=restaurants&limit=5`;
//     const restaurantResponse = await axios.get(restaurantUrl, {
//       headers: {
//         Authorization: `Bearer ${YELP_API_KEY}`,
//       },
//     });
//     const restaurants = restaurantResponse.data.businesses.map(({ name, rating, review_count, url }) => ({
//       name,
//       rating,
//       reviewCount: review_count,
//       url,
//     }));
//     console.log("*****************************4")
//     // Get touristic site data
//     const touristicSiteUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}+touristic+site&key=${GOOGLE_MAPS_API_KEY}`;
//     const touristicSiteResponse = await axios.get(touristicSiteUrl);
//     const touristicSites = touristicSiteResponse.data.results.map(({ name, rating, formatted_address, types, photos }) => ({
//       name,
//       rating,
//       formattedAddress: formatted_address,
//       types,
//       photos,
//     }));
//     console.log("*****************************5")
//     res.json({
//       city,
//       temperature,
//       timezone,
//       restaurants,
//       touristicSites,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// app.listen(3000, () => {
//   console.log('Server listening on port 3000');
// });