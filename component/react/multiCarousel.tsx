import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductImageBanner from "../product/productImage";
import SingleProduct from '../product/singleProduct';

export default function ReactMultiCarousel(props){
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 6
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: props.mobileItem || 2
    }
  };
  
  return <Carousel 
    swipeable={true}
    showDots={props.showDots}
    infinite={props.infinite}
    arrows={props.arrows}
    containerClass=""
    itemClass="my-1"
    dotListClass="mt-10"
    responsive={responsive}>
      {props.content}
  </Carousel>;
}

