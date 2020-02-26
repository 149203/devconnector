import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import set_auth_token from './utils/set_auth_token'
import { set_current_user, logout_user } from './actions/authActions'
import { clear_current_profile } from './actions/profileActions'
import { Provider } from 'react-redux' // provides our application with a store, it has to wrap around everything
import store from './store'
import PrivateRoute from './components/common/PrivateRoute'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Dashboard from './components/dashboard/Dashboard'
import CreateProfile from './components/create-profile/CreateProfile'
import EditProfile from './components/edit-profile/EditProfile'
import AddExperience from './components/add-credentials/AddExperience'
import AddEducation from './components/add-credentials/AddEducation'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'

import './App.css'

const token = localStorage.jwt_token
if (token) {
   set_auth_token(token)
   const decoded = jwt_decode(token)
   store.dispatch(set_current_user(decoded)) // dispatches the "set_current_user" action
   const current_time = Date.now() / 1000
   if (decoded.exp < current_time) {
      store.dispatch(logout_user())
      store.dispatch(clear_current_profile())
      window.location.href = '/login'
   }
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
                  <Route exact path="/profiles" component={Profiles} />
                  <Route
                     exact
                     path="/profile/:handle"
                     component={Profile}
                  />{' '}
                  {/* This declares what is accessible in this.props.match.params  */}
                  <Switch>
                     {/* Switch prevents strange redirect issues with our custom PrivateRoute component*/}
                     <PrivateRoute
                        exact
                        path="/dashboard"
                        component={Dashboard}
                     />
                  </Switch>
                  <Switch>
                     <PrivateRoute
                        exact
                        path="/create-profile"
                        component={CreateProfile}
                     />
                  </Switch>
                  <Switch>
                     <PrivateRoute
                        exact
                        path="/edit-profile"
                        component={EditProfile}
                     />
                  </Switch>
                  <Switch>
                     <PrivateRoute
                        exact
                        path="/add-experience"
                        component={AddExperience}
                     />
                  </Switch>
                  <Switch>
                     <PrivateRoute
                        exact
                        path="/add-education"
                        component={AddEducation}
                     />
                  </Switch>
               </div>
               <Footer />
            </div>
         </Router>
      </Provider>
   )
}

export default App
