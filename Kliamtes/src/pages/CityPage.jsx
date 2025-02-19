import React from 'react'
import { useSearchParams, useParams } from 'react-router-dom'
import { useWeatherQuery, useForecastQuery } from "@/hooks/useWeather";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import WeatherSkeleton from '@/components/LoadingSkeleton';
import WeatherForecast from '@/components/WeatherForecast';
import WeatherDetails from '@/components/WeatherDetails';
import HourlyTemperature from '@/components/HourlyTemperature';
import { CurrentWeather } from '@/components/CurrentWeather';
import FavoriteButton from '@/components/FavoriteButton';

 const CityPage = () => {
const [searchParams] =  useSearchParams();
const params = useParams();
const lat = parseFloat(searchParams.get('lat')||0);
const lon = parseFloat(searchParams.get('lon')||0);

const coordinates = {lat, lon};

 const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  if(weatherQuery.error|| forecastQuery.error){
    return(
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle> Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to fetch weather data . Please try again.</p>
        </AlertDescription>
      </Alert>
      );
  }

  if (!weatherQuery.data|| !forecastQuery.data || !params.cityName ){
    return <WeatherSkeleton/>;
  }

  return (
    <div className="space-y-4">
      {/* Favorite citie */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight ">{params.cityName},{weatherQuery.data.sys.country}</h1>
      <div> {/* favorite button */}
        <FavoriteButton data={{...weatherQuery.data, name: params.cityName}}/>
      </div>
      </div>
      <div className="grid gap-6">
        <div className="flex flex-col  gap-4">
          <CurrentWeather data={weatherQuery.data}  /> 
          {/* current weather */}

          <HourlyTemperature data={forecastQuery.data} />
          {/* hourly temp*/}
        </div>
        <div>
          {/* details about the weather */}
          <WeatherDetails data={weatherQuery.data}/>     
               {/* forecast */}

          <WeatherForecast data={forecastQuery.data}/>
        </div>
      </div>
     </div>
  )
}

export default CityPage

// const CityPage = () => {
//   const [searchParams] = useSearchParams();
//   const params = useParams();
//   const lat = parseFloat(searchParams.get("lat") || "0");
//   const lon = parseFloat(searchParams.get("lon") || "0");

//   const coordinates = { lat, lon };

//   const weatherQuery = useWeatherQuery(coordinates);
//   const forecastQuery = useForecastQuery(coordinates);

//   console.log("Weather Data:", weatherQuery.data);
//   console.log("Forecast Data:", forecastQuery.data);
//   console.log("City Name:", params.cityName);

//   if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
//     return <WeatherSkeleton />;
//   }

//   if (weatherQuery.error || forecastQuery.error) {
//     return (
//       <Alert variant="destructive">
//         <AlertTriangle className="h-4 w-4" />
//         <AlertDescription>
//           Failed to load weather data. Please try again.
//         </AlertDescription>
//       </Alert>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold tracking-tight">
//           {params.cityName}, {weatherQuery.data?.sys?.country}
//         </h1>
//         <div className="flex gap-2">
//           <FavoriteButton data={{ ...weatherQuery.data, name: params.cityName }} />
//         </div>
//       </div>

//       <div className="grid gap-6">
//         <CurrentWeather data={weatherQuery.data} />
//         <HourlyTemperature data={forecastQuery.data} />
//         <div className="grid gap-6 md:grid-cols-2 items-start">
//           <WeatherDetails data={weatherQuery.data} />
//           <WeatherForecast data={forecastQuery.data} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CityPage;