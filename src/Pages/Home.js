import React from 'react'
import { useAuth } from '../Hooks/Auth'
import Totals from '../Components/Totals'
import { useEffect,useState } from 'react'
import { useDrives } from '../Hooks/Drives'
const Home = () => {
  const {user} = useAuth()
  const {drivesList,fetchUserDrives} = useDrives()
  
  // console.log(fetchUserDrives())
  useEffect(()=> {
    fetchUserDrives()
    
  },[user])
  // console.log(drivesList)
  const {success,message,sum}= drivesList
  // console.log(message)
  // const sumMiles = (arr) => {
  //   const sum = milesSum
  //   const sumWithInitial= arr.reduce((prev,curr) => prev.milage + curr.milage, sum)
  //   console.log(sumWithInitial)
  //   setMilesSum(sumWithInitial)
  //   return sumWithInitial
  // }
  // console.log(sum[0].mileage)
  return (
    <div>
      {!success && (<p>hi</p>)}
      {success && (
         <section>
           <Totals sum={sum}/>
          {message.map((drive,index)=> {
            return (
              <div key={`drive-${index}`}><hr />
              <span><strong>origin</strong> {drive.origin}</span>
              <span> <strong>destination</strong> {drive.destination}</span>
              {/* {drive.destination} */}
              </div>
            )
          })}
        </section>
      )}
    </div>
  )
}

export default Home

