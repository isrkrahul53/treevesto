import React from 'react';
import Carousel from "react-multi-carousel";
import Link from 'next/link';
import "react-multi-carousel/lib/styles.css";
import ProductImageBanner from "../product/productImage";
import SingleProduct from '../product/singleProduct';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

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
export default function ReactCarouselZoom(props){
  
    return <Carousel 
    swipeable={true}
    infinite={true}
    showDots={props.showDots}
    arrows={props.arrows && true}
    responsive={responsive}>
        {props.data.map((e,k)=>(
          <img src={process.env.NEXT_PUBLIC_apiUrl+e || "image.jpg"} width="100%" alt="" />
        ))}
  </Carousel>;
}

