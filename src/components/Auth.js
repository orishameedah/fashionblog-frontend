import React, {useState} from "react";
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { authActions } from "../store/app";
import { useNavigate } from 'react-router-dom'
import { useStyles } from './utils'

const Auth = () => {
    const classes = useStyles()
    const navigate = useNavigate()  
    const dispatch = useDispatch()  
    const [inputs, setInputs] = useState({
        name:"",
        email:"",
        password:""
    })
    const [isSignup, setIsSignup] = useState(false)
    const handleChange = (e) => {
        setInputs((prevState) =>({ 
            ...prevState,  
            [e.target.name] : e.target.value  
        }));
    };
    const sendRequest = async (type="login") => {
       const res = await axios.post(`https://fashionblog-backend.cyclic.app/api/user/${type}`, {//it will be a post request becos the login and signup is a post request
            name: inputs.name,
            email: inputs.email,    //the json request and inputs which we need to send to the backend
            password: inputs.password
        }).catch(error=>console.log(error))

        const data = await res.data;  //and now we are using the data if it sucessful to return the data pass in 
        // console.log(data)
        return data;
    
    }
    const handleSubmit = (e) =>{
        e.preventDefault() //we need to prevent it becos it will send the form to the url so that is why we need e.preventDefault to avoid any app crashed
        // console.log(inputs)
        if (isSignup) {
            sendRequest("signup")
            .then((data)=>localStorage.setItem("userId", data.user._id))  //storing the each user id inside the localStorage
            .then(()=>dispatch(authActions.login()))
            .then(()=>navigate("/blogs"))
            // .then(data=>console.log(data)) //if the signup is true is should do this
        }else{ //with the dispatch() we are saying that if the user is login it should render the login page for the user which are the access to the blogs
            sendRequest()
            .then((data)=>localStorage.setItem("userId", data.user._id))  //storing the each user id inside the localStorage
            .then(()=>dispatch(authActions.login()))
            .then(()=>navigate("/blogs"))  //after login in as a user it should navigate the user to the blogs page
            // .then(data=>console.log(data))   //after the login inputs then we can now send the login request
        }
        
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box 
                maxWidth={400}
                display="flex" 
                flexDirection={'column'} 
                alignItems='center' 
                justifyContent={'center'}
                boxShadow="10px 10px 20px #ccc"
                padding={3}
                margin='auto'
                marginTop= {5}
                borderRadius={5}
                >  
                {/*Box serves as a div */}
                    <Typography variant="h3" padding={3} textAlign="center">  {/*Typography serve as a text for styling*/}
                    {isSignup ? "Signup" : "Login"}   {/*if signup exist it should either the Login Header text or signup header */}
                    </Typography>
                    { isSignup &&   //it should only show isSignUp if it t
                       <TextField 
                        name="name"
                        onChange={handleChange}
                        value={inputs.name} 
                        placeholder="Name" 
                        margin="normal" />}  
                    <TextField 
                        name="email"
                        onChange={handleChange}
                        type={'email'} 
                        value={inputs.email} 
                        placeholder="Email" 
                        margin="normal" />
                    <TextField 
                        name="password"
                        onChange={handleChange}
                        type={'password'} 
                        value={inputs.password} 
                        placeholder="Password" 
                        margin="normal" />
                    <Button 
                        type='submit'
                         variant="contained" 
                        sx={{borderRadius: 3, marginTop: 3}} 
                        color= "warning">Submit</Button>
                        <Typography  className={classes.font} sx={{marginTop: 3}} variant="p" textAlign="center" >
                            If you are already a user login or a new user click on the text below 
                            to signup
                        </Typography>
                        <Button 
                        onClick={()=>setIsSignup(!isSignup)} 
                        sx={{borderRadius: 3, marginTop: 2}} >
                        Change To {isSignup ? "Login" : "Signup"}  {/*it should change if the signup is true to either Login screen or Signup screen*/}
                    </Button>
                    {/*which means the change to signup should only change if the value of the isSignup is false when the state isSignup is true*/}
                </Box>
            </form>
        </div>
    )
}

export default Auth