import Link from 'next/link';
import React from 'react'
import Head from 'next/head'
import Banner from '../component/common/banner'
import Layout from '../component/common/layout'
import MaterialModal from '../component/material/modal'
import axios from 'axios';
import https from 'https'

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
  
  const [error,setError] = React.useState("");
  const [success,setSuccess] = React.useState("");
  const closeAlert = () => { 
    setError("")
    setSuccess("") 
  }
  const [banner,setBanner] = React.useState(props.banner) 

  const [grid1,setGrid1] = React.useState(5)
  const [grid2,setGrid2] = React.useState(5)

 
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Layout error={error} success={success} close={closeAlert}>
 
        {/* <img src="/assets/images/freeshipping.jpg" alt="freeShipping"/> */}
        <Banner images={banner} />

        <div className="container my-2"> 
        
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