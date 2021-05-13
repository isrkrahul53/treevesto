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

  const [cart,setCart] = React.useState([]);
  const [grid1,setGrid1] = React.useState(5)
  const [grid2,setGrid2] = React.useState(5)
 

  var product = [
    {title:"Light grey kurti",price:"321",image:"/assets/images/products/product1/image1.jpg"},
    {title:"Red lenhnga for bride",price:"322",image:"/assets/images/products/product2/image1.jpg"},
    {title:"Orange suit marriage",price:"323",image:"/assets/images/products/product3/image1.jpg"},
    {title:"Light grey kurti",price:"324",image:"/assets/images/products/product1/image2.jpg"},
    {title:"Red lenhnga for bride",price:"325",image:"/assets/images/products/product2/image2.jpg"},
    {title:"Orange suit marriage",price:"326",image:"/assets/images/products/product3/image2.jpg"},
    {title:"Light grey kurti",price:"327",image:"/assets/images/products/product1/image3.jpg"},
    {title:"Red lenhnga for bride",price:"328",image:"/assets/images/products/product2/image3.jpg"},
    {title:"Red lenhnga for bride",price:"329",image:"/assets/images/products/product3/image3.jpg"},
    {title:"Red lenhnga for bride",price:"3210",image:"/assets/images/products/product1/image1.jpg"},
    {title:"Red lenhnga for bride",price:"3211",image:"/assets/images/products/product2/image1.jpg"},
    {title:"Red lenhnga for bride",price:"3212",image:"/assets/images/products/product3/image1.jpg"},
  ]
 

  useEffect(()=>{
    fetch(`https://api.treevesto.com:4000/category/all`).then(d=>d.json()).then(json=>{ 
        setCategories(json.result)
    })
  })

  const addtoCart = (pro) => { 
      var data = cart.filter(e=>e.productId==pro._id)
      var x = [...cart,{
          productId:pro._id,qty:1,size:pro.size,
          vendorId:pro.vendorId,
          image:"https://api.treevesto.com:4000/"+pro.productImages[0],
          name:pro.productName,
          price:pro.sellingPrice
      }]
      if(data.length == 0){
          setCart(x)
          localStorage.setItem('cart',JSON.stringify(x));
          setSuccess('Item Added to cart')
      }else{
          setError('Already added to cart')
      }
  }
  return (
    <div>
      <Head>
        <title>Treevetso</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Layout error={error} success={success} close={closeAlert} cart={cart.length}>
 
        {/* <img src="/assets/images/freeshipping.jpg" alt="freeShipping"/> */}

        <div className="text-center p-8 md:p-32" style={{background:'url("/assets/images/banner/banner8.jpg") no-repeat',backgroundSize:"cover",backgroundPositionX:"center"}}>
          <div className="text-secondary">Limited time : Online only !</div>
          <div className="display-4">FINAL CLEARANCE</div>
          <div className="display-6">Take 20% Off 'Sale Must-Haves'</div>
          <div className="my-4">
            <Link href="/6099022ddbf23644536cb74d"><span className="px-4 py-2 cursor-pointer border-2 border-gray-800 bg-gray-800 text-gray-50 hover:bg-gray-50 hover:text-gray-800">Shop Now</span></Link>
          </div>
        </div>
 

        {/* Category Section */}
        <div className="container my-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
             
            {categories.filter(e=>e.parentCatId === "0").map((el,key)=>(
              <div key={key} className={style.women} style={{backgroundImage:'url("/assets/images/category/image1.jpg")',backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
                <section className="womencat bg-white text-center p-4 m-4 border shadow-sm">
                  <div className="text-xl">{el.catName.toUpperCase()}</div>
                  {categories.filter(e=>e.parentCatId === el._id).map((e,k)=>(
                        <div key={k} className="cursor-pointer"><Link href={"/"+e._id}>{e.catName}</Link></div>
                    ))}
                </section>
                <footer className="womentitle text-center text-3xl bg-white m-4 border shadow-sm">{el.catName.toUpperCase()}</footer>
              </div>
            ))} 

          </div>
        </div>


        <div className="container my-2"> 
         
         
          {/* =========================================== */}
          {/* Featured Products */}
          {/* =========================================== */}
          <div className="hidden md:block">
            <Paper className="my-2">
              <Tabs
                value={navigation}
                onChange={handleNavigationChange}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                  <Tab label="New Products" />
                  <Tab label="Special Products" />
                  <Tab label="Featured Products" />
              </Tabs>
            </Paper>
          </div>

          <div className="md:hidden">
            <Paper className="my-2">
              <Tabs
                value={navigation}
                onChange={handleNavigationChange}
                indicatorColor="primary"
                textColor="primary"
                centered
              > 
                  <Tab label="New" />
                  <Tab label="Special" />
                  <Tab label="Featured" />
              </Tabs>
            </Paper>
          </div>

          <div className="my-2"></div>

          {navigation === 0?<>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-content-center gap-4">
              {props.products.map((e,key)=>(
                <div key={key} className="border-2 shadow-sm">
                  <Link href={"/product/"+e._id}><img src={"https://api.treevesto.com:4000/"+e.productImages[0]} alt="" className="w-full cursor-pointer" /></Link>
                  <div className="p-2">
                    <div>{e.productName}</div>
                    <div>Rs. {e.sellingPrice}</div>
                    <div className="my-4">
                      <span  onClick={()=>{addtoCart(e)}} className="px-4 py-2 cursor-pointer border-2 border-gray-800 bg-gray-800 text-gray-50 hover:bg-gray-50 hover:text-gray-800">
                        Add To Bag
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>:<></>}

          {navigation === 1?<>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-content-center gap-4">
              {props.products.map((e,key)=>(
                <div key={key} className="border-2 shadow-sm">
                  <Link href={"/product/"+e._id}><img src={"https://api.treevesto.com:4000/"+e.productImages[0]} alt="" className="w-full cursor-pointer" /></Link>
                  <div className="p-2">
                    <div>{e.productName}</div>
                    <div>Rs. {e.sellingPrice}</div>
                    <div className="my-4">
                      <span onClick={()=>{addtoCart(e)}} className="px-4 py-2 cursor-pointer border-2 border-gray-800 bg-gray-800 text-gray-50 hover:bg-gray-50 hover:text-gray-800">
                        Add To Bag
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>:<></>}

          {navigation === 2?<>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-content-center gap-4">
              {props.products.map((e,key)=>(
                <div key={key} className="border-2 shadow-sm">
                  <Link href={"/product/"+e._id}><img src={"https://api.treevesto.com:4000/"+e.productImages[0]} alt="" className="w-full cursor-pointer" /></Link>
                  <div className="p-2">
                    <div>{e.productName}</div>
                    <div>Rs. {e.sellingPrice}</div>
                    <div className="my-4">
                      <span onClick={()=>{addtoCart(e)}} className="px-4 py-2 cursor-pointer border-2 border-gray-800 bg-gray-800 text-gray-50 hover:bg-gray-50 hover:text-gray-800">
                        Add To Bag
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>:<></>}
 


          {/* =========================================== */}
          {/* Product Slider */}
          {/* =========================================== */}

          {/* <h3 className="display-5 my-8 text-secondary"> Trending Products  </h3>
          <ProductCarousel product={product} indicator={true} /> */}


          {/* =========================================== */}
          {/* Sections */}
          {/* =========================================== */}

          {props.sections?.map((el,key)=>(
            <div key={key}>
                <h3 className="display-5 my-8 text-secondary"> {el.title}  </h3>
                <div className={"grid grid-cols-2 md:grid-cols-"+el.grid+" gap-4"}>
                    {props.cards?.map((e,key)=>{ 
                      return <div key={key} className={el._id==e.sectionId?"":"d-none"}> 
                            <Link href={e.link}><img src={"https://api.treevesto.com:4000/"+e.image} width="100%" className="border shadow-sm cursor-pointer" /></Link>
                        </div> 
                    })} 
                </div>
            
            </div>
          ))}
 

        </div>

        {/* ======================================== */}
        {/* Banners */}
        {/* ======================================== */}

        <Banner images={banner} indicator={true} />
        
        <br/>

      </Layout>

    </div>
  )
}

export const getStaticProps = async (context) => {
  const agent = new https.Agent({  
    rejectUnauthorized: false
  });
  var banner = await axios.get(`https://api.treevesto.com:4000/banner`,{httpsAgent:agent})
  var sections = await axios.get(`https://api.treevesto.com:4000/section`,{httpsAgent:agent})
  var cards = await axios.get(`https://api.treevesto.com:4000/card`,{httpsAgent:agent})
  var products = await axios.get(`https://api.treevesto.com:4000/product`,{httpsAgent:agent})
  

  banner = banner.data.result.map((el,key)=>{
      return {id:el._id,href:el.link,src:"https://api.treevesto.com:4000/"+el.image}
  })
   
  return {
      props: {
          banner:banner,
          sections:sections.data.result,
          products:products.data.result,
      }
  }; 
}