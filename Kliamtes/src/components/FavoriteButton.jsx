import { useFavorite } from '@/hooks/useFavorite';
import React from 'react'
import { Button } from './ui/button';
import { Star } from 'lucide-react';
import { toast } from 'sonner';
import PropTypes from "prop-types";

const FavoriteButton = ({data}) => {
    const {addFavorite, isFavorite, removeFavorite} = useFavorite();
    const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon)

    const handleToogleFavorite = () =>{
        if (isCurrentlyFavorite){
            removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`);
            toast.error(`Removed ${data.name} from Favorites`)
        } else{
            addFavorite.mutate({
              name: data.name,
              lat: data.coord.lat,
              lon: data.coord.lon,
              // country: data.sys.country,
            });
            toast.success(`Added ${data.name} to Favorites`)
        }
    }

  return (
   <Button variant ={isCurrentlyFavorite ? "default":"outline"} 
   size ={"icon"}
   onClick={handleToogleFavorite}
   className={isCurrentlyFavorite ? "bg-yellow-500 hover:bg-yellow-600" : ""}
   >
    <Star 
    className={`h-4 w-4 ${isCurrentlyFavorite ? "fill-current" : ""}`}
    />
   </Button>
  )
};
FavoriteButton.propTypes = {
      data: PropTypes.shape({
        name: PropTypes.string,
        coord: PropTypes.shape({
          lat: PropTypes.number,
          lon: PropTypes.number,
        }),
      }),
    }

export default FavoriteButton

// import React from "react";
// import PropTypes from "prop-types";
// import { useFavorite } from "@/hooks/useFavorite";
// import { Button } from "./ui/button";
// import { Star } from "lucide-react";
// import { toast } from "sonner";

// const FavoriteButton = ({ data }) => {
//   // Ensure `data` and `data.coord` exist before accessing lat/lon
//   const { addFavorite, isFavorite, removeFavorite } = useFavorite();
//   if (!data || !data.coord) {
//     return null; // Prevents the component from rendering if data is missing
//   }

 
//   const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon);

//   const handleToggleFavorite = () => {
//     if (isCurrentlyFavorite) {
//       removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`);
//       toast.error(`Removed ${data.name} from Favorites`);
//     } else {
//       addFavorite.mutate(data);
//       toast.success(`Added ${data.name} to Favorites`);
//     }
//   };

//   return (
//     <Button
//       variant={isCurrentlyFavorite ? "default" : "outline"}
//       size="icon"
//       onClick={handleToggleFavorite}
//     >
//       <Star
//         className={`h-4 w-4 ${
//           isCurrentlyFavorite ? "bg-yellow-500 hover:bg-yellow-600" : ""
//         }`}
//       />
//     </Button>
//   );
// };

// // Prop Validation
// FavoriteButton.propTypes = {
//   data: PropTypes.shape({
//     name: PropTypes.string,
//     coord: PropTypes.shape({
//       lat: PropTypes.number,
//       lon: PropTypes.number,
//     }),
//   }),
// };

// export default FavoriteButton;
