
import { API_CONFIG } from "./config";

class WeatherAPI {
  // Method to create API URL with query parameters
  createUrl(endpoint, params) {
    const searchParams = new URLSearchParams({
      appid: API_CONFIG.API_KEY,
      ...params,
    });
    return `${endpoint}?${searchParams.toString()}`;
  }

  // Method to fetch data from API
  async fetchData(url) {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Weather API Error: ${response.statusText}`);
    }

    return response.json();
  }

  // Fetch current weather data
  async getCurrentWeather({ lat, lon }) {
    if (typeof lat !== "number" || typeof lon !== "number") {
      throw new Error("Coordinates must contain lat and lon as numbers");
    }

    const url = this.createUrl(`${API_CONFIG.BASE_URL}/weather`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: API_CONFIG.DEFAULT_PARAMS.units,
    });

    return this.fetchData(url);
  }

  // Fetch weather forecast
  async getForecast({ lat, lon }) {
    if (typeof lat !== "number" || typeof lon !== "number") {
      throw new Error("Coordinates must contain lat and lon as numbers");
    }

    const url = this.createUrl(`${API_CONFIG.BASE_URL}/forecast`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: API_CONFIG.DEFAULT_PARAMS.units,
    });

    return this.fetchData(url);
  }

  // Reverse geocode to get location from coordinates
  async reverseGeocode({ lat, lon }) {
    if (typeof lat !== "number" || typeof lon !== "number") {
      throw new Error("Coordinates must contain lat and lon as numbers");
    }

    const url = this.createUrl(`${API_CONFIG.GEO}/reverse`, {
      lat: lat.toString(),
      lon: lon.toString(),
      limit: "1",
    });

    return this.fetchData(url);
  }

  // Search for locations by name
  async searchLocations(query) {
    if (typeof query !== "string") {
      throw new Error("Query must be a string");
    }

    const url = this.createUrl(`${API_CONFIG.GEO}/direct`, {
      q: query,
      limit: "5",
    });

    return this.fetchData(url);
  }
}

// Export an instance of the WeatherAPI class
export const weatherAPI = new WeatherAPI();
