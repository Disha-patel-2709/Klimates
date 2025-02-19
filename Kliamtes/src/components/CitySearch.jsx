import { useState } from "react";
import { Button } from "./ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { Clock, Loader2, Search, Star, XCircle } from "lucide-react";
import { useLocationSearch } from "@/hooks/useWeather";
import { useNavigate } from "react-router-dom";
import { useSearchHistory } from "@/hooks/useSearchHistory";
import { format } from "date-fns";
import { useFavorite } from "@/hooks/useFavorite";

const CitySearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { data: locations, isLoading } = useLocationSearch(query);
  const { history, clearHistory, addToHistory } = useSearchHistory();

  console.log(locations);
  console.log("What is location here?", location);

  const handleSelect = (cityData) => {
    console.log("Selected city data:", cityData);

    setQuery("");

    const [lat, lon, name, country] = cityData
      .split("|")
      .map((item) => item.trim());

    if (!lat || !lon || !name) {
      console.error("Invalid data from search history:", cityData); 
      return;
    }

    // Add to search history
    addToHistory.mutate({
      query,
      name,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      country,
    });

    setOpen(false);
    navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
  };

  const {favorites}= useFavorite();

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className="relativew-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
      >
        <Search className="mr-2 h-4 w-4" />
        Search cities....{" "}
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search cities...."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {query.length > 2 && !isLoading && (
            <CommandEmpty>No Cities found.</CommandEmpty>
          )}

          {/* favorites section */}
          {favorites.length > 0 && (
          <CommandGroup heading="Favorites">
            {favorites.map((city)=>(
            <CommandItem key={city.id}
            value={`${city.lat}|${city.lon}| ${city.name}|${city.country}`}
           onSelect={handleSelect}
           >
            <Star className="mr-2 h-4 w-4 text-yellow-500"/>
            <span>{city.name}</span>
            {city.state && (
              <span className="text-sm text-muted-foreground">
                , {city.state}
              </span>
            )}
             <span className="text-sm text-muted-foreground">
              , {city.country}
             </span>
              </CommandItem>
          ))}
          </CommandGroup>
          )} 

          {history.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup>
                <div className="flex items-center justify-between px-2 my-2">
                  <p className="text-xs text-muted-foreground">
                    Recent Searches
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => clearHistory.mutate()}
                  >
                    <XCircle className="h-4 w-4" />
                    Clear
                  </Button>
                </div>

                {history.map((item, index) => {
                  return (
                    <CommandItem
                      key={`${item.name}-${item.lat}-${item.lon}-${index}`} // ✅ Corrected
                      value={`${item.lat}|${item.lon}|${item.name}|${item.country}`} // ✅ Corrected
                      onSelect={handleSelect}
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      <span>{item.name}</span>
                      {item.state && (
                        <span className="text-sm text-muted-foreground">
                          {item.state}
                        </span>
                      )}
                      <span className="text-sm text-muted-foreground">
                        {item.country}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {format(item.searchAt, "MMM d, h:mm a")}
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </>
          )}

          <CommandSeparator />

          {locations && locations.length > 0 && (
            <CommandGroup heading="Suggestion">
              {isLoading && (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              )}
              {locations?.map((location, index) => {
                return (
                  <CommandItem
                    key={`${location.name}-${location.lat}-${location.lon}-${index}`}
                    value={`${location.lat} | ${location.lon}| ${location.name}|${location.country}`}
                    onSelect={handleSelect}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    <span>{location.name}</span>
                    {location.state && (
                      <span className="text-sm text-muted-foreground">
                        {location.state}
                      </span>
                    )}
                    <span className="text-sm text-muted-foreground">
                      {location.country}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CitySearch;
