import { useTheme } from "@/context/ThemeProvider";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import CitySearch from "./CitySearch";


const Header = () => {
 const {theme,setTheme}=   useTheme()
 const isDark=theme==="dark"
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-[1400px] mx-auto flex items-center justify-between h-16 px-4">
        <Link to={"/"}>
          <img src={theme===`dark`?`${assets.logo}`:`${assets.logo2}`} alt="Klimatelogo" className="h-14" />
        </Link>
        <div className="flex gap-4">
          {/* search */}
          <CitySearch/>
          {/* theme toggle */}
          <div onClick={()=>setTheme(isDark?"light":"dark")}
            className={`flex items-center cursor-pointer transition-transform duration-500 ease-in-out ${isDark ? "rotate-180" : "rotate-0"}`}
            >
            {isDark?(<Sun className="h-6 w-6 text-yellow-500 rotate-0 transition-all"/>):( <Moon className="h-6 w-6 text-blue-500 rotate-0 transition-all"/>)}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
