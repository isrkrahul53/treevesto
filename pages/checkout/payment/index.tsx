import React from 'react'
import Checkout from '../../../component/pages/checkout'
import Button from '@material-ui/core/Button'

export default function PaymentPage() {
    const [pay,setPay] = React.useState(false);
    return <div>
        <Checkout pay={pay}>
            
            <div className="my-10">
                <Button variant="contained" color="secondary" onClick={()=>setPay(true)}>
                  Cash on Delivery
                </Button>
            </div>

        </Checkout>
    </div>
}