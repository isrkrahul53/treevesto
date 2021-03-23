import Link from 'next/link';

export default function NotFoundPage(){
    return <div className="text-center py-10">
        <img src="/logo.png" className="w-25 mx-auto my-2" alt=""/>
        <div className="display-2"> 404 not found </div>
        <div className="text-secondary"> 
        Go to homepage 
        <span className="cursor-pointer text-primary px-2"><Link href="/">click here</Link></span>  
        </div>
    </div>
}