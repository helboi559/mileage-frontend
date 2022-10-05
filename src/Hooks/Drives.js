import React from 'react'
import{useState,useEffect,createContext,useContext} from "react"
import { useAuth } from './Auth';

export const drivesContext = createContext();

export const useDrives = ()=> useContext(drivesContext);

const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT 

const DrivesProvider = ({children}) => {
    const [sortField,setSortField] = useState("")
    const [sortOrder,setSortOrder] = useState("asc")
    const [isListLoading,setisListLoading] = useState(false)
    const {user} = useAuth()
//   const [date,setDate] = useState(dayjs())
    const [drivesList,setDrivesList] = useState({message:[],success:false,sum:[]})
    const [singleDrive,setSingleDrive] = useState({message:null,success:false})
    const fetchSingleDrive = async (tripId) => {
        const url = `${urlEndpoint}/drives/view-drives/${tripId}`
        const response = await fetch(url)
        const resJSON = await response.json()
        setSingleDrive(resJSON)
        console.log("fetchSingleProduct()",resJSON)
        return resJSON
    }
    const fetchUserDrives = async() => {
        const url = `${urlEndpoint}/drives/view-drives?sortField=${sortField}&sortOrder=${sortOrder}`
        const res = await fetch (url, {
        method:"GET",
        headers:{
            "Content-type":"application/json",
            token:user
        }
        })
        const resJSON = await res.json()
        console.log(resJSON)
        setDrivesList(resJSON)
        
        return resJSON
    }
    
    // const fetchUserDrives = async () => {
    //     setisListLoading(true)
    //     const listRes = await listResult();
    //     setisListLoading(false)
    //     return listRes
    // }
    // useEffect(()=> {
    // const getList = fetchUserDrives()
    //     setDrivesList(getList)
    // },[isListLoading])
    return (
    <drivesContext.Provider value={{drivesList,fetchUserDrives,sortField,sortOrder,setSortField,setSortOrder,fetchSingleDrive,singleDrive}}>
        {children}
    </drivesContext.Provider>
  )
}


export default DrivesProvider