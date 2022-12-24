import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Blog from './Blog.js';

const Blogs = () => {
  const [blogs, setBlogs] = useState()
  const sendRequest = async () => {
    const res = await axios.get("https://fashionblog-backend.cyclic.app/api/blog/") 
    .catch(error=>console.log(error));  
    const data = await res.data;
    return data;
  }
  useEffect(() => { 
    sendRequest().then(data=> setBlogs(data.blogs));
   }, []);  //useeffect which will allow us to run after render
  // console.log(blogs) 
  return <div>
  {blogs && 
  blogs.map((blog, index) => (   //it will also render each blog item
  <Blog 
  id={blog._id}
  isUser={localStorage.getItem("userId")===blog.user._id}  
  title={blog.title} 
  description={blog.description} 
  imageCloud={blog.image} 
  userName={blog.user.name}
  />
  ))} 
 </div>
}
//it should render the blog component and the blogs from the mongodb on the blog component

export default Blogs