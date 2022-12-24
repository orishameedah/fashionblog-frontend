import React, { useEffect, useState } from "react";
import Blog from './Blog'
import axios from "axios";
const UserBlogs = () => {
  const [user, setUser] =useState()
  const id = localStorage.getItem("userId");
  const sendRequest = async () =>{
    const res = await axios
    .get(`https://fashionblog-backend.cyclic.app/api/blog/user/${id}`)
    .catch(error=>console.log(error))
    const data = await res.data;
    return data
  }
  useEffect(() => {
    sendRequest().then((data)=>setUser(data.user))
  })
  // console.log(user);
  return ( 
  <div> 
    {" "}
    {user && user.blogs && 
    user.blogs.map((blog, index) => (   //it will also render each blog item
    <Blog 
    key={index}
    id={blog._id}
    isUser={true}
    title={blog.title} 
    description={blog.description} 
    imageCloud={blog.image} 
    userName={user.name}
    />
    ))} 
  </div>
  )
}

export default UserBlogs;