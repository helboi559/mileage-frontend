import './App.css';
import {Routes,Route} from "react-router-dom"
import Home from './Pages/Home';
import { useState ,useEffect} from 'react';
import RegistrationPage from './Pages/RegistrationPage';
import LoginPage from './Pages/LoginPage';
import Dashboard from './Pages/Dashboard';
import AllDrives from './Pages/AllDrives';
import ResponsiveAppBar from './Components/NavBar';
import CalendarTool from './Components/CalendarTool';
import dayjs from 'dayjs';
import { useAuth } from './Hooks/Auth';
import CustomTheme from './CustomTheme';

//backend endpoint
const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT 
function App() {
  
  // const {user} = useAuth()
  const [date,setDate] = useState(dayjs())
  
  return (
    <CustomTheme>
      <ResponsiveAppBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='registration' element={<RegistrationPage />}/>
        <Route path='login' element={<LoginPage />}/>
        <Route path='dashboard' element={<Dashboard date={date} urlEndpoint={urlEndpoint} setDate={setDate}/>}/>
        <Route path='all-drives' element={<AllDrives  />}/>
        
      </Routes>

    </CustomTheme>
  );
}

export default App;
