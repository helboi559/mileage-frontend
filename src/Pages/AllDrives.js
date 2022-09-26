import React from 'react'
import { useEffect,useState } from 'react'
import { useAuth } from '../Hooks/Auth'

const sortFieldOption = ["date","origin","destination"]
const sortOrderOption = ["asc","desc"]

const AllDrives = ({urlEndpoint}) => {
  
  const {user} = useAuth()
  const [drivesList,setDrivesList] = useState({message:[],success:false})
  const [sortField,setSortField] = useState("")
  const [sortOrder,setSortOrder] = useState("asc")
  const [userDrivesLoading,setUserDrivesLoading] = useState(false)
  const {success,message}= drivesList
  console.log(success)
  useEffect(()=> {
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
    setDrivesList(resJSON)
    return resJSON
    }
    fetchUserDrives()
  },[user,sortField,sortOrder,userDrivesLoading])
  // console.log()
  return (
    <div>
       
       <div className='sort-by'>
            <label>Sorted by</label>
            <select value={sortField} onChange={(e) => {
              setSortField(e.target.value)
            }}>
              {sortFieldOption.map((ele,index) =>{
                return (
                  <option key={`sortfield-option-${index}`} value={ele}>{ele}</option>
                )
              })}
            </select>
            <label>In</label>
            <select value={sortOrder} onChange={(e) => {
              setSortOrder(e.target.value)
            }}>
              {sortOrderOption.map((ele,index) =>{
                return (
                  <option key={`sortorder-option-${index}`} value={ele}>{`${ele} order`}</option>
                )
              })}
            </select>
          </div>  
      {!success && message}
      {success && (
        <section>
          {message.map((drive,index)=> {
            return (
              <div>
              {drive.destination}
              </div>
            )
          })}
        </section>
      )}
      
      
    </div>
  )
}

export default AllDrives