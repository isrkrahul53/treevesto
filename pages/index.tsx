import Link from 'next/link';
import React, { useEffect, lazy, Suspense } from 'react'
import Head from 'next/head'
import axios from 'axios';
import https from 'https'
import { useRouter } from 'next/router';
import Skeleton from '@material-ui/lab/Skeleton';
import { useMediaQuery } from 'react-responsive';

const Layout = lazy(()=>import('../component/common/layout'))
const SingleProduct = lazy(()=>import('../component/product/singleProduct'))
const ReactMultiCarousel = lazy(()=>import('../component/react/multiCarousel'))
const ReactCarousel = lazy(()=>import('../component/react/carousel'))

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
  
  const isMobileDevice = useMediaQuery({
    query: "(min-device-width: 500px)",
  });

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
  
  const [sections,setSections] = React.useState([]) 
  const [cards,setCards] = React.useState([]) 
  
  const [cart,setCart] = React.useState([]);
  const [grid1,setGrid1] = React.useState(5)
  const [grid2,setGrid2] = React.useState(5)
  
  const [isFront, setIsFront] = React.useState(false);


  useEffect(()=>{
    // const handler = e => setCheckedWidth(e.matches);
    // window.matchMedia("(min-width: 768px)").addEventListener();
    process.nextTick(() => {
      if (globalThis.window ?? false) {
          setIsFront(true);
      }
    });

    fetch(`https://api.treevesto.com:4000/banner`).then(d=>d.json()).then(json=>{
            setBanner(json.result.map((el,key)=>({id:el._id,href:el.link,src:"https://api.treevesto.com:4000/"+el.mobileImage})))
        }).catch(err=>console.log(err.message))

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
        setCart(json.result.filter(e=>e.type==="cart"))
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
  if (!isFront) return null;

  return (
    <div>
      <Head>
        <title>Treevetso</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Suspense fallback={<div className="text-center py-10">
            <div className="spinner-border text-primary"></div>
        </div>}>
        <Layout error={error} success={success} close={closeAlert} cart={cart.length}>
          {/* ======================================== */}
          {/* Banners */}
          {/* ======================================== */} 
          <div className="md:hidden">
            <Suspense fallback={<Skeleton className="w-full" height={240} />}>
              <ReactMultiCarousel mobileItem={4} arrows={false}  content={props.categories.map((e,k)=>(
                  <Link href={"/"+e._id} key={k}><div className="text-center w-full">
                    <img src={"https://api.treevesto.com:4000/"+e.catImage} alt={e.catName} className="w-16 h-16 mx-auto rounded-circle"  />
                    <div className="text-sm p-1">  {e.catName} </div>
                  </div></Link>
                ))} className="react-multi-carousel-dot button" />
            </Suspense>
          <br />
          </div>

          <Suspense fallback={<Skeleton className="w-full" height={380} />}>
            <ReactCarousel data={!isMobileDevice ? props.mobBanner:props.deskBanner} arrows={false} showDots={true} />
          </Suspense>
              
          {/* {console.log(isMobileDevice)} */}
          <div className="container my-2"> 
            
            {/* =========================================== */}
            {/* Sections */}
            {/* =========================================== */}

          
            <Suspense fallback={<div className="grid grid-cols-2 md:grid-cols-4 gap-2"> 
                <Skeleton className="w-full" height={240} />
                <Skeleton className="w-full" height={240} />
                <Skeleton className="w-full" height={240} />
                <Skeleton className="w-full" height={240} />
              </div>}>
              {sections?.filter(e=>e.position === "Top").map((el,key)=>(
                <div key={key}>
                    <h3 className="text-lg md:text-4xl mt-1 md:mb-4 md:mt-8 text-secondary"> {el.hiddenTitle === "false" && el.title}  </h3>
                    <div className={"row"}>
                        {cards.filter(e=>el._id === e.sectionId)?.map((e,k)=>{ 
                          return <div key={k} className={"col-"+(k === 0 || k === (cards.filter(e=>el._id === e.sectionId).length - 1) ? 12 : 6)+" col-md-"+(12/el.grid)+" p-2"}> 
                                <Link href={e.link}><img src={"https://api.treevesto.com:4000/"+e.image || ""} alt={e.Meta_Keywords || ""} width="100%" className="border cursor-pointer" /></Link>
                            </div> 
                        })} 
                    </div>
                
                </div>
              ))}
            </Suspense>
            
            <h3 className="text-lg md:text-4xl -mb-1 mt-1 px-2 text-secondary"> Latest Products  </h3>  
            <Suspense fallback={<div className="grid grid-cols-2 md:grid-cols-6 gap-2"> 
                <Skeleton className="w-full" height={240} />
                <Skeleton className="w-full" height={240} />
                <Skeleton className="w-full" height={240} />
                <Skeleton className="w-full" height={240} />
                <Skeleton className="w-full" height={240} />
                <Skeleton className="w-full" height={240} />
              </div>}>
              <ReactMultiCarousel showDots={true} arrows={true} content={props.products.map((e,k)=>(
                    <div key={k} className="p-1">
                        <SingleProduct data={e} hideDetails={false} cart={addtoCart} />
                    </div>
                ))} />
            </Suspense>

          
            <Suspense fallback={<div className="grid grid-cols-2 md:grid-cols-4 gap-2"> 
                <Skeleton className="w-full" height={240} />
                <Skeleton className="w-full" height={240} />
                <Skeleton className="w-full" height={240} />
                <Skeleton className="w-full" height={240} />
              </div>}>
              {sections?.filter(e=>e.position === "Bottom").map((el,key)=>(
                <div key={key}>
                    <h3 className="text-lg md:text-4xl mt-1 md:mb-4 md:mt-8 text-secondary"> {el.hiddenTitle === "false" && el.title}  </h3>
                    <div className={"row"}>
                        {cards.filter(e=>el._id === e.sectionId)?.map((e,k)=>{ 
                          return <div key={k} className={"col-"+(k === 0 || k === (cards.filter(e=>el._id === e.sectionId).length - 1) ? 12 : 6)+" col-md-"+(12/el.grid)+" p-2"}> 
                                <Link href={e.link}><img src={"https://api.treevesto.com:4000/"+e.image || ""} alt={e.Meta_Keywords || ""} width="100%" className="border cursor-pointer" /></Link>
                            </div> 
                        })} 
                    </div>
                
                </div>
              ))}
            </Suspense>
  

          </div>

          
          <br/>

        </Layout>
      </Suspense>

    </div>
  )
}

export const getStaticProps = async (context) => {
  const agent = new https.Agent({  
    rejectUnauthorized: false
  });
  // const isMobileDevice = useMediaQuery({
  //   query: "(min-device-width: 480px)",
  // });
  try{
    var banner = await axios.get(`https://api.treevesto.com:4000/banner`,{httpsAgent:agent})
    var products = await axios.get(`https://api.treevesto.com:4000/product`,{httpsAgent:agent})
    var categories = await axios.get(`https://api.treevesto.com:4000/category`,{httpsAgent:agent})

    const bannerData = await banner.data.result;

    var deskBanner = bannerData.filter(e=>e.image).map((el,key)=>{
        return {id:el._id,href:el.link,src:"https://api.treevesto.com:4000/"+el.image}
    })
    var mobBanner = bannerData.filter(e=>e.mobileImage).map((el,key)=>{
      return {id:el._id,href:el.link,src:"https://api.treevesto.com:4000/"+el.mobileImage}
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
          deskBanner,
          mobBanner,
          products:arr,
          categories:categories?.data.result
      }
  }; 
}