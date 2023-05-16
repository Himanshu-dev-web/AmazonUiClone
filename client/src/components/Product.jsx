import React,{useState} from 'react'
import { StarIcon } from "@heroicons/react/solid"
import { useDispatch } from 'react-redux';
import { addToBasket } from '../slices/basketSlice';
import { Link } from 'react-router-dom';

const MAX_RATING = 5;
const MIN_RATING = 1;

const Product = ({id, title, price , description, category, thumbnail}) => {

    const dispatch = useDispatch();

   
    const [rating] = useState(Math.floor(Math.random() * (MAX_RATING-MIN_RATING + 1)) + MIN_RATING);
    const [hasPrime] = useState(Math.random() < 0.5)

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
  return (

    <div className='relative flex flex-col m-5 bg-white z-30 p-10'>
    <Link key={id}  to={'/details/'+ id}  >
      <p className='absolute top-2 right-2 text-xs italic'>{category}</p> 
      <div className='items-center flex flex-row justify-center '>
      <img className='w-[9rem] h-[9rem]' src={thumbnail} height={200} width={100}/>

      </div> 
      <h4 className='my-3'>{title}</h4>
      <div className='flex '>
            {Array(rating).fill().map((_,i) => (
                <StarIcon  key={i} className='h-5 text-yellow-500'/>
            ))}
      </div>
     
           <p className='text-xs mt-2 my-2 line-clamp-2'>{description}</p>
      
      <div className='mb-5'>
      </div>

      {hasPrime && (
        <div className='flex items-center space-x-2 -mt-5'>
            <img className='w-12' src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Amazon_Prime_Logo.svg/2560px-Amazon_Prime_Logo.svg.png' alt='' />
            <p className='text-xs text-gray-500'>Free Next-day Delivery</p>
        </div>
      )}
      </Link>

      <button onClick={addItemToBasket} className='mt-auto button bg-yellow-500 '>Add To Basket</button>

    </div>
  )
}

export default Product