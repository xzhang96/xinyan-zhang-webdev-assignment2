import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';


export default function Navigation(){
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">Conway's Game of Life</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
            </Nav>
        </Navbar>
    );
}