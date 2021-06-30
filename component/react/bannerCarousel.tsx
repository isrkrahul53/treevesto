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
export default function ReactBannerCarousel(props){
    const apiUrl = "https://api.treevesto.com:4000/"; 
    const [autoplay,setAutoplay] = React.useState(false)
    return <>
      {props.mobile ? <>
        <Carousel 
        infinite={true}
        showDots={props.showDots}
        autoPlay={props.autoplayOnhover?autoplay:true}
        autoPlaySpeed={props.autoplayOnhover && 900}
        arrows={props.arrows && true}
        responsive={responsive}
        containerClass="pb-6"
        >
            {props.data.filter(e=>e.mobileImage).map((e,k)=>{
                return <Link href={e.link} key={k}>
                  <img src={"https://api.treevesto.com:4000/"+e.mobileImage} alt="" className={props.customHeight ? "h-56 md:h-72 lg:80":""} style={{width:"100%"}} onMouseEnter={e=>setAutoplay(true)} onMouseLeave={e=>setAutoplay(false)} />
                </Link>
            })}
        </Carousel>
      </>:<>
      
        <Carousel 
          infinite={true}
          showDots={props.showDots}
          autoPlay={props.autoplayOnhover?autoplay:true}
          autoPlaySpeed={props.autoplayOnhover && 900}
          arrows={props.arrows && true}
          responsive={responsive}
          containerClass="pb-6"
          >
            {props.data.filter(e=>e.image).map((e,k)=>{
                return <Link href={e.link} key={k}>
                  <img src={"https://api.treevesto.com:4000/"+e.image} alt="" className={props.customHeight ? "h-56 md:h-72 lg:80":""} style={{width:"100%"}} onMouseEnter={e=>setAutoplay(true)} onMouseLeave={e=>setAutoplay(false)} />
                </Link>
            })}
        </Carousel>
      
      </>}
    </>
 
}

