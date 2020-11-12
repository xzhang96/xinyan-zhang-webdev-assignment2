import React from 'react';
import Container from 'react-bootstrap/Container';
import Navigation from './Navigation';
 
class About extends React.Component {
    render() {
        return (
            <>
            <Navigation/>
            <Container className="about">
                <h1>About</h1>
                <hr/>
                <h3>Conway's Game of Life Rules:</h3>
                <ul>
                    <li>A living cell with less than two living neighbors dies.</li>
                    <li>A living cell with two or three live neighbors lives.</li>
                    <li>A living cell with more than three live neighbors dies.</li>
                    <li>A dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</li>
                </ul>
                <br/>
                <h3>Usage:</h3>
                <ul>
                    <li>Grid size can be set in <a href="/">home</a> page. The minimum size allowed is 10 x 10, and the maximum size allowed is 100 x 100. The grid does not need to be a square.</li>
                    <li>The initial cells have 5% chance of being alive</li>
                    <li>On the grid page, you can start the simulation by clicking the <code>Start</code> button, and pause the simulation by clicking the <code>Pause</code> button.</li>
                    <li>The default frequency of the simulation is 1000ms, but you can set it using the text input on grid page. The allowed range for frequency is 50 ms to 2000 ms, and it can only be set when the simulation is not running.</li>
                    <li>The grid can also be displayed as a heatmap by checking the <code>heatmap</code> box on grid page. The alive cells are in <div className="red"></div> red. The color fades out when the cells die, and becomes <div className="white"></div> white after being dead for 10 generations.</li>
                    <li>When the simulation is not running, you can flip the state of the cell by clicking it.For example, clicking an alive cell will make it dead, and clicking a dead cell will make it alive.</li>
                    <li>Count of alive cells are display at the top of the grid.</li>
                </ul>
                <br/>
                <h3>Links:</h3>
                <ul>
                    <li>Website: </li>
                    <li>Github: </li>
                </ul>
            </Container>
            </>
        );
    }
}
 
export default About;