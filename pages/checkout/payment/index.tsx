import React from 'react'
import Checkout from '../../../component/pages/checkout'
import Button from '@material-ui/core/Button'

export default function PaymentPage() {
    const [pay,setPay] = React.useState(false);
    return <div>
        <Checkout pay={pay}>
            
            <div className="my-10">
                {/* <Button variant="contained" color="secondary" onClick={()=>setPay(true)}>
                  Cash on Delivery
                </Button> */}
                <button type="submit" className="px-4 py-1 rounded cursor-pointer border-2 border-gray-800 bg-gray-800 text-gray-50 hover:bg-gray-50 hover:text-gray-800">
                Cash on Delivery
                </button>
            </div>

        </Checkout>
    </div>
}