import React from 'react';
import Link from 'next/link';

export default function Banner(props){

  const [selected,setSelected] = React.useState(0);


    return <div className="flex items-center">
      <div style={{width:"4%"}} className="px-2 cursor-pointer" onClick={e=>selected > 0 && setSelected(selected-1)}>
        <img src="/assets/icons/prev.png" className="opacity-25" alt="prev"/>
      </div>
      <Link href={props.images[selected]?.href || ""}>
        <img style={{width:"92%"}} src={props.images[selected]?.src} className="d-block" alt="Image" />
      </Link>
      <div style={{width:"4%"}} className="px-2 cursor-pointer" onClick={e=>selected < props.images.length-1 && setSelected(selected+1)}>
        <img src="/assets/icons/next.png" className="opacity-25" alt="next"/>
      </div>
    </div>

}