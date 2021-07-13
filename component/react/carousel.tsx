import React from 'react';
import Carousel from "react-multi-carousel"; 
import "react-multi-carousel/lib/styles.css"; 


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
    responsive={responsive}
    // containerClass={props.class}
    >
        {props.data?.map((e,k)=>(
          <img key={k} src={"https://api.treevesto.com:4000/"+e} alt="" className={"responsiveLatestProducts"} style={{width:"100%"}} onMouseEnter={e=>setAutoplay(true)} onMouseLeave={e=>setAutoplay(false)} />
        ))}
  </Carousel>;
}

