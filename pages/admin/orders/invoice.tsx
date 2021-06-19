import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ReactToPdf from "react-to-pdf";
import Link from 'next/link';

export default function InvoicePage() {
    const ref:any = React.createRef();
    const router = useRouter();
    const [cart,setCart] = React.useState(null)
    const [order,setOrder] = React.useState(null)
    const [address,setAddress] = React.useState(null)

    useEffect(()=>{
        if(router.query.result){
            var data = router.query;
            var order = JSON.parse(router.query.result.toString());
            var address = JSON.parse(router.query.address.toString());
            setAddress(address)
            setOrder(order)
            setCart(JSON.parse(order.cart.toString()))
        }else{
            // router.replace('/')
        }

        
    },[router.query])
    return (
        <div className="my-6">
            <ReactToPdf targetRef={ref} filename="Invoice.pdf">
                {({toPdf}) => (
                    <div className={"container d-print-none"}>
                        <div className="float-right btn-group">
                            <button className="btn btn-primary" onClick={e=>window.print()}>Print</button>
                            <button className="btn btn-outline-primary" onClick={toPdf}>Download pdf</button>
                            {/* <Link href="/"><button className="btn btn-outline-info">Continue Shopping</button></Link> */}
                        </div>

                    </div>
                    // <button onClick={toPdf}>Generate pdf</button>
                )}
            </ReactToPdf>
            <div className="container"  ref={ref} >
                {/* <img src="/logo.png" alt="Logo" className="w-32" /> */}
                <h2 className="text-4xl">Invoice</h2>
                {/* <h2 className="text-2xl">Treevesto pvt ltd.</h2>
                <div className="text-secondary">Plot no 10</div>
                <div className="text-secondary">Ghorabandha, Telco</div>
                <div className="text-secondary">Jamshedpur, Jharkhand - 831004</div> */}
                 
                <div className="text-xl mt-3 text-secondary">Shipping To</div>
                <div>
                    <div className="text-lg text-secondary"> {address?.name} {address?.phone} </div>
                    <span className="text-secondary"> {address?.address} </span>
                    <span className="text-secondary"> {address?.state} {address?.city} - {address?.pincode} </span>
                </div>

                <table className="table table-hover"> 
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>ProductName</th>
                            <th>Qty</th>
                            {/* <th>Size</th> */}
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart?.map((el,key)=>(
                            <tr key={key}>
                                <td> {key+1} </td>
                                <td> {el.name} </td>
                                <td> {el.qty} </td>
                                {/* <td> {el.size} </td> */}
                                <td> {el.price} </td>
                            </tr>
                        ))}

                    </tbody>
                </table>

                <div className="text-right">
                    {/* <div>Tax : <span className="text-xl">Rs. 0</span> </div> */}
                    {/* <div>Delivery Charges : <span className="text-xl">Rs. 50</span> </div> */}
                    <div>Discount : <span className="text-xl">Rs. {order?.couponDiscount}</span> </div>
                    <div>Total Amount : <span className="text-2xl">Rs. {order?.totalAmount}</span> </div>
                </div>

            </div>

        </div>
    );
}