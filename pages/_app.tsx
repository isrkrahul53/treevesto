import '../styles/globals.css'
// import '../loader.js'
import store from '../redux/store'
import {Provider} from 'react-redux';
import React, { useEffect } from 'react'


function MyApp({ Component, pageProps }) {
  store.subscribe(()=>store.getState())
  const [user,setUser] = React.useState(null)
  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem('user')))
  })

  return <Provider store={store}><Component {...pageProps} user={user} /></Provider>
}

export default MyApp
