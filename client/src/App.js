import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import set_auth_token from './utils/set_auth_token'
import { set_current_user } from './actions/authActions'
import { Provider } from 'react-redux' // provides our application with a store, it has to wrap around everything
import store from './store'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'

import './App.css'

const token = localStorage.jwt_token
if (token) {
   set_auth_token(token)
   const decoded = jwt_decode(token)
   store.dispatch(set_current_user(decoded)) // dispatches the "set_current_user" action
}

function App() {
   return (
      <Provider store={store}>
         <Router>
            <div className="App">
               <Navbar />
               <Route exact path="/" component={Landing} />
               <div className="container">
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
               </div>
               <Footer />
            </div>
         </Router>
      </Provider>
   )
}

export default App
