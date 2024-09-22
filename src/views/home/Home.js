
import { Counter } from '../../store/counter/counter';
import { PostsLists } from '../../store/counter/PostsLists';
import  LoginButton  from '../../components/auth0/LoginButton';
import  LogoutButton  from '../../components/auth0/LogoutButton';
import { WeddingDetails } from '../../components/wedding/WeddingDetails';
import  Gallery  from '../gallery/Gallery';
import { Image } from 'react-bootstrap';
import CoupleImg from "../../assets/images/couple_image.webp"
import DoubleHappiness from "../../assets/images/double_happiness.png"
import CartoonImg from "../../assets/images/cartoon.jpeg"
import CartoonCropped from "../../assets/images/cartoon_crop.jpeg"
import CartoonImg2 from "../../assets/images/cartoon_mobile.jpeg"
import { useSelector } from 'react-redux';
import { getWedding } from '../../store/wedding/weddingSlice';

const Home = () => {
    const wedding = useSelector(getWedding);
    const startDate = new Date(wedding.startDate);
    const endDate = new Date(wedding.endDate);
    return (
    <div className='d-flex flex-wrap'>
        <div className='w-100 w-sm-50'>
            <h1 className='text-center'>威尔逊小姐 & 张先生</h1>
            <h1 className='text-center'>Rebecca & Jin's Wedding</h1>
            <div className='text-center'>
                <Image src={CartoonCropped} className='w-100 h-100' style={{borderRadius: '50%', border: 'solid #eccb51 5px;'}}/>
            </div>            
            <h1 className='text-center text-decoration-underline' style={{fontSize: '2em'}}>{wedding.location}</h1>
            <div className="d-flex flex-row justify-content-evenly w-100 align-items-center">
              <span className='w-25 text-center spanFont'>
                {startDate.toLocaleString('default', { month: 'long' })}
              </span>
              <div className='w-25 text-center'>                
                <span className='spanFont'>{startDate.toLocaleString('default', { weekday: 'short' })}</span>
                <h1 style={{fontSize:"4em"}}>
                  {startDate.toLocaleString('default', { day: 'numeric' })}
                </h1>
              </div>
              <span className='w-25 text-center spanFont'>
                {startDate.getFullYear()}
              </span>
            </div>
            <h2 className="text-center" style={{fontSize: '1.8em'}}>Ceremony starts at 2pm</h2>
        <hr></hr>
        </div>
        <div className='my-3 w-100 w-sm-50 justify-content-center align-items-center d-flex'>           
            <WeddingDetails></WeddingDetails>
        </div>
        <div className='w-100 '>
            <hr></hr>
            <Gallery></Gallery>
        </div>
        <div className='w-100'>
          <hr></hr>
          <h1 className='text-center'>Wishlist</h1>
          <hr></hr>
          <h2>Gifts are not expected, but if you'd like to contribute towards our honeymoon, we would be incredibly grateful. Your presence on our special day is what we cherish most. ❤️</h2>
        </div>
    </div>);
  };
  
  export default Home;