// import React from 'react'
// import { Calendar } from 'react-calendar'
// import { useState } from 'react';
// const CalendarTool = () => {
//   const [date, setDate] = useState(new Date());

//   const onChange = (date) => {
//     setDate(date);
//   };
//   return (
//     <div><Calendar onChange={onChange} value={date}/>
//     {console.log(date.toString())}
//     </div>
//   )
// }

// export default CalendarTool


import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

export default function CalendarTool(props) {
  // const [value, setValue] = React.useState(dayjs());
  // const [selectedDate, setSelectedDate] = React.useState(new Date());
  // const [test,setTest] = React.useState('hi')
// console.log(value.$d)
// const newValue = new Date
    // const dateChange = (date) => {
    //     setValue(date)
    // }
    // console.log(value)
    // console.log(selectedDate)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* <Stack spacing={3}>
        
        <DatePicker
          disableFuture
          label="Responsive"
          openTo="year"
          views={['year', 'month', 'day']}
          value={value}
          onChange={(newValue) => {
              setValue(newValue)
              setSelectedDate(newValue)
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack> */}
      {props.children}
      {/* {children} */}
    </LocalizationProvider>
  );
}