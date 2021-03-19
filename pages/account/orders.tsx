import Link from 'next/link';
import AccountPage from "../../component/pages/account";
import Button from '@material-ui/core/Button'

export default function OrdersPage() {
    return <div>
        <AccountPage>




            <div className="text-center">
                <img src="/assets/images/no_orders.png" className="w-25 mx-auto"  alt="NO Orders"/>
                <div className="font-medium text-md my-2">You haven't placed any order yet!</div>
                <p className="text-secondary my-2">Order section is empty. After placing order, You can track them from here!</p>
                <Link href="/"><Button variant="contained" color="secondary" className="w-1/3 my-4 mx-auto">
                  Start Shopping
                </Button></Link>
            </div>
        </AccountPage>        
    </div>
}