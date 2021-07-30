import React, { useState, useEffect } from 'react'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import MainPage from './components/pages/MainPage'
import CoinPage from './components/pages/CoinPage'
import Navbar from './components/Navbar/Navbar'
import './App.css'

function App() {

    return (
        <Router>
            <Navbar />
            <Switch>
            <Route path='/' exact component={MainPage} />
            <Route path='/coinPage' exact component={CoinPage} />
            </Switch>
        </Router>
        
    )
}

export default App
