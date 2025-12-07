import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Export the base URLs directly for use in other services
export const WEATHER_BASE_URL = 'https://api.open-meteo.com/v1/';
export const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/reverse?format=json';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: WEATHER_BASE_URL, 
  }),
  endpoints: (builder) => ({
    getWeather: builder.query<any, { lat: number; lon: number }> ({
      query: (coordinates) =>
        `forecast?latitude=${coordinates.lat}&longitude=${coordinates.lon}&current_weather=true&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&hourly=temperature_2m`, 
    }),
    getLocation: builder.query<any, { lat: number; lon: number }> ({
      query: (coordinates) =>
        `${NOMINATIM_BASE_URL}&lat=${coordinates.lat}&lon=${coordinates.lon}`, 
    }),
  }),
});

// Export the raw query path functions for use outside of React components/Redux Toolkit Query
// These functions take coordinates and return the path segment or query string for the API call.
export const getWeatherPath = (coordinates: { lat: number; lon: number }) => 
  `forecast?latitude=${coordinates.lat}&longitude=${coordinates.lon}&current_weather=true&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&hourly=temperature_2m`;

export const getLocationPath = (coordinates: { lat: number; lon: number }) => 
  `lat=${coordinates.lat}&lon=${coordinates.lon}`;

export const { useGetWeatherQuery, useGetLocationQuery } = weatherApi;
