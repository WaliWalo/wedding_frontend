
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux'
import { getProfile, updateProfile } from '../../store/profile/profileSlice'
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState  } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const YesModal = () => {
    const profile = useSelector(getProfile);
    const dispatch = useDispatch();
    const [value, setValue] = useState(""); 
    function handleChange(e) { 
        setValue(e.target.value); 
    } 
    const guestSubmit = (e) => {    
        e.preventDefault();   
        const addGuest = async () => {
            try {
              let updatedProfile = {...profile};
              updatedProfile.additionalGuests = [...profile.additionalGuests];
              updatedProfile.additionalGuests.push(value);
              updatedProfile.accepted = true;
              setValue("");    
              dispatch(updateProfile({userId: profile.id, weddingId: '659cfdc8ef6b5b99ee54d605', updatedProfile}))   
            } catch (e) {
              console.log(e.message);
            }
          };
        addGuest();
    }
    const removeGuest = (selectedGuest) => {
        const removeGuest = async () => {
            try {
              let updatedProfile = {...profile};
              let indexToRemove = updatedProfile.additionalGuests.indexOf(selectedGuest);
              updatedProfile.additionalGuests = [...profile.additionalGuests];
              updatedProfile.additionalGuests.splice(indexToRemove, 1);
              dispatch(updateProfile({userId: profile.id, weddingId: '659cfdc8ef6b5b99ee54d605', updatedProfile}))   
            } catch (e) {
              console.log(e.message);
            }
          };
        removeGuest();        
    }

    // useEffect(() => {
    //     let updatedProfile = profile;
    //     profile.additionalGuests.concat(value);
    //     dispatch(updateProfile({token, userId: profile.id, weddingId: '659cfdc8ef6b5b99ee54d605', updatedProfile})) 
    // }, [token])
    
    let content;
    content = <div>
        <Modal.Header closeButton>
            <Modal.Title>Great! Can't wait to see you!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            How many are you bringing with you?
            <ListGroup as="ol" numbered className='my-2'>
                <ListGroup.Item as="li">{profile.firstName.charAt(0).toUpperCase() + profile.firstName.slice(1)} {profile.lastName.charAt(0).toUpperCase() + profile.lastName.slice(1)}</ListGroup.Item>
                {profile.additionalGuests.map((x, i) => <ListGroup.Item className='d-flex justify-content-start align-items-center' key={i} as="li"> {x} <Button className='ms-auto' variant="outline-danger" onClick={() => removeGuest(x)}><FontAwesomeIcon icon={faTrash} /></Button></ListGroup.Item>)}
            </ListGroup>
            <Form className='d-flex flex-column align-items-center' onSubmit={guestSubmit}>
                <FloatingLabel
                    controlId="addGuestInput"
                    label="Full name"
                    className="mb-3 w-100"
                >
                    <Form.Control type="text" required placeholder="John Snow" onInput={handleChange}/>
                </FloatingLabel>
                <Button variant="primary" type="submit" className='m-auto'>
                    Add Guest
                </Button>
            </Form>
        </Modal.Body>       
    </div>
    return content;
}