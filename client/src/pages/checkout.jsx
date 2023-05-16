import { useSelector } from 'react-redux'
import { selectItems, selectTotal } from '../slices/basketSlice'
import CheckoutProduct from '../components/Checkout'
import { useAuth0 } from "@auth0/auth0-react";
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios';


//const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

const stripePromise = loadStripe((import.meta.env.VITE_REACT_STRIPE_PUBLIC_KEY));

function Checkout() {
   // console.log((import.meta.env.VITE_REACT_STRIPE_PUBLIC_KEY))
    const items = useSelector(selectItems);
    
    //const { data: session, status } = useSession()
    const { loginWithRedirect,user, logout, isAuthenticated, isLoading  } = useAuth0();

    const total = useSelector(selectTotal);

    const createCheckOutSession = async() => {
        const stripe = await stripePromise;
      
        //call backend for checkout session 
        const checkoutSession = await axios.post('http://localhost:4000/checkout',
        {
        items:items,
        email:user.email
        });

      

        console.log(checkoutSession.data);
       // console.log(session.data);

        const result  = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id
        });

        if(result.error)  alert(result.error.message);
    };

    return (
        <div className='bg-gray-100'>
        
            <main className='lg:flex max-w-screen-xl mx-auto '> 
               {/* {left section} */}
               <div className='flex-grow m-5 shadow-sm'>

            <img src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            style={{objectFit:"contain"}}
             />

             <div className='flex flex-col p-5 space-y-10 bg-white'>
                    <h1  className='text-3xl border-b pb-4'>
                        {items.length === 0 ? "Your Basket is Empty " : "Shopping Basket"}
                    </h1>
                    {items.map((item,i) => (
                        <CheckoutProduct
                        key={i}
                        id={item.id}
                        title={item.title}
                        rating={item.rating}
                        price={item.price}
                        description={item.description}
                        category={item.category}
                        thumbnail={item.thumbnail}
                        hasPrime={item.hasPrime}
                         />
                    ))} 
             </div>

               </div>

               {/* {right} */}
               <div className='flex flex-col bg-white p-10'>
           {items.length > 0 && (
            <>
                <h2 className='whitespace-nowarp'>SubTotal ({items.length} Items) : {" "}
                <span className='font-bold '>
                    {/* <CurrencyFormat className='text-black'  quantity={total} currency="GBP" /> */}
                   <h1>{total}$</h1>
                </span>
                </h2>
                <button 
                role="link"
                onClick={createCheckOutSession}
               disabled={!isAuthenticated}
               
                 className={`button mt-2  button bg-yellow-500  ${!isAuthenticated && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}>
                {!isAuthenticated ? 'Sign in to Checkout' : 'Proceed to Checkout'}
                </button>
            </>
           )}
                   
               </div>
            </main>
        </div>
    )
}

export default Checkout
