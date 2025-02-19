import { useQuery } from "@tanstack/react-query";
import { weatherAPI } from "@/api/weather";

export const WEATHER_KEYS = {
  weather: (coords) => ["weather", coords],
  forecast: (coords) => ["forecast", coords],
  location: (coords) => ["location", coords],
  search: (query)=>["location-search", query]
};

export function useWeatherQuery(coordinates) {
  return useQuery({
    queryKey: WEATHER_KEYS.weather(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () => (coordinates ? weatherAPI.getCurrentWeather(coordinates) : null),
    enabled: Boolean(coordinates?.lat && coordinates?.lon && coordinates.lat !== 0 && coordinates.lon !== 0),

  });
}

export function useForecastQuery(coordinates) {
  return useQuery({
    queryKey: WEATHER_KEYS.forecast(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () => (coordinates ? weatherAPI.getForecast(coordinates) : null),
    enabled: Boolean(coordinates?.lat && coordinates?.lon && coordinates.lat !== 0 && coordinates.lon !== 0),

  });
}

export function useReverseGeocodeQuery(coordinates) {
  return useQuery({
    queryKey: WEATHER_KEYS.location(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () => {
      if (!coordinates) return null;
      return weatherAPI.reverseGeocode(coordinates)
        .then((data) => {
          console.log("Reverse Geocode API Response:", data);
          return data;
        })
        .catch((error) => {
          console.error("Reverse Geocode API Error:", error);
          throw error;
        });
    },
    enabled: Boolean(coordinates?.lat && coordinates?.lon),
  });
}


export function useLocationSearch(query) {
  return useQuery({
    queryKey: ["weatherSearch", query], 
    queryFn: () => {
      if (!query) return []; 

      return weatherAPI.searchLocations(query)
        .then((data) => {
          console.log("Raw API Response:", data);
          return data || []; 
        })
        .catch((error) => {
          console.error("Search error:", error);
          return []; 
        });
    },
    enabled: query.length > 0,
  });
}