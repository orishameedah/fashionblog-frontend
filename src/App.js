import Header from "./components/Header";
import React, {useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/app";

function App() {   //element means the component we want to be directed to
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  // console.log(isLoggedIn)
  useEffect(() => { 
    if (localStorage.getItem("userId")) {
      dispatch(authActions.login()); 
    }
  }, [dispatch])
  return(
    <React.Fragment>
      <header>
        <Header/>
      </header>
      <main>
        <Routes>
          { !isLoggedIn ?<Route path='/auth' element={<Auth />} /> :  //if the user is not logged in it should only show the auth page but if the user is logged in it should show the blogs page
          <>
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/blogs/add' element={<AddBlog />} /> 
          <Route path='/myblogs' element={<UserBlogs />} />
          <Route path='/myblogs/:id' element={<BlogDetail />} /></>
          }
        </Routes>       
      </main>
     </React.Fragment>
  )
}

export default App;
