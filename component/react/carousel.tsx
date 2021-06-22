import React from 'react';
import Carousel from "react-multi-carousel";
import Link from 'next/link';
import "react-multi-carousel/lib/styles.css";
import ProductImageBanner from "../product/productImage";
import SingleProduct from '../product/singleProduct';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
export default function ReactCarousel(props){
    const [autoplay,setAutoplay] = React.useState(false)
    return <Carousel 
    infinite={true}
    showDots={props.showDots}
    autoPlay={props.autoplayOnhover?autoplay:true}
    autoPlaySpeed={props.autoplayOnhover && 900}
    arrows={props.arrows && true}
    responsive={responsive}>
        {props.data.map((e,k)=>(
          <Link href={e.href} key={k}><img src={e.src} alt="banner" className={props.customHeight ? "h-56 md:h-72 lg:80":""} style={{width:"100%"}} onMouseEnter={e=>setAutoplay(true)} onMouseLeave={e=>setAutoplay(false)} /></Link>
        ))}
  </Carousel>;
}

