import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductImageBanner from "../product/productImage";
import SingleProduct from '../product/singleProduct';

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
    items: 2
  }
};
export default function ReactMultiCarousel(props){
    return <Carousel 
    swipeable={true}
    showDots={true}
    infinite={true}
    containerClass=""
    itemClass="p-2 my-2"
    responsive={responsive}>
        {props.data.map((e,k)=>(
            <div key={k}>
                <SingleProduct data={e} hideDetails={props.hideDetails} />
            </div>
        ))}
  </Carousel>;
}

