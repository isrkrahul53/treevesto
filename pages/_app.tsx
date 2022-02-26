import '../styles/globals.css'
// import '../loader.js'
import store from '../redux/store'
import {Provider} from 'react-redux';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Router from 'next/router';

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', (url) => NProgress.start());

Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


function MyApp({ Component, pageProps }) {
  store.subscribe(()=>store.getState())

  return <Provider store={store}><Component {...pageProps} /></Provider>
}

export default MyApp
