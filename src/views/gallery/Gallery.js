import  React, { useEffect, useState  } from "react";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import { Cloudinary } from "@cloudinary/url-gen";
import {getAllImages, deleteImageById} from '../../services/api'
import { getProfile, fetchProfileByName } from '../../store/profile/profileSlice'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from "react-bootstrap";
import LightGallery from 'lightgallery/react';
// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
// import plugins if you need
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2';

const Gallery = () => {
  const dispatch = useDispatch();
  const [publicId, setPublicId] = useState("");
  const [images, setImages] = useState([]);
  const profile = useSelector(getProfile);
  const profileStatus = useSelector(state => state.profile.status);
  const profileError = useSelector(state => state.profile.error);
  // Replace with your own cloud name
  const [cloudName] = useState("waliwalo");
  // Replace with your own upload preset
  const [uploadPreset] = useState("b2jvtt3j");
  const [userName, setUserName] = useState(localStorage.getItem("myUserName")); 

  const [uwConfig, setUwConfig] = useState({
    cloudName,
    uploadPreset,
    // cropping: true, //add a cropping step
    // showAdvancedOptions: true,  //add advanced options (public_id and tag)
    sources: [ "local"], // restrict the upload sources to URL and local files
    multiple: true,  //restrict upload to a single file
    // folder: profile.id, //upload files to the specified folder
    tags: ["wedding"], //add the given tags to the uploaded files
    // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
    clientAllowedFormats: ["image", "video", "gif"], //restrict uploading to image files only
    // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
    // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
    // theme: "purple", //change to a purple theme
  });

  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName
    }
  });

  useEffect(() => {    
    if(profileStatus === "succeeded"){
      if(profile == null){
        dispatch(fetchProfileByName({name: `${userName}`, weddingId: '659cfdc8ef6b5b99ee54d605'}))
      }else{
        setUwConfig({...uwConfig, folder: profile.id})
      }
    }
  }, [profile])

  useEffect(() => {
    const getImages = async () =>{ 
      let result = await getAllImages();
      setImages(result.resources);
    };
    getImages();
  }, [])

  const handleClick = async (e, public_id) => {
    e.preventDefault();
    e.stopPropagation();  //  <------ Here is the magic
    e.nativeEvent.stopImmediatePropagation();
    Swal.fire({
        title: 'Are you sure you want to delete?',
        icon: 'warning',
        confirmButtonText: 'Ok',
        showCancelButton: true
    }).then(async (response) => {         
      if (response.isConfirmed) {
          let result = await deleteImageById(public_id);
          // console.log(result);
          Swal.fire({
              title: 'Image deleted',
              icon: 'success',
              confirmButtonText: 'Ok'
          }).then(async () => {
            let result = await getAllImages();
            setImages(result.resources);
          });
      }                 
    });    
  }

  const myImage = cld.image(publicId);

  useEffect(() => {    
    const getImages = async () =>{ 
      let result = await getAllImages();
      setImages(result.resources);
    };
    getImages();
    // if(myImage.publicID !== publicId){
    //   console.log(myImage);
    // }
  }, [publicId])

  return (    
    <>
      <div className="d-flex justify-content-center flex-column align-items-center">
        <h1 className='text-center'>Gallery</h1>
        <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} />
      </div>
      <hr></hr>
      <LightGallery plugins={[lgZoom, lgVideo]} mode="lg-fade">
          {images.map((x, i) => {
            let htmlString = "";
            let owner = x.public_id.includes(profile.id);
            if(userName == "hung jin_chong"){
              owner = true;
            }
            if(x.resource_type === "video"){
              htmlString = <div style={{position: 'relative'}} key={i} className="w-50 w-sm-25 gallery-item p-2" data-video={`{"source": [{"src":"${x.secure_url}", "type":"video/mp4"}], "attributes": {"preload": false, "controls": true, "playsinline": true}}`} >
                              <img
                                style={{objectFit: 'cover'}}
                                className="img-responsive w-100 h-100"
                                src={x.thumbnail}
                              />                      
                              <Button className={!owner ? "d-none" : ""} variant="danger" style={{border: 'solid', position: 'absolute', top: "1rem", right: "1rem"}} onClickCapture={(e) => handleClick(e, x.public_id)}>
                                <FontAwesomeIcon icon={faTrash} />
                              </Button>
                            </div>;
            }else{
              htmlString = <div style={{position: 'relative'}} key={i} className="w-50 w-sm-25 gallery-item p-2" data-src={x.secure_url} >
                              <img
                                style={{objectFit: 'cover'}}
                                className="img-responsive w-100 h-100"
                                src={x.thumbnail}
                              />
                              <Button className={!owner ? "d-none" : ""} variant="danger" style={{border: 'solid', position: 'absolute', top: "1rem", right: "1rem"}} onClickCapture={(e) => handleClick(e, x.public_id)}>
                                <FontAwesomeIcon icon={faTrash} />
                              </Button>
                            </div>;
            }
          return htmlString;
          })}
      </LightGallery>
    </>
  );
};

export default Gallery;