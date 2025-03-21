import { Button } from "@/components/ui/button"
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react"
import { useGeolocation } from "@/hooks/useGeolocation";
import WeatherSkeleton from "@/components/LoadingSkeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useReverseGeocodeQuery, useWeatherQuery, useForecastQuery } from "@/hooks/useWeather";
import  {CurrentWeather} from "@/components/CurrentWeather";
import HourlyTemperature from "@/components/HourlyTemperature";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherForecast from "@/components/WeatherForecast";
import FavoriteCities from "@/components/FavoriteCities";

const WeatherDashboard = () => {
const {coordinates,error,getLocation,isLoading}= useGeolocation();

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const locationQuery = useReverseGeocodeQuery(coordinates);

  console.log(weatherQuery.data, forecastQuery, locationQuery);
  
  
   const handleRefresh = () => {
    getLocation();
    if(coordinates){
     weatherQuery.refetch();
     forecastQuery.refetch();
     locationQuery.refetch();
    }
  };

  if(isLoading){
    return <WeatherSkeleton/>
  }

  if(!coordinates){
    return(
    <Alert variant="destructive">
     
      <AlertTitle>Location Required</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>Please enable location access to see your local weather</p>
        <Button onClick={getLocation} variant={"outline"} className="w-fit">
          <MapPin className="mr-2 h-4 w-4"/>
          Enable Location
        </Button>
      </AlertDescription>
    </Alert>
    );
  }
  if(error){
    return(
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Location Error</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>{error}</p>
        <Button onClick={getLocation} variant={"outline"} className="w-fit">
          <MapPin className="mr-2 h-4 w-4"/>
          Enable Location
        </Button>
      </AlertDescription>
    </Alert>
    );
  }

const locationName = locationQuery.data?.[0];

if(weatherQuery.error|| forecastQuery.error){
  return(
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle> Error</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>Failed to fetch weather data . Please try again.</p>
        <Button onClick={handleRefresh} variant={"outline"} className="w-fit">
          <RefreshCw className="mr-2 h-4 w-4"/>
          retry
        </Button>
      </AlertDescription>
    </Alert>
    );
}

if (!weatherQuery.data|| !forecastQuery.data){
  return <WeatherSkeleton/>;
}

  return (
    <div className="space-y-4">
      {/* Favorite citie */}
      <FavoriteCities/>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight ">My Location</h1>
<Button 
variant={'outline'}
size={"icon"}
onClick={handleRefresh}
disabled={weatherQuery.isFetching||forecastQuery.isFetching}
>
  
  <RefreshCw className={`h-4 w-4 ${weatherQuery.isFetching?"animate-spin":""}`}/>
</Button>
      </div>
      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <CurrentWeather data={weatherQuery.data} locationName={locationName} /> 
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

export default WeatherDashboard
