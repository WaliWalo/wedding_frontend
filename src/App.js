import './App.css';
import  Profile  from './components/auth0/Profile';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import WishList from './views/wishlist/Wishlist';
import Layout from './views/layout/Layout';
import Home from './views/home/Home';
import NoPage from './views/misc/NoPage';
import Login from './views/login/Login';
import React, { useEffect, useState  } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getProfile, fetchProfileByName } from '../src/store/profile/profileSlice'
import { Cloudinary } from "@cloudinary/url-gen";

function App() {
  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'waliwalo'
    }
  });
  const [userName, setUserName] = useState(localStorage.getItem("myUserName")); 
  const dispatch = useDispatch();
  const profile = useSelector(getProfile);

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchProfileByName({name: `${userName}`, weddingId: '659cfdc8ef6b5b99ee54d605'}))

    if(userName === null || profile == null){
      navigate('/login');
    }
  }, [])

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="wishlist" element={<WishList />} />
          <Route path="*" element={<NoPage />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
