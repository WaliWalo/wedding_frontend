import React, { useEffect, useState  } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import { getWedding, fetchWedding } from '../../store/wedding/weddingSlice';
import { useSelector, useDispatch } from 'react-redux';
import { getProfile, fetchProfileByName } from '../../store/profile/profileSlice'
import {createUser} from '../../services/api.js'
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const wedding = useSelector(getWedding);
    const weddingStatus = useSelector(state => state.wedding.status);
    const error = useSelector(state => state.wedding.error);
    
    const profile = useSelector(getProfile);
    const profileStatus = useSelector(state => state.profile.status);
    const profileError = useSelector(state => state.profile.error);

    const [passCode, setPassCode] = useState(""); 
    const [firstName, setFirstName] = useState(""); 
    const [lastName, setLastName] = useState(""); 
    function handlePass(e) { 
        setPassCode(e.target.value.trim().toLowerCase()); 
    } 
    function handleFirstName(e) { 
        setFirstName(e.target.value.trim().toLowerCase()); 
    } 
    function handleLastName(e) { 
        setLastName(e.target.value.trim().toLowerCase()); 
    } 
    useEffect(() => {
        if (weddingStatus === 'idle') {
          dispatch(fetchWedding({weddingId: '659cfdc8ef6b5b99ee54d605'}))
        }
      }, [weddingStatus, dispatch])

    useEffect(() => {
        async function create() {
            let createUserResult = await createUser(firstName, lastName);
        }
        if(profileStatus === "succeeded" && weddingStatus === "succeeded"){
            if(passCode !== "" && firstName !== "" && lastName !== ""){
                if(passCode.trim().toLowerCase() !== wedding.passCode.trim().toLowerCase()){
                    Swal.fire({
                        title: 'Oops',
                        text: 'Passcode does not match!',
                        icon: 'error',
                        confirmButtonText: 'Cool'
                    })
                }else{
                    console.log(profile);
                    if(profile === null){                    
                        Swal.fire({
                            title: 'Welcome',
                            text: 'Creating User',
                            icon: 'success',
                            confirmButtonText: 'Cool'
                        }).then(() => {                    
                            localStorage.setItem("myUserName", `${firstName}_${lastName}`);
                            // create();
                            navigate('/')
                        });
                    }else{
                        localStorage.setItem("myUserName", `${firstName}_${lastName}`);
                        navigate('/');
                    }
                }
            }
        }
    }, [profileStatus, weddingStatus])
      
    const loginSubmit = async (e) => {    
        e.preventDefault();   
        dispatch(fetchProfileByName({name: `${firstName}_${lastName}`, weddingId: '659cfdc8ef6b5b99ee54d605'}))
    }
    return (
        <div className="d-flex justify-content-center align-content-center vh-100 flex-wrap flex-column">
            <h1 className='text-center'>Login to Jin & Rebecca's Wedding</h1>
            <Form className='d-flex flex-column align-items-center' onSubmit={loginSubmit}>
                <FloatingLabel
                    controlId="passCodeInput"
                    label="Passcode"
                    className="mb-3 w-100"
                >
                    <Form.Control type="text" required placeholder="John Snow" onInput={handlePass}/>
                </FloatingLabel>
                <div className='w-100 mb-3 d-flex'>
                    <FloatingLabel
                        controlId="firstNameInput"
                        label="First Name"
                        className="w-50"
                    >
                        <Form.Control type="text" required placeholder="John Snow" onInput={handleFirstName}/>
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="lastNameInput"
                        label="Last Name"
                        className="w-50"
                    >
                        <Form.Control type="text" required placeholder="John Snow" onInput={handleLastName}/>
                    </FloatingLabel>
                </div>
                <Button variant="danger" type="submit" className='m-auto'>
                    Enter
                </Button>
            </Form>
        </div>);
};
  
export default Login;