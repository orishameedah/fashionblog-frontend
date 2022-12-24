import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import {useStyles} from './utils'

const labelStyle = {mb:1,mt:2,fontSize: '24px', fontWeight:'bold'};
const BlogDetail = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState("")
  const [blog, setBlog] = useState()
  const id = useParams().id   //useParams() Returns an object of key/value pairs of the dynamic params from the current URL that were matched by the route path.
  console.log(id);  //returns the user id 
  const [inputs, setInputs] = useState({})
  const handleChange = (e) => {
    setInputs((prevState) =>({
      ...prevState,  //adding or spreading the value of the e.target.name and e.target.value
      [e.target.name] : e.target.value  //e.target.name which is refering to the name properties in the textfield
      //while e.target.value which is refering to the value of the properties in the textfield which is the string value that will be inserted        
  }));
  }

  const fetchDetails = async () => {
    const res = await axios.get(`https://fashionblog-backend.cyclic.app/api/blog/${id}`)
    .catch(error=>console.log(error))
    const data = await res.data;
    return data;
  }
  useEffect(() => { 
    fetchDetails().then(data=>{
      setBlog(data.blog)
      setInputs({title: data.blog.title, description: data.blog.description, url: data.blog.image})
    })
  }, [id]);
  const sendRequest = async () => {
    const res = await axios.put(`https://fashionblog-backend.cyclic.app/api/blog/update/${id}`, {
      title: inputs.title,
      description: inputs.description,
      image: url
    }).catch(error => console.log(error));

    const data = await res.data;
    return data;
  }
  // console.log(blog);
  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(inputs);
    sendRequest()
    // .then((data) => console.log(data))
    .then(()=>navigate("/myblogs/"));
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
      {inputs && (
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
      <Typography fontWeight={'bold'} padding={3} color="grey" variant="h2" textAlign={'center'}>
        Update Your Blog
      </Typography>
      <InputLabel sx={labelStyle}>Title</InputLabel>
      <TextField 
        name="title" 
        onChange={handleChange} 
        value={inputs.title} 
        margin='auto' 
        variant="outlined" />
      <InputLabel sx={labelStyle}>Description</InputLabel>
      <TextField 
        name="description" 
        onChange={handleChange} 
        value={inputs.description} 
        margin='auto' 
        variant="outlined" />
      <InputLabel sx={labelStyle}>Choose your image blog</InputLabel>
      <input
        type="file"
        name="file"
        placeholder="Upload an Image"
        onChange={uploadImage}
        />
        {
      loading?(
        <h3>Loading...</h3>
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
    type='submit'>Submit
  </Button>
    </Box>
  </form>
  )}
  </div>
  )
}

export default BlogDetail