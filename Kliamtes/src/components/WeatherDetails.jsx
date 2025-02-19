import { format } from 'date-fns';
import { Compass, Gauge, Sunrise, Sunset } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import React from "react";
import PropTypes from "prop-types";

const WeatherDetails = ({data}) => {

    if(!data||!data.wind||!data.main||!data.sys){
    return <p>Loading weather details...</p>
    }
    const {wind, main, sys}=data;

    const formatTime=(timestamp)=>
    {
        return timestamp ? format(new Date(timestamp*1000),"h:mm a"):"N/A"
    }
    
     const getWindDirection = (degree)=>{
        const direction =["N","NE","E","SE","S","SW","W","NW"];
        const index = Math.round(((degree%360)<0? degree+360:degree)/45)%8;
        return direction[index];
     };

    const details=[
        {
            title:"Sunrise",
            value: formatTime(sys.sunrise),
            icon: Sunrise,
            color:"text-orange-500",
        },
        {
            title:"Sunset",
            value: formatTime(sys.sunset),
            icon: Sunset,
            color:"text-blue-500",
        },
        {
            title:"Wind Direction",
            value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
            icon: Compass,
            color:"text-green-500",
        },
        {
            title:"Pressure",
            value: `${main.pressure}hPa`,
            icon: Gauge,
            color:"text-purple-500",
        },
    ];

    return (
        <Card>
          <CardHeader>
            <CardTitle>Weather Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2">
              {details.map((detail, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-lg border p-4"
                >
                 {React.createElement(detail.icon,{
                  className: `h-5 w-5 ${detail.color}`,
                   })}
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {detail.title}
                    </p>
                    <p className="text-sm text-muted-foreground">{detail.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      );
};

WeatherDetails.propTypes = {
    data: PropTypes.shape({
      sys: PropTypes.shape({
        sunrise: PropTypes.number.isRequired,
        sunset: PropTypes.number.isRequired,
      }).isRequired,
      wind: PropTypes.shape({
        deg: PropTypes.number.isRequired,
      }).isRequired,
      main: PropTypes.shape({
        pressure: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  };

export default WeatherDetails



