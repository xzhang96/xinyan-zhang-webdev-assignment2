import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

class Navigation extends React.Component {
    render() {
        return (
            // <div className="nav">
            //     <NavLink to="/">Home</NavLink>
            //     <NavLink to="/about">About</NavLink>
            //     <NavLink to="/hello/jane">Hello</NavLink>
            // </div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">Conway's Game of Life</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/about">About</Nav.Link>
                </Nav>
            </Navbar>
        );
    }
}

export default Navigation;