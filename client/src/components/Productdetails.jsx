import {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { StarIcon } from "@heroicons/react/solid"
import { useDispatch } from 'react-redux';
import { addToBasket } from '../slices/basketSlice';


const MAX_RATING = 5;
const MIN_RATING = 1;

const Productdetails = () => {

    const dispatch = useDispatch();
    const [productdetails, setProductdetails] = useState('');
    const [images, setImages] = useState([]);
    const [mainImages, setMainImages] = useState(images[0]);
    const [rating] = useState(Math.floor(Math.random() * (MAX_RATING-MIN_RATING + 1)) + MIN_RATING);

    let params = useParams();
     
    const {
      id,
      title,
      price,
      description,
      category,
      thumbnail,
      hasPrime,
    } = productdetails;

    async function getproducts() {
      try { 
        const response = await fetch(`https://dummyjson.com/products/${params.id}`);
       
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
    
        // ✅ call response.json() here
        const result = await response.json();
        setImages(result.images)
       setProductdetails(result)      
      } catch (err) {
        console.log(err);
      }
    }

    const addItemToBasket = () => {
      
      const product = {
        id,
        title,
        price,
        description,
        category,
        thumbnail,
        hasPrime,
      }
      //sending a prodcut as an axtion to redux store ...  the basic slice
      dispatch(addToBasket(product))
  }


    useEffect(() => {
    getproducts();
   
    }, []);


  return (
    <>

    <div className='flex flex-col lg:flex-row items-center mt-[5rem] lg:mx-3'>

        <div className='flex flex-row md:w-[50%] px-6'>
                <div className='w-[20%] flex flex-col  items-center cursor-pointer'>
                    {
                        images?.map((item,key) => {
                            return (
                            <img  className='h-[5rem] border border-gray-400' onClick={() => setMainImages(item)} src={item} key={key} alt="" />
                            )
                        })
                    }
                </div>
                
                <div className='w-[80%]  flex flex-col items-center justify-center'>
               
                <img className='h-[20rem]' src={(!mainImages)?images[0]:mainImages } alt="" /> 

                </div>
        </div>
        <div className='flex flex-col md:w-[50%] mt-[3rem] px-6 '>
        <div className='flex my-2 items-center'>
            {Array(rating).fill().map((_,i) => (
                <StarIcon  className='h-5 text-yellow-500'/>
            ))}
            <span className='text-blue-400'>Ratings</span>
         </div>
         
              <hr className='h-px  bg-gray-200 border-0 dark:bg-gray-700'/>
              <h2 className='my-2 font-bold'>{productdetails.title}</h2>
              <p className='my-2'><span className='text-red-600'>-{productdetails.discountPercentage}%</span> <span className='text-xs'>₹</span>{productdetails.price}</p>
              <hr className='h-px  bg-gray-200 border-0 dark:bg-gray-700' />
              <p className='my-2'>{productdetails.description}</p>
              <p>Only <span className='text-red-600 underline underline-offset-8'>{productdetails.stock}</span> Stock left..</p>
              <button onClick={addItemToBasket} className='mt-4 button bg-yellow-500  text-white'>Add To Basket</button>

        </div>
      </div>
    </>
  )
}

export default Productdetails