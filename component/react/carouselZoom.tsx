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
          <img src={e.src || "image.jpg"} width="100%" alt="test" />

      //     <TransformWrapper
      //     defaultScale={1}
      //     defaultPositionX={200}
      //     defaultPositionY={100}
      // >
      //     {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
      //     <React.Fragment>
      //         <div className="tools text-right">
      //             {/* <button className="btn m-1 btn-sm btn-primary" onClick={zoomIn}>+</button>
      //             <button className="btn m-1 btn-sm btn-primary" onClick={zoomOut}>-</button>
      //             <button className="btn m-1 btn-sm btn-danger" onClick={resetTransform}>x</button> */}
      //         </div>
      //         <TransformComponent>
      //         <img src={e.src || "image.jpg"} width="100%" alt="test" />
      //         </TransformComponent>
      //     </React.Fragment>
      //     )}
      // </TransformWrapper>
        ))}
  </Carousel>;
}

