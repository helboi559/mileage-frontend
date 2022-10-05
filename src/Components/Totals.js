import React from 'react'
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
const Grid = styled(MuiGrid)(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
  },
}));

// export default function VerticalDividerText() {
  


const Totals = ({sum}) => {
 
  // const [milesSum,setMilesSum] = useState(0)
  // const [reimburstmentSum,setReimburstmentSum] = useState(0)
  // const [milesSum,setMilesSum] = useState(0)
    return (
      <>
      {sum && (
        <Grid container>
      <Grid item xs>
        <div>
            Count:{sum[0].count}
        </div>
      </Grid>
      <Divider orientation="vertical" flexItem variant='fullWidth'/>
      <Grid item xs>
        <div>
            Mileage:{sum[0].mileage}
        </div>
      </Grid>
      <Divider orientation='vertical' flexItem/>
      <Grid item xs>
         <div>
            Logged:{sum[0].total}
        </div>
      </Grid>
    </Grid>
      )}
    
    </>
  )
}

export default Totals


// import * as React from 'react';
// import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
// import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
// import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
// import FormatBoldIcon from '@mui/icons-material/FormatBold';
// import FormatItalicIcon from '@mui/icons-material/FormatItalic';
// import Box from '@mui/material/Box';
// import Divider from '@mui/material/Divider';

// export default function Totals() {
//   return (
//     <div>
//       <Box
//         sx={{
//           display: 'flex',
//           alignItems: 'center',
//           width: 'fit-content',
//           border: (theme) => `3px solid ${theme.palette.divider}`,
//           borderRadius: 1,
//           bgcolor: 'background.paper',
//           color: 'text.secondary',
//           '& svg': {
//             m: 1.5,
//           },
//           '& hr': {
//             mx: 0.5,
//           },
//         }}
//       >
//         {"hi"}
//         <FormatAlignRightIcon />
//         <Divider orientation="vertical" flexItem />
//         <FormatBoldIcon />
//         <FormatItalicIcon />
//       </Box>
//     </div>
//   );
// }

// export default Totals