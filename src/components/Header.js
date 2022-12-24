import React, {useState} from 'react';
import { useSelector } from "react-redux";
import {AppBar, Typography, Toolbar, Tabs, Tab, Button, Box} from "@mui/material";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from "../store/app";
import { useStyles } from './utils'

const Header = () => { 
  const classes = useStyles()
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setValue] = useState()
  return (
    <AppBar 
    position='sticky'   //sticky means the position of the name will be above the header bar
    sx={{
      background:
      'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,121,99,1) 35%, rgba(0,212,255,1) 100%)'
      }}>
      <Toolbar>
          <Typography className={classes.font} variant='h4'>FashionBlogsApp</Typography> {/*typography is use to add some text for styling*/}
          {isLoggedIn && //is isLoggedIn it true in which if the user has login it  should login and also render this screen
          <Box 
            display="flex" 
            marginLeft={'auto'} 
            marginRight={'auto'}> {/*Box is acted as a div in the material ui*/}
            <Tabs //Tabs will help us to navigate between the links like a button features and also like a Route component but it contains the value of the child Tab cos Tabs are parent Tabs
              textColor="inherit"
              value={value} 
              onChange={(e, val)=> setValue(val)}> {/*which clicking on the label tabs on click it should be alignted*/}
              <Tab  //label of All Blogs will be shown on the Header as a component with a button which he user can view on all do things on it
               className={classes.font} LinkComponent={Link} to="/blogs" label="All Blogs"/> {/*just like the way we use element in react for component we also use LinkComponent in material ui*/}
              <Tab   
               className={classes.font} LinkComponent={Link} to="/myblogs" label="My Blogs"/>      
              <Tab   
               className={classes.font} LinkComponent={Link} to="/blogs/add" label="Add Blog"/>        
            </Tabs>
          </Box>}  {/* is only show this screen if isLoggedIn is true */}
          <Box display="flex" marginLeft="auto">
            { !isLoggedIn && <>  {/* show this when isLoggedIn is false it should render this screen */}
            <Button 
              LinkComponent={Link} to="/auth"
              variant='contained' 
              sx={{margin: 1, borderRadius: 10}}
              color="warning">
                Login
            </Button>
            
            </>} 
            { isLoggedIn && (
            <Button    //isLoggedIn meaning it should only show the logout screen with it false
              onClick={()=>dispatch(authActions.logout())}   
              LinkComponent={Link} to="/auth"
              variant='contained' 
              sx={{margin: 1, borderRadius: 10}} 
              color="warning">
                Logout
            </Button>
            )}
          </Box>  
      </Toolbar>
  </AppBar>
  )
};

export default Header;