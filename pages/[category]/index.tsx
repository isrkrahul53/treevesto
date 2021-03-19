import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../component/common/layout';
import Button from '@material-ui/core/Button' 
import FilterPage from '../../component/pages/filterPage';
import MaterialChipArray from '../../component/material/chipArray';
import Banner from '../../component/common/banner';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import styles from './style.module.scss'
import CustomAlert from '../../component/common/customAlert';

function SingleProduct(props){
  return <div className={"hover:shadow-lg product "+styles.product}>
  <Banner indicator={false} images={props.images} />
  <div className="text-center p-2 relative bg-white d-none" style={{top:-50}}>
    <Button variant="contained" color="secondary" onClick={props.onclick} startIcon={<LocalMallOutlinedIcon />}>
      Wishlist
    </Button>
    <h5 className="py-1">Sizes : S, M, XL</h5>
  </div>
  <section className="p-2">
    <h6> {props.name} </h6>
    <h6>Rs. {props.price}</h6>
  </section>
</div>
}


export default function Product(props){
 

    const router = useRouter();
    
    const [error,setError] = React.useState("");
    const [success,setSuccess] = React.useState(""); 

    const [grid,setGrid] = React.useState(5)
    const [cart,setCart] = React.useState([])
    const [wishlist,setWishlist] = React.useState([])
    
    useEffect(()=>{
      var wishlist = JSON.parse(localStorage.getItem('wishlist'))
      if(wishlist){
          setWishlist(wishlist)
      }
      var cart = JSON.parse(localStorage.getItem('cart'))
      if(cart){
          setCart(cart)
      }
      
    },[])


    const addtoWishlist = (pro) => { 
      var data = wishlist.filter(e=>e.id==pro?._id)
      var x = [...wishlist,{
          id:pro?._id,qty:1,
          image:pro?.productImages[0].src,
          name:pro.productName,
          price:pro.regularPrice
      }]
      if(data.length == 0){
          setWishlist(x)
          localStorage.setItem('wishlist',JSON.stringify(x));
          setSuccess('Item Added to wishlist')
      }else{
          setError('Already added to wishlist')
      }
    }
   

    return <div>
      <Head>
        <title>Products</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Layout error={error} success={success} cart={cart.length} wishlist={wishlist.length}>
 
        <div className="">
            <div className="ml-6 my-3">
              <nav className="breadcrumb" aria-label="breadcrumb">
                  <ol className="breadcrumb">
                      <li className="breadcrumb-item"><Link href="/">Home</Link></li> 
                      <li className="breadcrumb-item active">{router.query.category}</li> 
                  </ol>
              </nav>
            </div>
 
            <div className="flex-row md:flex items-start">
              <div className="w-full md:w-1/5">
                <FilterPage />
              </div>
              <div className="w-full md:w-4/5 pr-6">
                <div className="btn-group m-2">
                  <button className="btn btn-primary" disabled={grid==2} onClick={()=>{setGrid(2)}}>2</button>
                  <button className="btn btn-primary" disabled={grid==4} onClick={()=>{setGrid(4)}}>4</button>
                  <button className="btn btn-primary" disabled={grid==5} onClick={()=>{setGrid(5)}}>5</button>
                  <button className="btn btn-primary" disabled={grid==6} onClick={()=>{setGrid(6)}}>6</button>
                </div>
                <div className="flex items-center justify-between border-b-2 pb-8">
                  <MaterialChipArray /> 
                  <select className="form-select w-25" name="sort" id="sort">
                    <option value="">Recommended</option>
                    <option value="">Better Discount</option>
                    <option value="">Popularity</option>
                    <option value="">Price : Low to high</option>
                    <option value="">Price : High to low</option>
                  </select>
                </div>


                <div className={"grid grid-cols-2 md:grid-cols-"+grid+" gap-4 p-2"}>
                  {props.products?.map((el,key)=>(
                    <div key={key}>
                      <SingleProduct name={el.productName} price={el.regularPrice} images={el.productImages}
                      onclick={()=>{addtoWishlist(el)}} />
                    </div> 
                  ))}
                </div>

              </div>

            </div>
        </div>

      </Layout>

    </div>
}

export const getStaticProps = async (context) => {
  const res = await fetch(`http://treevesto55.herokuapp.com/product/subcat/${context.params.category}`).then(d=>d.json())

  var data = []
  res.result.forEach(element => {
    var images = [];
    element.productImages.forEach(e => {
      images.push({src:"http://treevesto55.herokuapp.com/"+e,href:"/product/"+element._id})
    });
    data.push({...element,productImages:images})
  }); 
  return {
    props: {
      products:data
    }
  };
}

export const getStaticPaths = async () => {
  const res = await fetch(`http://treevesto55.herokuapp.com/category/all`).then(d=>d.json())
  var data = [];
  res.result = res.result.filter(e=>(e.parentCatId != 0))
  res.result.forEach((el,key)=>{
    data[key] = {params:{category:el._id}}
  })
  
  return {
    paths: data,
    fallback: false
  };
}