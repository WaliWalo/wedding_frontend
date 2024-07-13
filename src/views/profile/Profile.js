import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from 'react-redux'
import { getProfile, fetchProfile } from '../../store/profile/profileSlice'

const Profile = () => {
  const dispatch = useDispatch()
  const profile = useSelector(getProfile)
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(profile);
  const profileStatus = useSelector(state => state.profile.status)
  const error = useSelector(state => state.profile.error)
  useEffect(() => {
    const getToken = async () => {
      try {
        if (profileStatus === 'idle') {
          dispatch(fetchProfile({email: user.email}))
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
    content = `<img src=${user.picture} alt=${user.name} />
    <h2>${user.name}</h2>
    <p>${user.email}</p>`
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
        <h1>Profilee</h1>
        {content}
      </div>
    )
  );
};

export default Profile;