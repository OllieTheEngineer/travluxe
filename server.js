require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
// const moment = require('moment-timezone');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const { OPENWEATHERMAP_API_KEY, YELP_API_KEY, GOOGLE_MAPS_API_KEY } = process.env;

    // Get weather data
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`;
    const weatherResponse = await axios.get(weatherUrl);
    if (weatherResponse.data.cod !== 200) {
      throw new Error(`Weather API returned status code ${weatherResponse.data.cod}`);
    }
    const { name: city, main: { temp: temperature } } = weatherResponse.data;

    // Get timezone data
    const timezoneUrl = `https://maps.googleapis.com/maps/api/timezone/json?location=${zipCode}&timestamp=${Date.now() / 1000}&key=${GOOGLE_MAPS_API_KEY}`;
    const timezoneResponse = await axios.get(timezoneUrl);
    const timezone = timezoneResponse.data.timeZoneId;

    // Get restaurant data
    const restaurantUrl = `https://api.yelp.com/v3/businesses/search?location=${zipCode}&sort_by=rating&categories=restaurants&limit=5`;
    const restaurantResponse = await axios.get(restaurantUrl, {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    });
    const restaurants = restaurantResponse.data.businesses.map(({ name, rating, review_count, url }) => ({
      name,
      rating,
      reviewCount: review_count,
      url,
    }));

    // Get touristic site data
    const touristicSiteUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}+touristic+site&key=${GOOGLE_MAPS_API_KEY}`;
    const touristicSiteResponse = await axios.get(touristicSiteUrl);
    const touristicSites = touristicSiteResponse.data.results.map(({ name, rating, formatted_address, types, photos }) => ({
      name,
      rating,
      formattedAddress: formatted_address,
      types,
      photos,
    }));

    res.json({
      city,
      temperature,
      timezone,
      restaurants,
      touristicSites,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});