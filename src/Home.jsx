import React from 'react';
import InputForm from './InputForm';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Navigation from './Navigation';


export default function Home() {
    return (
        <>
        <Navigation/>
        <Jumbotron fluid className="title"><h1>Conway's Game of Life</h1></Jumbotron>
        <Container className="home">
            <h4>Welcome to Conway's Game of Life, please enter the size of your grid!</h4>
            <br/>
            <p>! We support grid sizes from (10x10) to (100x100) !</p>
            <InputForm></InputForm>
        </Container>
        </>
    );
}
