import { format } from 'date-fns'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { ArrowDown, ArrowUp, Droplet, Wind } from 'lucide-react'

const WeatherForecast = ({data}) => {
   
    if(!data){
        return <p>Loading weather details...</p>
        }

    const dailyForecast = data.list.reduce((acc,forecast)=>{
        const date = format(new Date(forecast.dt *1000),"yyyy-MM-dd");

        if(!acc[date]){
            acc[date] ={
                temp_min: forecast.main.temp_min,
                temp_max: forecast.main.temp_max,
                humidity: forecast.main.humidity,
                wind : forecast.wind.speed,
                weather: forecast.weather[0],
                date: forecast.dt,
            };
        } else{
            acc[date].tmp_min = Math.min(acc[date].tmp_min,forecast.main.temp_min);
            acc[date].tmp_max = Math.max(acc[date].tmp_max,forecast.main.temp_max);
        }
        return acc;
    },{})
    const nextDays = Object.values(dailyForecast).slice(0,6);

    const formatTemp = (temp) => `${Math.round(temp)}°`;

  return (
    <Card>
    <CardHeader>
      <CardTitle>5-Day Forecast</CardTitle>
    </CardHeader>
    <CardContent>
   <div className='grid gap-4'>
    {nextDays.map((day)=>{
        return <div key={day.date}
        className='grid grid-cols-3 items-center gap-4 rounded-lg border p-4'
        >
            <div>
                <p className='text-sm text-muted-foreground capitalize'>{format(new Date(day.date*1000),"EEE,MMM,d")}</p>
                <p>{day.weather.description}</p>
            </div>
            <div className='flex justify-center gap-4'>
                <span className='flex items-center text-blue-500'>
                    <ArrowDown/>
                    {formatTemp(day.temp_min)}
                </span>
                <span className='flex items-center text-red-500'>
                    <ArrowUp/>
                    {formatTemp(day.temp_min)}
                </span>
            </div>
            <div className='flex justify-end gap-4'>
                <span className='flex items-center gap-1'>
                    <Droplet className='h-4 2-4 text-blue-500'/>
                    <span className='text-sm'>{day.humidity}%</span>
                </span>
                <span className='flex items-center gap-1'>
                    <Wind className='h-4 2-4 text-blue-500'/>
                    <span className='text-sm'>{day.wind}m/s</span>
                </span>
            </div>
        </div>
    })}
   </div>
    </CardContent>
   
  </Card>
  )
}

export default WeatherForecast