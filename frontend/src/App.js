import './App.css';
import React, { createContext, useEffect, useState } from 'react';
import CreateAccount from './login/CreateAccount';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { accounts } from './data/Directory'
import ProfileView from './account/ProfileView';
import CreateProfile from './login/CreateProfile';
import LandingPage from './login/LandingPage';
import HomePage from './login/HomePage';
import SearchResults from './search/SearchResults';
import Application from './application/Application';
import AddProperty from './property/addProperty';
import { PropertyView } from './property/PropertyView';
import Inbox from './application/Inbox'
import { EditProperty } from './property/editProperty';
export const UserContext = createContext();
 
export const App = () => {
  // current user logic
  const [ currentUser, setCurrentUser ] = useState(undefined);
  const _setCurrentUser = user => setCurrentUser(user);
  useEffect(() => {
    const temp = window.localStorage.getItem('CURRENT_USER');
    if (temp !== 'undefined') setCurrentUser(JSON.parse(temp));
  }, [])
  useEffect(() => {
    window.localStorage.setItem('CURRENT_USER', JSON.stringify(currentUser));
  }, [currentUser])

  if (!currentUser) {
    return (
      <Router>
        <Routes>
          <Route path='/' element={ <LandingPage setCurrentUser={ _setCurrentUser }/> }></Route>
        </Routes>
      </Router>
  )}

  return (
    <UserContext.Provider value={ currentUser }>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="bootstrap/dist/css/bootstrap.min.css" />
      <Router>
        <Routes>
          <Route path='/' element={<HomePage setCurrentUser={ _setCurrentUser }/>} />
          {/* <Route path='/' element={<HomePage/>}></Route> */}
          <Route path='/create_account/:id' element={<CreateAccount/>}></Route>
          <Route path='/create_profile/:id' element={<CreateProfile/>}></Route>
          <Route path='/profiles/:id' element={<ProfileView setCurrentUser={ _setCurrentUser }/>}></Route>
          <Route path='/properties' element={<SearchResults/>}></Route>
          <Route path='/apply/:id' element={<Application/>}></Route>
          <Route path='/property/:id' element={<PropertyView/>}/>
          <Route path='/newListing' element={<AddProperty/>}/>
          <Route path='/editListing/:id' element={<EditProperty/>}/>
          <Route path='/inbox' element={<Inbox/>}/>
        </Routes> 
      </Router>
    </UserContext.Provider>
  )
}

export default App;