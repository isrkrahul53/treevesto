import React from 'react';
import Link from 'next/link';

export default function ProductImageBanner(props){

    const [selected,setSelected] = React.useState(0);

    
    return <div className="overflow-hidden">
        <img src={props.images[selected].src} className="w-full" alt="" />
        <div className="text-right flex items-center justify-end -mt-8 px-2">
            <Link href={props.images[selected].href}><img onClick={e=>selected > 0 && setSelected(selected-1)} src="/assets/icons/prev.png" width="20px" className="bg-gray-50 m-1 p-1 rounded hover:scale-105" alt="prev" /></Link>
            <Link href={props.images[selected].href}><img onClick={e=>selected < props.images.length-1 && setSelected(selected+1)} src="/assets/icons/next.png" width="20px" className="bg-gray-50 m-1 p-1 rounded hover:scale-105" alt="next" /></Link>
        </div>
    </div>
}