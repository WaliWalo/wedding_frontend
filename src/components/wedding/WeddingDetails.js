import React, { useEffect, useState  } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getWedding, fetchWedding } from '../../store/wedding/weddingSlice'
import { Loading } from '../misc/Loading';
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { NoModal } from './NoModal';
import { YesModal } from './YesModal';
import { getProfile, fetchProfile, updateProfile } from '../../store/profile/profileSlice'
import Swal from 'sweetalert2';

export const WeddingDetails = () => {
    const dispatch = useDispatch();
    const wedding = useSelector(getWedding);
    const weddingStatus = useSelector(state => state.wedding.status);
    const error = useSelector(state => state.wedding.error);
    const profile = useSelector(getProfile);
    const profileStatus = useSelector(state => state.profile.status);
    const profileError = useSelector(state => state.profile.error);

    const [show, setShow] = useState(false);
    const [rsvp, setRsvp] = useState(false);
    const [allergy, setAllergy] = useState("");
    const [overnight, setOvernight] = useState(0);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const selectYes = () => {
      setRsvp(true);
      handleShow();
      const updateYes = async () => {
        try {
          let updatedProfile = {...profile};
          updatedProfile.accepted = true;
          dispatch(updateProfile({userId: profile.id, weddingId: '659cfdc8ef6b5b99ee54d605', updatedProfile}))   
        } catch (e) {
          console.log(e.message);
        }
      };
      updateYes();
    }
    const selectNo = () => {
      setRsvp(false);
      handleShow();
      const updateNo = async () => {
        try {          
          let updatedProfile = {...profile};
          updatedProfile.accepted = false;
          dispatch(updateProfile({userId: profile.id, weddingId: '659cfdc8ef6b5b99ee54d605', updatedProfile}))   
        } catch (e) {
          console.log(e.message);
        }
      };
      updateNo();
    }

    const selectAllergyNo = () => {
      const updateAllergyNo = async () => {
        try {          
          let updatedProfile = {...profile};
          updatedProfile.allergy = "";
          dispatch(updateProfile({userId: profile.id, weddingId: '659cfdc8ef6b5b99ee54d605', updatedProfile}))   
        } catch (e) {
          console.log(e.message);
        }
      };
      updateAllergyNo();
      setAllergy("");
    }
    const selectAllergyYes = () => {
      Swal.fire({
        input: "textarea",
        inputValue: allergy,
        inputLabel: "Allergy Requirement",
        inputPlaceholder: "Type your allergy requirement here...",
        inputAttributes: {
          "aria-label": "Type your allergy requirement here"
        },
        showCancelButton: true,
        preConfirm: (value) => {
          console.log(value)
          const updateAllergyYes = async () => {
            try {          
              let updatedProfile = {...profile};
              updatedProfile.allergy = value;
              dispatch(updateProfile({userId: profile.id, weddingId: '659cfdc8ef6b5b99ee54d605', updatedProfile}))   
            } catch (e) {
              console.log(e.message);
            }
          };
          updateAllergyYes();
          setAllergy(value);
        }
      });
    }
    const selectOvernightNo = () => {
      const updateOvernightNo = async () => {
        try {          
          let updatedProfile = {...profile};
          updatedProfile.overnight = 0;
          dispatch(updateProfile({userId: profile.id, weddingId: '659cfdc8ef6b5b99ee54d605', updatedProfile}))   
        } catch (e) {
          console.log(e.message);
        }
      };
      updateOvernightNo();
      setOvernight(0);
    }
    const selectOvernightYes = () => {
      Swal.fire({
        input: "select",
        inputOptions: {
          1: 1,
          2: 2,
          3: 3
        },
        inputPlaceholder: "Select a number",
        inputLabel: "How many huts? Each huts sleeps 4, two double beds. (110 Pounds Each)",
        inputAttributes: {
          "aria-label": "How many huts?"
        },
        inputValue: overnight,
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value === "") {
              resolve("You need to select a number");
            }else{
              resolve();
            }
          });
        },
        preConfirm: (value) => {
          const updateOvernightYes = async () => {
            try {          
              let updatedProfile = {...profile};
              updatedProfile.overnight = value;
              dispatch(updateProfile({userId: profile.id, weddingId: '659cfdc8ef6b5b99ee54d605', updatedProfile}))   
            } catch (e) {
              console.log(e.message);
            }
          };
          updateOvernightYes();
          setOvernight(value);
        }
      });
    }

    useEffect(() => {
      if (weddingStatus === 'idle') {
        dispatch(fetchWedding({weddingId: '659cfdc8ef6b5b99ee54d605'}))
      }
    }, [weddingStatus, dispatch])

    useEffect(() => {
      setRsvp(profile.accepted);
      setAllergy(profile.allergy);
      setOvernight(profile.overnight);
    }, [profileStatus, dispatch])

    let content;
    if(profileStatus === "loading"){
        content = <Loading></Loading>
    }else if (profileStatus === "succeeded"){
        content = 
        <div>
            <h2 className='text-center'>
              RSVP by 01.01.2025
            </h2>
            <div className='d-flex justify-content-evenly'>
              <Button variant={rsvp ? "light" : "outline-light"} size="lg" className='px-5' onClick={selectYes}>
                Yes
              </Button>
              <Button variant={!rsvp ? "light" : "outline-light"} size="lg" className='px-5' onClick={selectNo}>
                No
              </Button>
            </div>
            <h2 className='text-center my-2'>Any Allergy Requirement?</h2>
            {allergy !== "" ? <div className='text-center'><span>{allergy}</span></div> : ""}
            <div className='d-flex justify-content-evenly'>
              <Button variant={allergy !== "" ? "light" : "outline-light"} size="lg" className='px-5' onClick={selectAllergyYes}>
                Yes
              </Button>
              <Button variant={allergy === "" ? "light" : "outline-light"} size="lg" className='px-5' onClick={selectAllergyNo}>
                No
              </Button>
            </div>
            <h2 className='text-center my-2'>Will you be staying overnight?</h2>
            {overnight !== 0 ? <div className='text-center'><span>{overnight} Huts</span></div> : ""}
            <div className='d-flex justify-content-evenly'>
              <Button variant={overnight !== 0 ? "light" : "outline-light"} size="lg" className='px-5' onClick={selectOvernightYes}>
                Yes
              </Button>
              <Button variant={overnight === 0 ? "light" : "outline-light"} size="lg" className='px-5' onClick={selectOvernightNo}>
                No
              </Button>
            </div>
            <Modal show={show} onHide={handleClose} centered>
              {rsvp ? <YesModal></YesModal> : <NoModal></NoModal>}
              {/* <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
              </Modal.Footer> */}
            </Modal>
        </div>
    } else if (weddingStatus === 'failed') {
      content = <div>{error}-{profileError}</div>
    }
    return content;
}