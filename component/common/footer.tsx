import Link from 'next/link';

export default function Footer(){
    return <div className="bg-dark text-white p-4">
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <h3 className="my-2 text-xl">ONLINE SHOPPING</h3>
                    <div className="cursor-pointer text-sm text-light">Men</div>
                    <div className="cursor-pointer text-sm text-light">Women</div>
                    <div className="cursor-pointer text-sm text-light">Kids</div>
                    <div className="cursor-pointer text-sm text-light">Home & Living</div>
                    <div className="cursor-pointer text-sm text-light">Offers</div>
                    
                </div>
                <div className="col-md-3">
                    <h3 className="my-2 text-xl">USEFULL LINKS</h3>
                    <div className="cursor-pointer text-sm text-light">Contact Us</div>
                    <div className="cursor-pointer text-sm text-light">FAQ</div>
                    <div className="cursor-pointer text-sm text-light">T&C</div>
                    <div className="cursor-pointer text-sm text-light">Terms of Use</div>
                    <Link href="/account/orders"><div className="cursor-pointer text-sm text-light">Track Orders</div></Link>
                    <div className="cursor-pointer text-sm text-light">Shipping</div>
                    <div className="cursor-pointer text-sm text-light">Blog</div>
                    <div className="cursor-pointer text-sm text-light">Privacy Policy</div>
                </div>
                <div className="col-md-3">
                    <div className="my-2 text-xl">Registered Office Address</div>
                    <div className="cursor-pointer text-sm text-light">Plot no 10</div>
                    <div className="cursor-pointer text-sm text-light">Ghorabandha,</div>
                    <div className="cursor-pointer text-sm text-light">Telco,</div>
                    <div className="cursor-pointer text-sm text-light">Jamshedpur, Jharkhand - 831004</div>
                    {/* <div className="cursor-pointer text-sm text-light">Varthur Hobli,</div>
                    <div className="cursor-pointer text-sm text-light">Bengaluru – 560103, India</div> */}
                </div>
                <div className="col-md-3">
                </div>
            </div>
            {/* <div className="row my-4 md:my-2">
                <div className="text-right">
                    <div className="cursor-pointer text-sm text-light">CIN: <span className="text-xl">U72300KA2007PTC041799</span> </div>
                    <div className="cursor-pointer text-sm text-light">Telephone: <span className="text-xl">+91-80-61561999</span> </div>
                    <div className="cursor-pointer text-sm text-light">Founder & CEO <div className="text-2xl">Mark Zukerberg</div> </div>
                </div>
            </div> */}
        </div>
    </div>
}