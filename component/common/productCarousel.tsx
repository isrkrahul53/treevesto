import React from 'react';
import Link from 'next/link';
import { useEffect } from 'react';
declare var $:any;

export default function ProductCarousel(props){
  const [grid,setGrid] = React.useState(5)
  var ar=[];
  for(var i=0;i<props.product.length;i++){
    if(i%5==0){
      ar.push(i)
    }
  }
 
  useEffect(()=>{
    console.log(document.body.offsetWidth)
  })

  useEffect(()=>{
    if(document.body.offsetWidth > 800){
      setGrid(5)
    }else{
      setGrid(2)
    }
    try{
      $('#ProductCarousel').carousel({
        interval: 1000,
        wrap: false
      });
    }catch(err){

    }
  },[])

    return <div id="ProductCarousel" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#ProductCarousel" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
    <button type="button" data-bs-target="#ProductCarousel" data-bs-slide-to={1} aria-label="Slide 2" />
    <button type="button" data-bs-target="#ProductCarousel" data-bs-slide-to={2} aria-label="Slide 3" />
  </div>
  <div className="carousel-inner md:px-24 py-3">
    {ar.map((a,i)=>(
    <div key={i} className={i == 0?"carousel-item active":"carousel-item"}>
      <div className={"grid grid-cols-"+grid+" gap-4"}>
          {props.product.filter((el,k)=>k>=0+i && k<=grid-1+i).map((e,key)=>(
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
    </div>
    ))}
      {/* {props.images.map((data,key)=>(
        <div key={key} className={key == 0?"carousel-item active":"carousel-item"}>
          <Link href={data.href}><img src={data.src} className="d-block w-100" alt="Image" /></Link>
        </div>
      ))}  */}
  </div>
  {props.indicator?<button className="carousel-control-prev w-20" type="button" data-bs-target="#ProductCarousel" data-bs-slide="prev">
    <span className="carousel-control-prev-icon bg-dark p-4" aria-hidden="true" />
    <span className="visually-hidden">Previous</span>
  </button>:<></>}
  {props.indicator?<button className="carousel-control-next w-20" type="button" data-bs-target="#ProductCarousel" data-bs-slide="next">
    <span className="carousel-control-next-icon bg-dark p-4" aria-hidden="true" />
    <span className="visually-hidden">Next</span>
  </button>:<></>} 
</div>

}