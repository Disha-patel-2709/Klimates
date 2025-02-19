import { useEffect } from "react";
import { useState } from "react";

export function useGeolocation() {
    const [locationData, setLocationData] = useState({
        coordinates : null,
        error: null,
        isLoading: true,
    });

    const getLocation =()=>{
        setLocationData((prev)=>({...prev, isLoading:true, error:null}));

        if(!navigator.geolocation){
            setLocationData({
                coordinates: null,
                error: "Geolocation is not supported by this browser",
                isLoading: false,
            });
            return;
        }
        navigator.geolocation.getCurrentPosition((position)=>{
            setLocationData({
                coordinates: {lat: position.coords.latitude,
                     lon: position.coords.longitude
                    },
                error: null,
                isLoading: false,
            })
        },
        (error)=>{

            let errorMessage;

            switch(error.code){
                case error.PERMISSION_DENIED:
                    errorMessage = "User denied the request for Geolocation";
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = "Location information is unavailable";
                    break;
                case error.TIMEOUT:
                    errorMessage = "The request to get user location timed out";
                    break;
                default:
                    errorMessage = "An unknown error occurred";
                    break;
            }

            setLocationData({
                coordinates: null,
                error: errorMessage,
                isLoading: false,
            }
        );
        },
        {
            enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    }
    );
    };

    useEffect(()=>{getLocation();

    },[]);

    return{
        ...locationData,
        getLocation
    }
}