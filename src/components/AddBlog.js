import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import React, {useState} from 'react'
import axios from "axios"
import {useNavigate} from 'react-router-dom';
import { useStyles } from './utils';

const labelStyle = {mb:1,mt:2,fontSize: '24px', fontWeight:'bold'};
const AddBlog = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState("")
  const [inputs, setInputs] = useState({
    title:"",
    description:"",
    url
    })
  const handleChange = (e) => {
    setInputs((prevState) =>({
      ...prevState,  //adding or spreading the value of the e.target.name and e.target.value
      [e.target.name] : e.target.value  //e.target.name which is refering to the name properties in the textfield
      //while e.target.value which is refering to the value of the properties in the textfield which is the string value that will be inserted        
  }));
  }
  const sendRequest = async () => {
    const res = await axios.post("https://fashionblog-backend.cyclic.app/api/blog/add",{
      title: inputs.title,
      description: inputs.description,
      image: url,  //the url which is d url of the image
      user: localStorage.getItem('userId')
    }).catch(error => console.log(error));
    const data = await res.data;
    return data
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(inputs);
    sendRequest().then(data=>console.log(data)).then(()=>navigate("/myblogs/"));
  }
      const uploadImage = async (e) => {  
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset','blog-images')
        setLoading(true) 
  
        const res = await fetch("https://api.cloudinary.com/v1_1/hameedah-images/image/upload",( 
          {
            method: 'POST',
            body: data
          }
        ))
    
        const file = await res.json()
        // console.log(file) 
    
        setUrl(file.secure_url)
        setLoading(false)
      }      
 
  return (
  <div>
    <form onSubmit={handleSubmit}>
      <Box 
        border={3} 
        borderColor='linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,121,99,1) 35%, rgba(0,212,255,1) 100%)'
        borderRadius={10} 
        boxShadow="10px 10px 20px #ccc" 
        padding={3} 
        margin={'auto'} 
        marginTop={3}
        display= 'flex' 
        flexDirection={'column'} 
        width={"80%"}
      >
        <Typography 
          className={classes.font}
          fontWeight={'bold'} 
          padding={3} 
          color="grey" 
          variant="h2" 
          textAlign={'center'}
        >
          Post Your Blog
        </Typography>
        <InputLabel className={classes.font} sx={labelStyle}>Title</InputLabel>
        <TextField className={classes.font}
          name="title" 
          onChange={handleChange} 
          value={inputs.title} 
          margin='auto' 
          variant="outlined" />
        <InputLabel className={classes.font} sx={labelStyle}>Description</InputLabel>
        <TextField className={classes.font}
          name="description" 
          onChange={handleChange} 
          value={inputs.description} 
          margin='auto' 
          variant="outlined" />
        <InputLabel className={classes.font} sx={labelStyle}>Choose your image blog by clicking on the choose file button below</InputLabel>
        <input
        type="file"
        name="file"
        placeholder="Upload an Image"
        onChange={uploadImage}
        />
        {
      loading?(
        <h3 color="red">Loading...</h3>
      ):(
        <TextField className={classes.font}
          type="text"
          onChange={handleChange} 
          value={url}
          margin='auto' 
          variant="outlined" />
      )
    }
    <Button 
      sx={{mt:2,borderRadius:4}} 
      variant="contained" 
      color="warning" 
      type='submit'>Submit</Button>
    </Box>
    </form>
  </div>
  )
}

export default AddBlog;