import React from 'react';
import InputForm from './InputForm';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Navigation from './Navigation';

export default class Home extends React.Component {
    render() {
        return (
            <>
            <Navigation/>
            <Jumbotron fluid className="title"><h1>Conway's Game of Life</h1></Jumbotron>
            <Container className="home">
                <h4>Welcome to Conway's Game of Life, please enter the size of your grid!</h4>
                <br/>
                <InputForm></InputForm>
            </Container>
            </>
        );
    }
}
