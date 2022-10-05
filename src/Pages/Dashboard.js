import React from 'react'
import { useState,useCallback,useRef} from 'react';
import { useAuth } from '../Hooks/Auth';
import { GoogleMap, useJsApiLoader, Marker, Autocomplete, DirectionsRenderer} from '@react-google-maps/api';
import TextField from '@mui/material/TextField';
// import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers';
import CalendarTool from '../Components/CalendarTool';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const Dashboard = ({date,setDate,urlEndpoint}) => {
  const [ libraries ] = useState(['places']);
  // const [date, setDate] = useState(dayjs());
  const [tolls, setTolls] = useState(0)
  const [parking, setParking] = useState(0)
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const {user} = useAuth()
  const originRef = useRef()
  const destiantionRef = useRef()
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLEMAPS_API_KEY,
    libraries,
  })


  const [map, setMap] = useState(null)

  
  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    console.log(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }
  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }
  
  const logRoute = async () => {
    //tripId ?? in backend
    const businessTaxRate = .625
    const mileage = directionsResponse.routes[0].legs[0].distance.value
    const reimburstment = Math.round(((mileage/1609) * businessTaxRate ) * 10 ) /10
    const total = Math.round(Number(reimburstment + parking + tolls) * 10) /10

    // console.log(typeof total)
    // console.log(typeof parking)
    // console.log(typeof tolls)
    // console.log(total)
    const url = `${urlEndpoint}/drives/log-drive`
    // console.log(url)
    const trip = {
      date:date.$d,
      origin:originRef.current.value,
      destination:destiantionRef.current.value,
      mileage,
      tolls,
      parking,
      reimburstment,
      total
    }
    console.log("logRoute()",trip)
    // console.log(originRef.current.value)
    // console.log(date.$d)
    // console.log("mileage",directionsResponse.routes[0].legs[0].distance.value)
    // console.log("logged $",directionsResponse.routes[0].legs[0].distance.value)
    const res = await fetch(url, {
      method:"POST",
      headers: {
        "Content-Type":"application/json",
        token:user
      },
      body:JSON.stringify(trip)
    })
    const resJSON = await res.json()
    
    //userid
    //date calendar?
    //origin(results.request.origin.query),
    //destination(results.request.destination.query),
    //parking/tolls
    //milage (results.routes[0].legs[0].distance.value (in meters)/ 1609)
    //logged (mileage + parking + tolls)
  }
  // console.log(value.$d)
  return isLoaded ?(
    <>
    <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        {/* only show directions on map  */}
        {directionsResponse && <DirectionsRenderer directions={directionsResponse}/>}
        <></>
      </GoogleMap>
      <Autocomplete>
          <input type="text" placeholder='origin' ref={originRef}/>
        </Autocomplete>
        <Autocomplete>
          <input type="text" placeholder='destination' ref={destiantionRef}/>
        </Autocomplete>
       
        
      <CalendarTool>
        <DatePicker
          disableFuture
          label="Responsive"
          openTo="year"
          views={['year', 'month', 'day']}
          value={date}
          onChange={(newValue) => {
              setDate(newValue)
              // setSelectedDate(newValue)
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      
      </CalendarTool><br />
      {/* {console.log("dashboard calendar",date)} */}
        <input type="number"  value={tolls} onChange={(e)=>setTolls(Number(e.target.value))}/><br />
        <input type="number"  value={parking} onChange={(e)=>setParking(Number(e.target.value))}/><br />
        <button onClick={calculateRoute}>search</button><br />
        <button onClick={clearRoute}>clear</button><br />
        <span>distance {distance}</span><br />
        <span>duration {duration}</span><br />
        <button onClick={()=> {
          logRoute()
          // clearRoute()
        }}>log drive</button><br />
      </>
  ) : <></>
  
}

export default Dashboard