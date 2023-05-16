import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Product from './Product';
import Banner from './Banner';
import { Link } from 'react-router-dom';

const Home = ({search}) => {

    const [product, setProduct] = useState([]);
    

    async function getproducts() {
      try {
        const response = await fetch('https://dummyjson.com/products');
    
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
    
        // ✅ call response.json() here
        const result = await response.json();
        setProduct(result.products)

      } catch (err) {
        console.log(err);
      }
    }

    useEffect(() => {
    getproducts();
    }, []);

  return (
   <>
   <Banner/>
    <div className='grid  grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto '>
   {product?.filter((item) => {
    return search?.toLowerCase() === '' ? item : item.title.toLowerCase().includes(search);
   }).map(({id, title, price, description, category ,thumbnail}) => (
      <Product 
       key={id}
       id={id}
       title={title}
       price={price}
       description={description}
       category={category}
       thumbnail={thumbnail}   
      />
   ))} 
   
</div>
   <img className='' src="https://links.papareact.com/dyz" alt="" />

   </>
  )
}

export default Home