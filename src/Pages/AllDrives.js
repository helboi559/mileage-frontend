import React from 'react'
import { useEffect,useState } from 'react'
import { useAuth} from '../Hooks/Auth'
import { useDrives } from '../Hooks/Drives'
import DrivesTable from "../Components/DrivesTable"
import ColumnGroupingTable from '../Components/DrivesTable'
// import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import FormDialog from '../Components/FormDialog'

const sortFieldOption = ["date","origin","destination"]
const sortOrderOption = ["asc","desc"]
const columns = [
  { id: 'date', label: 'Date', minWidth: 75 },
  { id: 'origin', label: 'Origin', minWidth: 75 },
  {
    id: 'destination',
    label: 'Destination',
    minWidth: 75,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'mileage',
    label: 'Miles',
    minWidth: 75,
    align: 'right',
    format: (value) => Number(value/1609).toFixed(2),
  },
  {
    id: 'total',
    label: '($) Total Expensed',
    minWidth: 75,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];
// format: (value) => value.toLocaleString('en-US')
function createData(name, code, population, size) {
  // const density = population / size;
  return { name, code, population, size};
}
const AllDrives = () => {
  
  
  const {user} = useAuth()
  // const [userDrivesLoading,setUserDrivesLoading] = useState(false)
  const {
    drivesList,
    fetchUserDrives,
    sortField,
    sortOrder,
    setSortField,
    setSortOrder,
    fetchSingleDrive,
    singleDrive
  } = useDrives()
  const {success,message}= drivesList
  // console.log(success)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [originEdit, setOriginEdit] = useState('');
  const [destinationEdit, setDestinationEdit] = useState('');
  const [tollsEdit, setTollsEdit] = useState(0);
  const [parkingEdit, setParkingEdit] = useState(0);
  // const [dateEdit,setDateEdit] = useState('')
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  //persistent on refresh to fetch list by user
  useEffect(()=> {
    fetchUserDrives()
    
  },[user,sortField,sortOrder])
  // console.log()
  // {!success && message}
  // console.log(singleDrive)
  return (
       <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          
          <TableHead>
            
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 0, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            
              {success && (
                <>
                {message
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  // console.log(row.tripId)
                 const fetchDriveAndShow = async ()=> {
                   const res = await fetchSingleDrive(row.tripId)
                  //  const resJSON = res.message
                   console.log("fetchDriveAndShow()",res)
                  //  setDateEdit(res.message.date)
                   setOriginEdit(res.message.origin)
                   setDestinationEdit(res.message.destination)
                   setTollsEdit(res.message.tolls)
                   setParkingEdit(res.message.parking)
                  //  console.log(dateEdit)
                   
                 }
                return (
                  
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.tripId}>
                    
                    {columns.map((column) => {
                      // let miles = Number(row.mileage) /1609
                      const value = row[column.id];
                      // console.log(value)
                      // console.log(row.mileage)
                      // <FormDialog></FormDialog>
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                            {/* {console.log("hi")} */}
                            
                        </TableCell>
                      );
                      
                    })}
                    <FormDialog fetchDriveAndShow={fetchDriveAndShow} originEdit={originEdit} setOriginEdit={setOriginEdit}/>
                  </TableRow>
                  
                );
              })}
              </>
              )}
          </TableBody>
          
        </Table>
        
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={message.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    
  )
}

export default AllDrives

//second below


//first below

// import React from 'react'
// import { useEffect,useState } from 'react'
// import { useAuth} from '../Hooks/Auth'
// import { useDrives } from '../Hooks/Drives'
// const sortFieldOption = ["date","origin","destination"]
// const sortOrderOption = ["asc","desc"]

// const AllDrives = () => {
  
  
//   const {user} = useAuth()
//   // const [userDrivesLoading,setUserDrivesLoading] = useState(false)
//   const {
//     drivesList,
//     fetchUserDrives,
//     sortField,
//     sortOrder,
//     setSortField,
//     setSortOrder
//   } = useDrives()
//   const {success,message}= drivesList
//   // console.log(success)
//   const calcTotal = (arr) => {
//     //totalCount
//     //go through list 
//       //add count
//   }
//   //persistent on refresh to fetch list by user
//   useEffect(()=> {
//     fetchUserDrives()
    
//   },[user,sortField,sortOrder])
//   // console.log()
  
//   return (
//     <div>
      
       
//        <div className='sort-by'>
//             <label>Sorted by</label>
//             <select value={sortField} onChange={(e) => {
//               setSortField(e.target.value)
//             }}>
//               {sortFieldOption.map((ele,index) =>{
//                 return (
//                   <option key={`sortfield-option-${index}`} value={ele}>{ele}</option>
//                 )
//               })}
//             </select>
//             <label>In</label>
//             <select value={sortOrder} onChange={(e) => {
//               setSortOrder(e.target.value)
//             }}>
//               {sortOrderOption.map((ele,index) =>{
//                 return (
//                   <option key={`sortorder-option-${index}`} value={ele}>{`${ele} order`}</option>
//                 )
//               })}
//             </select>
//           </div>  
//       {!success && message}
//       {success && (
//         <section>
//           {message.map((drive,index)=> {
//             return (
//               <div key={`drive-${index}`}><hr />
//               <span><strong>origin</strong> {drive.origin}</span>
//               <span> <strong>destination</strong> {drive.destination}</span>
//               {/* {drive.destination} */}
//               </div>
//             )
//           })}
//         </section>
//       )}
      
      
//     </div>
//   )
// }

// export default AllDrives