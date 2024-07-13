import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from 'react-redux'
import { getProfile, fetchProfile } from '../../store/profile/profileSlice'
import { getWedding } from '../../store/wedding/weddingSlice';

const Profile = () => {
  const dispatch = useDispatch()
  const profile = useSelector(getProfile)
  const { user, isAuthenticated, isLoading } = useAuth0();
  const profileStatus = useSelector(state => state.profile.status)
  const error = useSelector(state => state.profile.error)
  useEffect(() => {
    const getToken = async () => {
      try {
        if (profileStatus === 'idle') {
          dispatch(fetchProfile({email: user.email, weddingId: '659cfdc8ef6b5b99ee54d605'}))
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    getToken();
  }, [profileStatus, dispatch])
  let content

  if (profileStatus === 'loading') {
    content = console.log("loading")
  } else if (profileStatus === 'succeeded') {
    // Sort posts in reverse chronological order by datetime string
    content = `
    <h2>${profile.firstName}</h2>
    <h2>${profile.lastName}</h2>
    <p>${profile.email}</p>`
  } else if (profileStatus === 'failed') {
    content = <div>{error}</div>
  }
  
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  console.log(user);
  return (
    isAuthenticated && (
      <div>
        <h1>Profile</h1>
        {content}
      </div>
    )
  );
};

export default Profile;