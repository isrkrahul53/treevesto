import Document ,{Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document{
    render(){
        return(
            <Html>
                <Head>    
                    <link rel="icon" href="/logoHead.ico" />
                    <link rel="stylesheet" href="/assets/bootstrap/css/bootstrap.min.css"/>
                    <link rel="stylesheet" href="/assets/tailwind/tailwind.min.css"/> 
                    
                    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300&display=swap" rel="stylesheet"></link>
                </Head>
                <body className="bg-white">
                    <Main />
                    <NextScript />
                </body> 
                <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossOrigin="anonymous"></script>
                <script src="/assets/bootstrap/js/bootstrap.js"></script> 
                
                <script src="https://checkout.razorpay.com/v1/razorpay.js"></script> 



            </Html>
        ) 
    }

}

export default MyDocument;