import { useState,useEffect } from "react";

export function useLocalStorage(key,initialvalue){
    const [storedValue, setStoredValue]=useState(()=>{
        try {
            const item = window.localStorage.getItem(key);
            return item? JSON.parse(item) : initialvalue;
        } catch (error) {
            console.error(error);
            return initialvalue;            
        }
    });

    useEffect(() => {
     try {
        window.localStorage.setItem(key,JSON.stringify(storedValue))
     } catch (error) {
        console.error(error);
    
     }
    }, [key, storedValue])
    return [storedValue,setStoredValue]
}