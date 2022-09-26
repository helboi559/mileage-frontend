import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup'
import { Link } from 'react-router-dom';
import { useAuth } from '../Hooks/Auth'

const pages = ['dashboard', 'all-drives'];
const settings = ['login', 'registration' ];
// const loggedIn = ['profile'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
// const {user} = useAuth()

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const {user,logout} = useAuth()
//   console.log(user)
 
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
              <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {user ? (
              <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              
               {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center"><Link style={{textDecoration:"none",color:"inherit"}} to={`/${page}`}>{page}</Link></Typography>
                    </MenuItem>
                    ))}
            </Menu>
            ):(
              <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            ></Menu>
            )}
            
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          {user ? (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
            {pages.map((page) => (
                <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    <Link style={{textDecoration:"none",color:"white"}}to={`/${page}`}>{page}</Link>
                </Button>
                ))}
          </Box>
          ):(<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>)}
         
             <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            

            {!user && (
              <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                
                  
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center"><Link style={{textDecoration:"none",color:"inherit"}}to={`/${setting}`}>{setting}</Link></Typography>
                </MenuItem>
                
              ))}
            </Menu>
            )}
            
            {user && (
              <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={async()=> await logout()}>logout</MenuItem>
            </Menu>
            )}
            
          </Box>
        
          
        </Toolbar>
         
        
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;



// const ResponsiveAppBar = () => {
//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const [anchorElUser, setAnchorElUser] = React.useState(null);
//   const {user,logout} = useAuth()
// //   console.log(user)
 
//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };
  
//   return (
//     <AppBar position="static">
//       <Container maxWidth="xl">
//               <Toolbar disableGutters>
//           <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
//           <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             href="/"
//             sx={{
//               mr: 2,
//               display: { xs: 'none', md: 'flex' },
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >
//             LOGO
//           </Typography>

//           <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'left',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: 'block', md: 'none' },
//               }}
//             >
//               {user && (
//                   <>
//                   {pages.map((page) => (
//                     <MenuItem key={page} onClick={handleCloseNavMenu}>
//                     <Typography textAlign="center"><Link style={{textDecoration:"none",color:"inherit"}} to={`/${page}`}>{page}</Link></Typography>
//                     </MenuItem>
//                     ))}
//                   </>
//               )}
//               {!user && (
//                   <></>
//               )}
              
//             </Menu>
//           </Box>
//           <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
//           <Typography
//             variant="h5"
//             noWrap
//             component="a"
//             href=""
//             sx={{
//               mr: 2,
//               display: { xs: 'flex', md: 'none' },
//               flexGrow: 1,
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >
//             LOGO
//           </Typography>
//           <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//             {user && (
//                 <>
//                 {pages.map((page) => (
//                 <Button
//                     key={page}
//                     onClick={handleCloseNavMenu}
//                     sx={{ my: 2, color: 'white', display: 'block' }}
//                 >
//                     <Link style={{textDecoration:"none",color:"white"}}to={`/${page}`}>{page}</Link>
//                 </Button>
//                 ))}
//                 </>
//             )}
//             {!user && (
//                 <></>
//             )}
//           </Box>
         
//              <Box sx={{ flexGrow: 0 }}>
//             <Tooltip title="Open settings">
//               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                 <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
//               </IconButton>
//             </Tooltip>
//             <Menu
//               sx={{ mt: '45px' }}
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//              {!user && (
//                  <>
                 
//                  {settings.map((setting) => (
//                 <MenuItem key={setting} onClick={handleCloseUserMenu}>
//                   <Typography textAlign="center"><Link style={{textDecoration:"none",color:"inherit"}}to={`/${setting}`}>{setting}</Link></Typography>
//                 </MenuItem>
//               ))}
//                  </>
//              )} 
//              {user && (
//                  <div>
//                   <MenuItem onClick={async()=> await logout()}>logout</MenuItem>
//                  </div>
//              )}
             
//             </Menu>
//           </Box>
        
          
//         </Toolbar>
         
        
//       </Container>
//     </AppBar>
//   );
// };
// export default ResponsiveAppBar;


// import React from 'react'
// import "../Styles/NavBarStyles.css"
// import { NavLink } from 'react-router-dom'
// import {useState} from "react"
// import { useAuth } from '../Hooks/Auth'
// import {FaBars} from "react-icons/fa"
// const menuData = [
//         {
//             path:"/",
//             name: "Home"
//         },
//         {
//             path:'/registration',
//             name: "Registration"
//         },
//         {
//             path:'/login',
//             name: "login"
//         }
//     ]

// const loggedIn = [
//         {
//             path:"/",
//             name: "Home"
//         },
//         {
//             path:'/dashboard',
//             name: "Dashboard"
//         },
//         {
//             path:'/all-drives',
//             name: "All Drives"
//         }
//     ]
// const NavBar = () => {
//     const {user,logout} = useAuth()
//     // const [user,setuser] = useState(true)
//     const [click,setClick] = useState(false)
//     //toggle bars
//     const handleClick = () => setClick(!click)
//     return (
//     <nav>
//         {console.log(user)}
//         <div className="bars">
//                 <FaBars onClick={handleClick}/>
//         </div>
//         {!user && (
//             <div className="menu" style={{left: click ? "-100%" : "0"}}>
//             {
//                 menuData.map((item)=>(
//                     <NavLink to={item.path} key={item.name}>
//                         <div className="list_item">{item.name}</div>
//                     </NavLink>
//                 ))
//             }
//         </div>
//         )}
//         {user && (
//             <div className="menu" style={{left: click ? "-100%" : "0"}}>
//             {
//                 loggedIn.map((item)=>(
//                     <NavLink to={item.path} key={item.name}>
//                         <div className="list_item">{item.name}</div>
//                     </NavLink>
//                 ))
//             }
//             <button className="list_item btn" onClick={async () => {
//                 await logout()
//               }}>Logout</button>
//               <span className='list_item'>
//                 <p>Logged in</p>
//                 </span>
//         </div>
//         )}
//     </nav>
//   )
// }

// export default NavBar