import { BrowserRouter, Routes,Route } from "react-router-dom"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import Layout from "./components/Layout"
import { ThemeProvider } from "./context/ThemeProvider"
import WeatherDashboard from "./pages/WeatherDashboard"
import CityPage from "./pages/CityPage"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from "sonner"


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5*60*1000,//5min
      gcTime: 10*60*1000,//10min
      retry:false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
   <BrowserRouter>
   <ThemeProvider defaultTheme="dark">
   <Layout>
    <Routes>
      <Route path ='/' element={<WeatherDashboard/>}/>
      <Route path ='/city/:cityName' element={<CityPage/>}/>
    </Routes>
   </Layout>
   <Toaster richColors/>
   </ThemeProvider>
   
   </BrowserRouter>
   <ReactQueryDevtools initialIsOpen={false} />
   </QueryClientProvider>
  )
}

export default App
