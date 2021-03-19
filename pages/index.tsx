import Link from 'next/link';
import React from 'react'
import Head from 'next/head'
import Banner from '../component/common/banner'
import Layout from '../component/common/layout'
import MaterialModal from '../component/material/modal'
 

function Cards(props){
  return <div>
    <h3 className="display-5 my-8 text-secondary"> {props.title} </h3>
    <div className={"grid grid-cols-2 md:grid-cols-"+props.grid+" gap-4"}>
      {props.images.map((data,key)=>(
        <Link key={key} href={data.href}><img src={data.src} className="w-100" /></Link>
      ))} 
    </div>

  </div>
}

export default function Home() {
  
  const [error,setError] = React.useState("");
  const [success,setSuccess] = React.useState("");
  const closeAlert = () => { 
    setError("")
    setSuccess("") 
  }

  const [grid1,setGrid1] = React.useState(5)
  const [grid2,setGrid2] = React.useState(5)

 
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Layout error={error} success={success} close={closeAlert}>
 
        <img src="/assets/images/freeshipping.jpg" alt="freeShipping"/>
        <Banner images={[
          {src:"/assets/images/banner/banner1.jpg",href:"/"},
          {src:"/assets/images/banner/banner2.jpg",href:"/"},
          {src:"/assets/images/banner/banner3.jpg",href:"/"}
          ]} />

        <div className="container">
          <div className="btn-group my-4"> 
            <button className="btn btn-primary" onClick={()=>setGrid1(2)}>2</button> 
            <button className="btn btn-primary" onClick={()=>setGrid1(4)}>4</button>
            <button className="btn btn-primary" onClick={()=>setGrid1(5)}>5</button>
            <button className="btn btn-primary" onClick={()=>setGrid1(6)}>6</button>
          </div>

          <div id="deals"> 
            <Cards title={"Deals of the day"} grid={grid1} images={[
              {src:"/assets/images/dealsOfDay/image1.jpg",href:"/t-shirts"},
              {src:"/assets/images/dealsOfDay/image2.jpg",href:"/t-shirts"},
              {src:"/assets/images/dealsOfDay/image3.jpg",href:"/t-shirts"},
              {src:"/assets/images/dealsOfDay/image4.jpg",href:"/shirts"},
              {src:"/assets/images/dealsOfDay/image5.jpg",href:"/shirts"},
            ]} /> 
          </div>

          <div className="btn-group my-4"> 
            <button className="btn btn-primary" onClick={()=>setGrid2(2)}>2</button> 
            <button className="btn btn-primary" onClick={()=>setGrid2(4)}>4</button>
            <button className="btn btn-primary" onClick={()=>setGrid2(5)}>5</button>
            <button className="btn btn-primary" onClick={()=>setGrid2(6)}>6</button>
          </div>

          <div id="biggestdeals"> 
            <Cards title={"BIGGEST DEALS ON TOP BRANDS"} grid={grid2} images={[
              {src:"/assets/images/dealsOfDay/image1.jpg",href:"/shirts"},
              {src:"/assets/images/dealsOfDay/image2.jpg",href:"/shirts"},
              {src:"/assets/images/dealsOfDay/image3.jpg",href:"/jeans"},
              {src:"/assets/images/dealsOfDay/image4.jpg",href:"/jeans"},
              {src:"/assets/images/dealsOfDay/image5.jpg",href:"/jeans"},
            ]} /> 
          </div>
 

        </div>

      </Layout>

    </div>
  )
}
