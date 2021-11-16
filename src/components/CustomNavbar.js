import React from 'react';
import {Link} from 'react-router-dom';
import {Container, Navbar, Nav} from "react-bootstrap";
import '../styles/CustomNavbar.css';


function CustomNavbar() {
    return (
        <>
            <Navbar bg="light" expand="lg" id="customNavbar">
                <Container>
                    <Navbar.Brand>Covid App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Link to='/'>Homepage</Link>
                            <Link to='/statistics'>Statistics</Link>
                            <Link to='/predictions'>Predictions</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default CustomNavbar;
