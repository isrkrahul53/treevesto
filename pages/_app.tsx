import '../styles/globals.css'
// import '../loader.js'
import store from '../redux/store'
import {Provider} from 'react-redux';

function MyApp({ Component, pageProps }) {
  store.subscribe(()=>store.getState())

  return <Provider store={store}><Component {...pageProps} /></Provider>
}

export default MyApp
