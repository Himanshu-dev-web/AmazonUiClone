import React from 'react'

import { StarIcon } from "@heroicons/react/solid"
import { useDispatch } from 'react-redux';
import { addToBasket,removeFromBasket } from '../slices/basketSlice';

const Checkout = ({id,
    title,
    price,
    rating,
    description,
    category,
    thumbnail,
    hasPrime}) => {

        const dispatch = useDispatch();

        const addItemToBasket = () => {
          const product = {
            id,
            title,
            price,
            rating,
            description,
            category,
            thumbnail,
            hasPrime
          }
          //push item into redux
          dispatch(addToBasket(product));
        }
        const removeItemFromBasket = () => {
          //remove item from redux
          dispatch(removeFromBasket({id}));
        }
  
  return (

    <div className='grid grid-cols-5'>
    <img src={thumbnail} height={200} width={200} style={{objectFit:"contain"}}/>       

   {/* {middle} */}
<div className='col-span-3  mx-5'>
    <p>{title}</p>
    <div className='flex '>
        {Array(rating).fill().map((_,i) => (
        <StarIcon key={i} className="h-5 text-yellow-500" />
        ))}
    </div>
    <p className='text-xs my-2 line-clamp-2'>{description}</p>
    {/* <Currency quantity={price} currency="gbp" /> */}

    {hasPrime  && (
        <div className='flex items-center space-x-2'>
           <img
           loading="lazy"
           className='w-12'
           src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Amazon_Prime_Logo.svg/2560px-Amazon_Prime_Logo.svg.png"
           alt="" />
           <p className='text-xs text-gray-500 '>Free Next-day Delivery</p>
        </div>
    )}
</div>


<div className=' flex flex-col space-y-2 my-auto justify-self-end'>
  <button onClick={addItemToBasket} className='button mt-auto button bg-yellow-500 '>Add to Basket</button>
  <button onClick={removeItemFromBasket} className='button mt-auto  bg-yellow-500 '>Remove From Basket</button>
</div>

</div>
  )
}

export default Checkout