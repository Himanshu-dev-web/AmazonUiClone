import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
 
const Banner = () => {
    return (
        <div className='relative'>
        <div className=' absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20 '/>
            <Carousel autoPlay 
            infiniteLoop 
            showStatus={false}
             showIndicators={false} 
             showThumbs={false}
             interval={5000}
             >
            <div>
                    <img loading='lazy' src="https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/ssserene/GW/May23/10R/D43000892_DesktopTallHero_3000x1200._CB589997673_.jpg" alt="" />
            </div>
            <div>     
                     <img loading='lazy' src="https://m.media-amazon.com/images/I/61Cid3LCfKL._SX3000_.jpg" alt="" />
            </div>
            <div>       
                     <img loading='lazy' src="https://m.media-amazon.com/images/I/71SrUdP3qVL._SX3000_.jpg" alt="" />
            </div>
            </Carousel>
        </div>
    )
}

export default Banner
