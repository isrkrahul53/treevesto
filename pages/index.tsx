import Link from 'next/link';
import React, { useEffect } from 'react'
import Head from 'next/head'
import Banner from '../component/common/banner'
import Layout from '../component/common/layout'
import MaterialModal from '../component/material/modal'
import axios from 'axios';
import https from 'https'
import ProductCarousel from '../component/common/productCarousel';
import style from './index.module.scss'

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SingleProduct from '../component/product/singleProduct';
import ReactMultiCarousel from '../component/react/multiCarousel'
import ReactCarousel from '../component/react/carousel';
import { useRouter } from 'next/router';
 
function Cards(props){
  return <div>
    <h3 className="display-5 my-8 text-secondary"> {props.title} </h3>
    <div className={"grid grid-cols-2 md:grid-cols-"+props.grid+" gap-4"}>
      {props.images.map((data,key)=>(
        <Link key={key} href={data.href}><img src={data.src} className="w-100 cursor-pointer" /></Link>
      ))} 
    </div>

  </div>  
}

export default function Home(props) {
  
  const router = useRouter();
  const [navigation, setNavigation] = React.useState(0); 
  const [categories,setCategories] = React.useState([]);

  const handleNavigationChange = (event, newValue) => {
    setNavigation(newValue);
  };

  const [error,setError] = React.useState("");
  const [success,setSuccess] = React.useState("");
  const closeAlert = () => { 
    setError("")
    setSuccess("") 
  }
  const [banner,setBanner] = React.useState(props.banner) 
  const [sections,setSections] = React.useState([]) 
  const [cards,setCards] = React.useState([]) 

  const [cart,setCart] = React.useState([]);
  const [grid1,setGrid1] = React.useState(5)
  const [grid2,setGrid2] = React.useState(5)
 
 

  useEffect(()=>{
    fetch(`https://api.treevesto.com:4000/section`).then(d=>d.json()).then(json=>{
      var data = json.result.sort((a,b)=>Number(a.priority) - Number(b.priority))
      setSections(data)
    }).catch(err=>console.log(err.message))
    fetch(`https://api.treevesto.com:4000/card`).then(d=>d.json()).then(json=>{
        setCards(json.result)
    }).catch(err=>console.log(err.message))
    var user = JSON.parse(localStorage.getItem('user'))
    if(user){
      getCart(user.userId)
    }
    fetch(`https://api.treevesto.com:4000/category/all`).then(d=>d.json()).then(json=>{ 
        setCategories(json.result)
    }).catch(err=>setError(err.message))
  },[])

  console.log(sections)

  const getCart = (x) => {
    fetch(`https://api.treevesto.com:4000/cart/user/`+x).then(d=>d.json()).then(json=>{ 
        setCart(json.result)
    })
    
  }

  const addtoCart = (pro) => { 
      var user = JSON.parse(localStorage.getItem('user'))
      if(user){
        var formData = new FormData();
        formData.append("userId",user.userId)
        formData.append("productId",pro._id)
        formData.append("vendorId",pro.vendorId)
        formData.append("type","cart")
        formData.append("image",pro.productImages[0].src)
        formData.append("name",pro.productName)
        formData.append("price",pro.sellingPrice)
        formData.append("qty","1")
        formData.append("stock",pro.stock) 
        formData.append("size",pro.size) 
  
        fetch(`https://api.treevesto.com:4000/cart/`,{
          method:"POST",
          body:formData
        }).then(d=>d.json()).then(json=>{
          if(json.success === 1){
            setSuccess('Item Added to cart')
          }else{
            setError(json.msg)
          }
        }).catch(err=>console.log(err.message))
      }else{
        router.replace("/auth/login")
      }
    
      // var data = cart.filter(e=>e.productId==pro._id)
      // var x = [...cart,{
      //   productId:pro._id,qty:1,size:pro.size,
      //   vendorId:pro.vendorId,
      //   image:pro.productImages[0].src,
      //   name:pro.productName,
      //   price:pro.sellingPrice
      // }]
      // if(data.length == 0){
      //     setCart(x)
      //     localStorage.setItem('cart',JSON.stringify(x));
      //     setSuccess('Item Added to cart')
      // }else{
      //     setError('Already added to cart')
      // }
  }
  return (
    <div>
      <Head>
        <title>Treevetso</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Layout error={error} success={success} close={closeAlert} cart={cart.length}>
 

          {/* ======================================== */}
          {/* Banners */}
          {/* ======================================== */}

          {/* <Banner images={banner} indicator={true} /> */}
          
          {/* <ProductCarousel images={banner} indicator={true} /> */}
          <ReactCarousel data={banner} arrows={false} showDots={true} />
  
          {/* <img src="/assets/images/freeshipping.jpg" className="my-2" alt="freeShipping"/> */}

        {/* <div className="text-center p-8 md:p-32" style={{background:'url("/assets/images/banner/banner8.jpg") no-repeat',backgroundSize:"cover",backgroundPositionX:"center"}}>
          <div className="text-secondary">Limited time : Online only !</div>
          <div className="display-4">FINAL CLEARANCE</div>
          <div className="display-6">Take 20% Off 'Sale Must-Haves'</div>
          <div className="my-4">
          <Link href="/6099022ddbf23644536cb74d?color=Brown,Green&size=4XL&from=4233&to=6565"><span className="px-4 py-2 cursor-pointer border border-gray-800 bg-gray-800 text-gray-50 hover:bg-gray-50 hover:text-gray-800">Shop Now</span></Link>
          </div>
        </div> */}
 

        {/* Category Section */}
        {/* <div className="container my-10">

<div className="grid grid-cols-1 md:grid-cols-3 gap-2">

{categories.filter(e=>e.parentCatId === "0").map((el,key)=>(
  <div key={key} className={"relative overflow-hidden font-thin "+style.women}>
  {el.catImage && <>
    <article style={{backgroundImage:'url("https://api.treevesto.com:4000/'+el.catImage+'")',backgroundRepeat:"no-repeat",backgroundSize:"cover",height:"280px"}}>
    <section className="womencat flex items-center bg-white text-center p-4 m-4 border-2 border-dark" style={{height:"250px"}}>
    <div className="w-full">
    <div className="text-xl">{el.catName.toUpperCase()}</div>
    {categories.filter(e=>e.parentCatId === el._id).map((e,k)=>(
      <div key={k} className="cursor-pointer"><Link href={"/"+e._id}>{e.catName}</Link></div>
      ))}
      </div>
      </section>
      <footer className="womentitle text-center text-lg bg-white p-2 border">{el.catName.toUpperCase()}</footer>
      </article>
      </>}
      </div>
      ))} 
      
      </div>
    </div> */}


        <div className="container my-2"> 
        
          
          {/* <div className="flex items-center justify-center font-light my-4">
            <div className={navigation === 0?"text-xl p-2 font-medium":"text-xl p-2 cursor-pointer"} onClick={()=>setNavigation(0)}>
              <div className="flex items-center">
                <span>New</span>
                <span className="md:block hidden ml-1">Product</span>
              </div>
            </div>
            <div className={navigation === 1?"text-xl p-2 font-medium":"text-xl p-2 cursor-pointer"} onClick={()=>setNavigation(1)}>
              <div className="flex items-center">
                <span>Special</span>
                <span className="md:block hidden ml-1">Product</span>
              </div>
            </div>
            <div className={navigation === 2?"text-xl p-2 font-medium":"text-xl p-2 cursor-pointer"} onClick={()=>setNavigation(2)}>
              <div className="flex items-center">
                <span>Featured</span>
                <span className="md:block hidden ml-1">Product</span>
              </div>
            </div>
          </div>
          <div className="my-2"></div>

          {navigation === 0?<>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-content-center gap-4">
              {props.products.map((el,key)=>(
                <div key={key}>
                  <SingleProduct data={el} cart={addtoCart} />
                </div> 
              ))}
            </div>
          </>:<></>} */}
  

          {/* =========================================== */}
          {/* Sections */}
          {/* =========================================== */}

          {sections?.filter(e=>e.position === "Top").map((el,key)=>(
            <div key={key}>
                <h3 className="text-lg md:text-4xl my-6 md:mb-8 text-secondary"> {el.title}  </h3>
                <div className={"grid grid-cols-2 md:grid-cols-"+el.grid+" gap-4"}>
                    {cards.filter(e=>el._id === e.sectionId)?.map((e,key)=>{ 
                      return <div key={key}> 
                            <Link href={e.link}><img src={"https://api.treevesto.com:4000/"+e.image || ""} width="100%" className="border cursor-pointer" /></Link>
                        </div> 
                    })} 
                </div>
            
            </div>
          ))}
          
          <h3 className="text-lg md:text-4xl my-6 md:mb-8 text-secondary"> Latest Products  </h3>
          <ReactMultiCarousel data={props.products} hideDetails={false} cart={addtoCart} />

          {sections?.filter(e=>e.position === "Bottom").map((el,key)=>(
            <div key={key}>
                <h3 className="text-lg md:text-4xl my-6 md:mb-8 text-secondary"> {el.title}  </h3>
                <div className={"grid grid-cols-2 md:grid-cols-"+el.grid+" gap-4"}>
                    {cards.filter(e=>el._id === e.sectionId)?.map((e,key)=>{ 
                      return <div key={key}> 
                            <Link href={e.link}><img src={"https://api.treevesto.com:4000/"+e.image || ""} width="100%" className="border cursor-pointer" /></Link>
                        </div> 
                    })} 
                </div>
            
            </div>
          ))}
 

        </div>

        
        <br/>

      </Layout>

    </div>
  )
}

export const getStaticProps = async (context) => {
  const agent = new https.Agent({  
    rejectUnauthorized: false
  });
  try{
    var banner = await axios.get(`https://api.treevesto.com:4000/banner`,{httpsAgent:agent})
    var products = await axios.get(`https://api.treevesto.com:4000/product`,{httpsAgent:agent})
    banner = banner.data.result.map((el,key)=>{
        return {id:el._id,href:el.link,src:"https://api.treevesto.com:4000/"+el.image}
    })

    var data = []
    products.data.result.forEach(element => {
      var images = [];
      element.productImages.forEach(e => {
        images.push({src:"https://api.treevesto.com:4000/"+e,href:"/product/"+element._id})
      });
      data.push({...element,productImages:images})
    }); 
    var arr = []
    var temp = data;
    temp.map(e=>e.productCode).filter((e,k,ar)=>ar.indexOf(e) === k).map(el=>{
      arr.push(temp.filter(e=>e.productCode === el))
    })
    
  }catch(err){
    console.log(err)
  }
  

   
  return {
      props: {
          banner:banner || [],
          products:arr,
      }
  }; 
}