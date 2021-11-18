import './App.css';
import React from 'react'
import CustomNavbar from "./components/CustomNavbar";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Container, Row, Col} from "react-bootstrap";
import Home from './pages/Home'
import Statistics from './pages/Statistics'
import Predictions from './pages/Predictions'


const App = () => {
    return (
        <>
            <Router>
                <CustomNavbar/>
                <Routes>
                    <Route exact path='/' element={<Home/>}/>
                    <Route path='/statistics' element={<Statistics/>}/>
                    <Route path='/predictions' element={<Predictions/>}/>
                </Routes>
            </Router>
        </>

    );
}

export default App;
