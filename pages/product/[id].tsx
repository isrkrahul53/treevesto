import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, lazy, Suspense } from 'react'
import { useRouter } from 'next/router';
import TextField from '@material-ui/core/TextField'
import StarRateIcon from '@material-ui/icons/StarRate';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown'; 
import MaterialDialog from '../../component/material/materialDialog';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Skeleton from '@material-ui/lab/Skeleton';
import { useSelector, useDispatch } from "react-redux";


import axios from 'axios';
import https from 'https'
import Button from '@material-ui/core/Button'

const Layout = lazy(()=>import('../../component/common/layout'))
const ReactMultiCarousel = lazy(()=>import('../../component/react/multiCarousel'))
const ReactCarouselZoom = lazy(()=>import('../../component/react/carouselZoom'))
const SingleProduct = lazy(()=>import('../../component/product/singleProduct'))
const ProductPage = lazy(()=>import('../../component/pages/productPage'))


function RatingUI(props){
    
    return <div className="flex items-center w-full"> 
        <span>{props.val}</span> 
        <StarRateIcon />
        <div className="w-64 border rounded border-dark">
            <div className={"bg-"+props.color+" p-1"} style={{width:props.width}}></div>
        </div>
    </div>
}
               
const apiUrl = process.env.NEXT_PUBLIC_apiUrl;
export default function Product(props) { 

    const dispatch = useDispatch();
    const router = useRouter();
    
    const rating = props.review.length > 0 ? (props.review.map(e=>+e.rating).reduce((a,b)=>a+b)/props.review.length).toFixed(2) : 0
    const [grid,setGrid] = React.useState(1);
    const [selectedImage,setSelectedImage] = React.useState(null)
    const imageProps = {width: 400, height: 250, zoomWidth: 500, img: selectedImage};
    const [vendordata,setVendordata] = React.useState(null)
      
    const [navigation,setNavigation] = React.useState(1)
    
    const [size,setSize] = React.useState([])
    const [colour,setColour] = React.useState([])
    const [specsArr,setSpecsArr] = React.useState([])

    const [isFront, setIsFront] = React.useState(false);

    const handleNavigationChange  = (x) => {
        setNavigation(x)
    }

    useEffect(()=>{
        setSelectedImage(apiUrl+props.product?.productImages[0])
        fetch(`${process.env.NEXT_PUBLIC_apiUrl}vendor/`+props.product.vendorId).then(d=>d.json()).then(json=>{
            setVendordata(json.result[0])
        }).catch(err=>dispatch({type:"setAlert",payloads:err.message}))
        
        fetch(`${process.env.NEXT_PUBLIC_apiUrl}specificationTable`).then(d=>d.json()).then(json=>{
            setSpecsArr(json.result.filter(e=>e.catId === props.product.catId)[0].field) 
        })
        fetch(`${process.env.NEXT_PUBLIC_apiUrl}product/`).then(d=>d.json()).then(json=>{
            setSize(json.result.filter(e=>e.productCode === props.product?.productCode).map(e=>e.size).filter((e,k,ar)=>ar.indexOf(e) === k))
            setColour(json.result.filter(e=>e.productCode === props.product?.productCode).map(e=>e.colour).filter((e,k,ar)=>ar.indexOf(e) === k))
        }).catch(err=>dispatch({type:"setAlert",payloads:err.message}))
    },[props.product])
    


    useEffect(()=>{
        process.nextTick(() => {
            if (globalThis.window ?? false) {
                setIsFront(true);
            }
        }); 
    },[])
 
     
    if (!isFront) return null;
     
    return <div> 
        
        <Suspense fallback={<div className="text-center py-10">
            <div className="spinner-border text-primary"></div>
        </div>}>
            <Layout>
                <Head>
                    <title>{props.product?.productName}</title>
                    <meta name="description" content={"Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."}></meta>
                    <meta property="og:title" content={props.product?.productName} />
                    <meta property="og:url" content={"https://admiring-bardeen-fc41ec.netlify.app"+router.asPath} />
                    <meta property="og:description" content={"Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."} />
                    <meta property="og:image:secure_url" content={apiUrl+props.product?.productImages[0]}></meta>
                    <meta property="og:type" content="article" />

                </Head>
                <div className="md:hidden">
                    <ReactCarouselZoom data={props.product?.productImages} arrows={false} showDots={true} /> 
                </div>
                <div className="container my-4">
                    <nav className="breadcrumb hidden md:block" aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link href="/">Home</Link></li> 
                            <li className="breadcrumb-item"><Link href={"/"+props.product?.subcatId}>{props.catName}</Link></li> 
                            <li className="breadcrumb-item active">{props.product?.productName}</li> 
                        </ol>
                    </nav>

                    {grid==1?<div className="container">
                        {/* <ReactImageZoom {...imageProps} /> */} 
                        
                    
                        <div className="row">
                            <div className="col-md-1 hidden md:block">
                                <div className={"grid grid-cols-6 md:grid-cols-1 gap-2 my-2"}>
                                    <Suspense fallback={<div>
                                        <Skeleton className="w-full" height={240} />
                                        <Skeleton className="w-full" height={240} />
                                        <Skeleton className="w-full" height={240} />
                                    </div>}>
                                        {props.product?.productImages.map((el,key)=>(
                                            <img key={key} src={apiUrl+el} onClick={()=>{setSelectedImage(apiUrl+el)}}
                                            className={selectedImage==apiUrl+el?"w-100 cursor-pointer border-2 border-gray-500 rounded":"w-100 cursor-pointer"} />
                                        ))} 
                                    </Suspense>
                                </div>
                            </div>
                            <div className="col-md-5 py-2">
                                {/* <img src={selectedImage} className="w-full md:w-75 hover:zoom-25" /> */}
                                <div className="hidden md:block">
                                    
                                    <Suspense fallback={<div>
                                            <Skeleton className="w-full" height={240} />
                                            <Skeleton className="w-full" height={240} />
                                            <Skeleton className="w-full" height={240} />
                                        </div>}>

                                        <TransformWrapper
                                            defaultScale={1}
                                            defaultPositionX={200}
                                            defaultPositionY={100}
                                        >
                                            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                                            <React.Fragment>
                                                <div className="tools text-right">
                                                    {/* <button className="btn m-1 btn-sm btn-primary" onClick={zoomIn}>+</button>
                                                    <button className="btn m-1 btn-sm btn-primary" onClick={zoomOut}>-</button>
                                                    <button className="btn m-1 btn-sm btn-danger" onClick={resetTransform}>x</button> */}
                                                </div>
                                                <TransformComponent>
                                                <img src={selectedImage || "image.jpg"} width="1200px" alt="test" />
                                                </TransformComponent>
                                            </React.Fragment>
                                            )}
                                        </TransformWrapper>

                                    </Suspense>

                                </div>
    

                            </div>
                            <div className="col-md-5">
                                
                                <Suspense fallback={<div className="text-center py-10">
                                        <div className="spinner-border text-primary"></div>
                                    </div>}>
                                    <ProductPage dispatch={dispatch} data={props.product} 
                                    size={size} colour={colour} />
                                </Suspense>
                            </div>
                        </div>
                    </div>:<></>}
        
                    <div className="container">
                        {/* <div className="col-md-1"></div> */}
                        <div className="col-md-11 offset-md-1">
                            <div className="my-2">

                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                    <div className="nav-link cursor-pointer" id="specification-tab" data-bs-toggle="tab" data-bs-target="#specification" role="tab" aria-controls="specification" aria-selected="false">Specification</div>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                    <div className="nav-link cursor-pointer active" id="productDetails-tab" data-bs-toggle="tab" data-bs-target="#productDetails" role="tab" aria-controls="productDetails" aria-selected="true">Product Details</div>
                                    </li>
                                    {/* <li className="nav-item" role="presentation">
                                    <div className="nav-link cursor-pointer" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" role="tab" aria-controls="contact" aria-selected="false">Contact</div>
                                    </li> */}
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane border p-3 fade show active" id="productDetails" role="tabpanel" aria-labelledby="productDetails-tab">
                                        
                                        <p>{props.product?.productDesc}</p>

                                    </div>
                                    <div className="tab-pane border p-3 fade" id="specification" role="tabpanel" aria-labelledby="specification-tab">

                                        {specsArr.filter(e=>props.product[e]).map((e,k)=>(
                                            <div className="row" key={k}>
                                                <div className="col-6 col-md-3"> {e.replace("_"," ")} </div>
                                                <div className="col-6 col-md-9"> {props.product[e]} </div>
                                            </div>
                                            
                                        ))}

                                        
                                    </div>
                                    <div className="tab-pane border p-3 fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
                                </div>
                                
                                 
                            </div> 

                            {/* <h1 className='text-xl p-2 pt-4'>Size Chart</h1>
                            <table className="table table-hover border">
                                <thead> 
                                </thead>
                                <tbody>
                                    {props.product.sizeChart && JSON.parse(props.product.sizeChart?.data)?.map((el,key)=>(<tr key={key}> 
                                        {el?.map((e,k)=>(
                                            <td> {e} </td>
                                        ))} 
                                    </tr>))}
                                </tbody>
                            </table>  */}

                            <div className="my-2">
                                
                                <Suspense fallback={<Skeleton className="w-full" height={180} />}>
                                    <div className="bg-white p-3 border">
                                        <div className="flex item-center">
                                            <h3 className="text-lg md:text-2xl">Ratings & Reviews</h3>
                                            <div className="ml-auto">
                                                <MaterialDialog button="Rate Product" title="Write a Review" id={props.product?._id} />
                                            </div>
                                        </div>
                                        
                                        <div className="my-2">
                                            <div className="flex-row md:flex item-center">
                                                <div className="mr-3">
                                                    <div className="text-4xl">{rating} <StarRateIcon /></div>
                                                    <div className="text-sm text-secondary">{props.review.length} Ratings & Reviews</div>
                                                </div>
                                                <div className="mr-3">
                                                    <RatingUI val={5} width={props.review.length > 0 ? (props.review.filter(e=>e.rating === "5").length/props.review.length)*100+"%" : 0+"%"} color={"success"} />
                                                    <RatingUI val={4} width={props.review.length > 0 ? (props.review.filter(e=>e.rating === "4").length/props.review.length)*100+"%" : 0+"%"} color={"success"} />
                                                    <RatingUI val={3} width={props.review.length > 0 ? (props.review.filter(e=>e.rating === "3").length/props.review.length)*100+"%" : 0+"%"} color={"success"} />
                                                    <RatingUI val={2} width={props.review.length > 0 ? (props.review.filter(e=>e.rating === "2").length/props.review.length)*100+"%" : 0+"%"} color={"warning"} />
                                                    <RatingUI val={1} width={props.review.length > 0 ? (props.review.filter(e=>e.rating === "1").length/props.review.length)*100+"%" : 0+"%"} color={"danger"} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Suspense>


                                <Suspense fallback={<Skeleton className="w-full" height={180} />}>
                                    {props.review.map((e,k)=>(
                                        <div key={k} className="bg-white p-3 my-2 border border-left border-right border-bottom">
                                            <div className="flex items-center">
                                                <div className={
                                                    e.rating >= 3?"bg-success text-white p-1 px-2 mr-2 rounded shadow-sm":e.rating === 2?"bg-warning text-white p-1 px-2 mr-2 rounded shadow-sm":"bg-danger text-white p-1 px-2 mr-2 rounded shadow-sm"
                                                }>
                                                    {e.rating}<StarRateIcon />
                                                </div>
                                                <h3 className="text-lg md:text-2xl">{e.title}</h3>
                                            </div>
                                            <div className="my-2">{e.desc}</div>
                                            {/* <div className="text-right">
                                                <ThumbUpIcon className="mx-2 text-secondary cursor-pointer" /> {e.likes}
                                                <ThumbDownIcon className="mx-2 text-secondary cursor-pointer" />{e.dislikes}
                                            </div> */}
                                        </div>
                                    ))}
                                </Suspense>

                            </div>

                        </div>
                    </div>
                    


                    <h3 className="text-lg md:text-3xl text-center mt-5 mb-3 px-2">Related Products</h3>
                    {/* <ReactMultiCarousel data={props.similarProduct} hideDetails={false} cart={addtoCart} /> */}

                    <Suspense fallback={<Skeleton className="w-full" height={180} />}>
                        <ReactMultiCarousel showDots={true} arrows={true} content={props.similarProduct.map((e,k)=>(
                        <div key={k} className="p-1">
                            <SingleProduct data={e} hideDetails={true} dispatch={dispatch} />
                        </div>
                        ))} />
                    </Suspense>



                </div>
    
 
    


            </Layout>
        </Suspense>

    </div>
}


export const getServerSideProps = async (context) => {
    
    const agent = new https.Agent({  
        rejectUnauthorized: false
    });
    const res = await axios.get(`${process.env.NEXT_PUBLIC_apiUrl}product/${context.params.id}`,{httpsAgent:agent})
    const review = await axios.get(`${process.env.NEXT_PUBLIC_apiUrl}review/product/${context.params.id}`,{httpsAgent:agent})
    const productData = await res.data.result;

    const category = await axios.get(`${process.env.NEXT_PUBLIC_apiUrl}category/id/${productData[0].subcatId}`,{httpsAgent:agent})
    const similarProduct = await axios.get(`${process.env.NEXT_PUBLIC_apiUrl}product/cat/subcat/${productData[0].subcatId}`,{httpsAgent:agent})    
 
    var temp = await similarProduct.data.result;
    var arr = []
    temp.map(e=>e.productCode).filter((e,k,ar)=>ar.indexOf(e) === k).map(el=>{
      arr.push(temp.filter(e=>e.productCode === el))
    })
    
    return {
      props: {
        product:productData[0] || [],
        review:review.data.result,
        catName:category.data.result[0].catName,
        similarProduct:arr
      }
    };
  }

  