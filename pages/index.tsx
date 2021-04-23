import Link from 'next/link';
import React from 'react'
import Head from 'next/head'
import Banner from '../component/common/banner'
import Layout from '../component/common/layout'
import MaterialModal from '../component/material/modal'
import axios from 'axios';
import https from 'https'
import ProductCarousel from '../component/common/productCarousel';

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
 
  return (
    <div>
      <Head>
        <title>Treevetso</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Layout error={error} success={success} close={closeAlert}>
 
        {/* <img src="/assets/images/freeshipping.jpg" alt="freeShipping"/> */}

        <div className="text-center p-8 md:p-32" style={{background:'url("/assets/images/banner/banner8.jpg") no-repeat',backgroundSize:"cover",backgroundPositionX:"center"}}>
          <div className="text-secondary">Limited time : Online only !</div>
          <div className="display-4">FINAL CLEARANCE</div>
          <div className="display-6">Take 20% Off 'Sale Must-Haves'</div>
          <div className="my-4">
            <span className="px-4 py-2 cursor-pointer border-2 border-gray-800 bg-gray-800 text-gray-50 hover:bg-gray-50 hover:text-gray-800">Shop Now</span>
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {product.filter((a,i)=>i>=0 && i<=4).map((e,key)=>(
                <div key={key} className="border-2 shadow-sm">
                  <img src={e.image} alt="" className="w-full" />
                  <div className="p-2">
                    <div>{e.title}</div>
                    <div>${e.price}</div>
                    <div className="my-4">
                      <span className="px-4 py-2 cursor-pointer border-2 border-gray-800 bg-gray-800 text-gray-50 hover:bg-gray-50 hover:text-gray-800">
                        Add To Bag
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>:<></>}

          {navigation === 1?<>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {product.filter((a,i)=>i>=4 && i<=8).map((e,key)=>(
                <div key={key} className="border-2 shadow-sm">
                  <img src={e.image} alt="" className="w-full" />
                  <div className="p-2">
                    <div>{e.title}</div>
                    <div>${e.price}</div>
                    <div className="my-4">
                      <span className="px-4 py-2 cursor-pointer border-2 border-gray-800 bg-gray-800 text-gray-50 hover:bg-gray-50 hover:text-gray-800">
                        Add To Bag
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div> 
          </>:<></>}

          {navigation === 2?<>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {product.filter((a,i)=>i>=8 && i<=12).map((e,key)=>(
                <div key={key} className="border-2 shadow-sm">
                  <img src={e.image} alt="" className="w-full" />
                  <div className="p-2">
                    <div>{e.title}</div>
                    <div>${e.price}</div>
                    <div className="my-4">
                      <span className="px-4 py-2 cursor-pointer border-2 border-gray-800 bg-gray-800 text-gray-50 hover:bg-gray-50 hover:text-gray-800">
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

          <h3 className="display-5 my-8 text-secondary"> Trending Products  </h3>
          <ProductCarousel product={product} indicator={true} />


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
  
  banner = banner.data.result.map((el,key)=>{
      return {id:el._id,href:el.link,src:"https://api.treevesto.com:4000/"+el.image}
  })
   
  return {
      props: {
          banner:banner,
          sections:sections.data.result,
          cards:cards.data.result,
      }
  }; 
}