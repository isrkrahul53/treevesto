import Link from 'next/link';

export default function Footer(){
    return <div className="bg-dark text-white p-4">
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <h3 className="my-2 text-xl">Order</h3>
                    <Link href="/account"><div className="cursor-pointer text-sm text-gray-50 hover:text-blue-500">My Account</div></Link>
                    <Link href="/checkout/cart"><div className="cursor-pointer text-sm text-gray-50 hover:text-blue-500">View Bag</div></Link>
                    <Link href="/account/orders"><div className="cursor-pointer text-sm text-gray-50 hover:text-blue-500">Track Orders</div></Link>
                    <Link href="/"><div className="cursor-pointer text-sm text-gray-50 hover:text-blue-500">Privacy Policy</div></Link>
                    <Link href="/"><div className="cursor-pointer text-sm text-gray-50 hover:text-blue-500">Cookie Policy</div></Link>
                    
                </div>
                <div className="col-md-3">
                    <h3 className="my-2 text-xl">USEFULL LINKS</h3>
                    <div className="cursor-pointer text-sm text-gray-50 hover:text-blue-500">Contact Us</div>
                    <div className="cursor-pointer text-sm text-gray-50 hover:text-blue-500">FAQ</div>
                    <Link href="/404"><div className="cursor-pointer text-sm text-gray-50 hover:text-blue-500">404 page</div></Link>
                    <div className="cursor-pointer text-sm text-gray-50 hover:text-blue-500">Privacy Policy</div>
                    <div className="cursor-pointer text-sm text-gray-50 hover:text-blue-500">Terms of Use</div>
                    <div className="cursor-pointer text-sm text-gray-50 hover:text-blue-500">T&C</div>
                </div>
                <div className="col-md-3">
                    <div className="my-2 text-xl">Registered Office Address</div>
                    <div className="text-sm text-gray-50">Plot no 10</div>
                    <div className="text-sm text-gray-50">Ghorabandha,</div>
                    <div className="text-sm text-gray-50">Telco,</div>
                    <div className="text-sm text-gray-50">Jamshedpur, Jharkhand - 831004</div>
                </div>
            </div>
        </div>
    </div>
}