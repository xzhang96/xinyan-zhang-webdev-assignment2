import React, { useState } from 'react';
import { connect } from 'react-redux';
import Navigation from './Navigation';
import Squares from './Squares';
import { useParams, withRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: this.createGrid(),
            start: null,
            freq: 1000,
            heatmap: false,
        }
    }
    
    createGrid() {
        let table = [];
        for (let i = 0; i < this.props.match.params.height; i++) {
            let children = []
            for (let j = 0; j < this.props.match.params.width; j++) {
                let rand = Math.random();
                if (rand <= 0.1) {
                    children.push(1);
                } else {
                    children.push(0)
                }
            }
            table.push(children)
        }
        return table
    }

    countAlive() {
        let count = 0;
        this.state.grid.map((row) => {
            return row.map((cell) => {
                if (cell === 1) {
                    count = count + 1;
                }
                return count;
            })
        })
        return count;
    }

    handleClick(alive, h, w) {
        if (this.state.start === null) {
            let cur_grid = this.state.grid;
            cur_grid[h][w] = alive;
            this.setState({
                grid: cur_grid,
            })
        }
    }

    nextGen() {
        let cur_grid = this.cloneGrid(this.state.grid);
        let height = this.props.match.params.height;
        let width = this.props.match.params.width;
        let neighbors = this.countNeighbors();

        for (let x = 0; x < height; x++) {
            for (let y = 0; y < width; y++) {
                let neighbor = neighbors[x][y];
                let cell = this.state.grid[x][y];
                if (this.state.heatmap) {
                    if (cell === 1 && (neighbor < 2 || neighbor > 3)) {
                        cur_grid[x][y] = Math.round((cell - 0.1) * 100) / 100;
                    } else if (cell < 1 && neighbor === 3) {
                        cur_grid[x][y] = 1;
                    } else if (cell < 1 && cell > 0) {
                        cur_grid[x][y] = Math.round((cell - 0.1) * 100) / 100;
                    }
                } else {
                    if (cell === 1 && (neighbor < 2 || neighbor > 3)) {
                        cur_grid[x][y] = 0;
                    } else if (cell === 0 && neighbor === 3) {
                        cur_grid[x][y] = 1;
                    }
                }
                
            }
        }
        this.setState({
            grid: cur_grid,
        })
    }

    cloneGrid(original) {
        let result = [];
        for (let i = 0; i < original.length; i++) {
            result.push(Array.from(original[i]));
        }
        return result;
    }

    countNeighbors() {
        let cur_grid = this.state.grid;
        let height = this.props.match.params.height;
        let width = this.props.match.params.width;
        let neighbors = [];

        for (let x = 0; x < height; x++) {
            neighbors[x] = [];
            for (let y = 0; y < width; y++) {
                if (x === 0) {
                    if (y === 0) {
                        neighbors[x].push(cur_grid[x][y+1] + cur_grid[x+1][y] + cur_grid[x+1][y+1]);
                    } else if (y === width - 1) {
                        neighbors[x].push(cur_grid[x][y-1] + cur_grid[x+1][y-1]+ cur_grid[x+1][y]);
                    } else {
                        neighbors[x].push(cur_grid[x][y-1] + cur_grid[x+1][y-1] + cur_grid[x+1][y] + cur_grid[x][y+1] + cur_grid[x+1][y+1]);
                    }
                } else if (x === height - 1) {
                    if (y === 0) {
                        neighbors[x].push(cur_grid[x-1][y] + cur_grid[x-1][y+1] + cur_grid[x][y+1]);
                    } else if (y === width - 1) {
                        neighbors[x].push(cur_grid[x-1][y-1] + cur_grid[x][y-1] + cur_grid[x-1][y]);
                    } else {
                        neighbors[x].push(cur_grid[x-1][y-1] + cur_grid[x][y-1] + cur_grid[x-1][y] + cur_grid[x-1][y+1] + cur_grid[x][y+1]);
                    }
                } else if (y === 0) {
                    if (x > 0 && x < height - 1) {
                        neighbors[x].push(cur_grid[x-1][y] + cur_grid[x+1][y] + cur_grid[x-1][y+1] + cur_grid[x][y+1] + cur_grid[x+1][y+1]);
                    }
                } else if (y === width - 1) {
                    if (x > 0 && x < height - 1) {
                        neighbors[x].push(cur_grid[x-1][y-1] + cur_grid[x][y-1] + cur_grid[x+1][y-1] + cur_grid[x-1][y] + cur_grid[x+1][y]);
                    }
                } else {
                    neighbors[x].push(cur_grid[x-1][y-1] + cur_grid[x][y-1] + cur_grid[x+1][y-1] + cur_grid[x-1][y] + cur_grid[x+1][y] + cur_grid[x-1][y+1] + cur_grid[x][y+1] + cur_grid[x+1][y+1]);
                }
            }
        }
        return neighbors;
    }

    onStart() {
        let id = setInterval(() => this.nextGen(), this.state.freq);
        this.setState({
            start: id
        })
    }

    setFreq = (e) => {
        e.preventDefault();
        if (this.state.start === null) {
            if (e.target.freq.value >= 50 && e.target.freq.value <= 2000) {
                this.setState({
                    freq: e.target.freq.value
                })
                e.target.freq.value = null;
            } else {
                alert("Frequency must be between 50 and 2000 ms");
            }
        }
    }

    onPause() {
        clearInterval(this.state.start);
        this.setState({
            start: null,
        })
    }

    onReset() {
        window.location.reload();
    }

    onHeatMap = (e) => {
        this.setState({
            heatmap: e.target.checked
        })
    }

    render () {
        return (
            <>
                <Navigation />
                <Jumbotron fluid className="title"><h1>Conway's Game of Life</h1></Jumbotron>
                <Container>
                    <Form onSubmit={this.setFreq}>
                        <Form.Group as={Row}>
                            <Col sm="2"/>
                            <Col sm="2">
                                <Form.Label>Frequency: </Form.Label>
                            </Col>
                            <Col sm="4">
                                <Form.Control type="text" id="freq"/>
                            </Col>
                            <Col sm="1"><Button type="submit">Update</Button></Col>
                            <Col sm="3"/>
                        </Form.Group>
                    </Form>
                    <Button variant="success" onClick={() => this.onStart()}>Start</Button>{" "}
                    <Button variant="danger" onClick={() => this.onPause()}>Pause</Button>{" "}
                    <Button onClick={() => this.onReset()}>Reset</Button>
                </Container>
                
                <br/>
                <Form style={{textAlign: "center"}}>
                    <h3>Living Cells: {this.countAlive()}</h3>
                    <Form.Check inline label="Heatmap" id="heatmap" onChange={this.onHeatMap}></Form.Check>
                </Form>
                <br/>
                <div className="mygrid">
                    {
                        this.state.grid.map((row, heightIndex) => 
                            <div className='grid-row'> {row.map((cell, widthIndex) => 
                                <Squares status={cell} heatmap={this.state.heatmap} id={[heightIndex, widthIndex]} clickFunc={(a, x, y) => this.handleClick(a, x, y)} />
                            )}</div>
                        )
                    }

                    {/* {
                        this.state.grid.map(function(row, heightIndex) {
                            return <div className="row"> 
                                {row.map(function(cell, widthIndex) {
                                    let status = "";
                                    if (cell === 1) {
                                        status = "black";
                                    } else {
                                        status = "white";
                                    }
                                    return <Squares status={status} id={[heightIndex, widthIndex]} clickFunc={(a, x, y) => this.handleClick(a, x, y)} />
                                })}
                            </div>
                        } 
                            
                        )
                    } */}

                </div>
            </>
        )
    }
}

// function mapStateToProps(state, props) {
//     return {
//         grid: state.grid,
//     }
// };

// function mapDispatchToProps() {

// }

export default withRouter((Grid));


// export default function Grid() {
//     let params = useParams();
//     const [count, setCount] = useState(0);
//     const [grid, setGrid] = useState(() => createGrid());
//     const [start, setStart] = useState(null);
//     const [freq, setFreq] = useState(1000);
//     const [totalNeighbors, setTotalNeighbors] = useState(() => countNeighbors());
//     const [timer, setTimer] = useState(0);
//     const [isActive, setIsActive] = useState(false);
//     const [isPaused, setIsPaused] = useState(false);
//     const autoRef = useRef(null);
    

//     function createGrid() {
//         let table = [];
//         let count = 0;
//         for (let i = 0; i < params.height; i++) {
//             let children = []
//             for (let j = 0; j < params.width; j++) {
//                 let rand = Math.random();
//                 if (rand <= 0.05) {
//                     children.push(1);
//                     count += 1;
//                 } else {
//                     children.push(0)
//                 }
//             }
//             table.push(children)
//         }
//         setCount(count);
//         return table
//     }

//     function handleClick(alive, h, w) {
//         let cur_grid = cloneGrid(grid);
//         cur_grid[h][w] = alive;
//         if (alive === 1) {
//             setCount(count+1);
//         } else {
//             setCount(count-1);
//         }
//         setGrid(cur_grid);
//     }

//     function cloneGrid(original) {
//         let result = [];
//         for (let i = 0; i < original.length; i++) {
//             result.push(Array.from(original[i]));
//         }
//         return result;
//     }

//     function onStart() {
//         setIsActive(true);
//         setIsPaused(true);
//         autoRef.current = setInterval(() => {
//             recountNeighbors();
//             console.log(["start", totalNeighbors]);
//             nextGen();
//         }, 1000)
//     }

//     function submitFreq(e) {
//         e.preventDefault();
//         if (start === null) {
//             if (e.target.freq.value >= 50 && e.target.freq.value <= 2000) {
//                 setFreq(e.target.freq.value);
//                 e.target.freq.value = null;
//             } else {
//                 alert("Frequency must be between 50 and 2000 ms");
//             }
//         }
//     }

//     function onPause() {
//         clearInterval(autoRef.current);
//         setIsPaused(false);
//     }

//     function onReset() {
//         window.location.reload();
//     }

//     function nextGen() {
//         let cur_grid = cloneGrid(grid);
//         let height = params.height;
//         let width = params.width;
//         let c = count;

//         console.log(["nextgen", totalNeighbors]);

//         for (let x = 0; x < height; x++) {
//             for (let y = 0; y < width; y++) {
//                 let neighbor = totalNeighbors[x][y];
//                 let cell = grid[x][y];
//                 if (cell === 1 && (neighbor < 2 || neighbor > 3)) {
//                     cur_grid[x][y] = 0;
//                     c -= 1;
//                 } else if (cell === 0 && neighbor === 3) {
//                     cur_grid[x][y] = 1;
//                     c += 1;
//                 }
//             }
//         }
//         setGrid(cur_grid);
//         setCount(c);
//     }

//     function countNeighbors() {
//         let cur_grid = cloneGrid(grid);
//         let height = params.height;
//         let width = params.width;
//         let neighbors = [];
//         console.log(["original", cur_grid])
//         for (let x = 0; x < height; x++) {
//             neighbors[x] = [];
//             for (let y = 0; y < width; y++) {
//                 if (x === 0) {
//                     if (y === 0) {
//                         neighbors[x].push(cur_grid[x][y+1] + cur_grid[x+1][y] + cur_grid[x+1][y+1]);
//                     } else if (y === width - 1) {
//                         neighbors[x].push(cur_grid[x][y-1] + cur_grid[x+1][y-1]+ cur_grid[x+1][y]);
//                     } else {
//                         neighbors[x].push(cur_grid[x][y-1] + cur_grid[x+1][y-1] + cur_grid[x+1][y] + cur_grid[x][y+1] + cur_grid[x+1][y+1]);
//                     }
//                 } else if (x === height - 1) {
//                     if (y === 0) {
//                         neighbors[x].push(cur_grid[x-1][y] + cur_grid[x-1][y+1] + cur_grid[x][y+1]);
//                     } else if (y === width - 1) {
//                         neighbors[x].push(cur_grid[x-1][y-1] + cur_grid[x][y-1] + cur_grid[x-1][y]);
//                     } else {
//                         neighbors[x].push(cur_grid[x-1][y-1] + cur_grid[x][y-1] + cur_grid[x-1][y] + cur_grid[x-1][y+1] + cur_grid[x][y+1]);
//                     }
//                 } else if (y === 0) {
//                     if (x > 0 && x < height - 1) {
//                         neighbors[x].push(cur_grid[x-1][y] + cur_grid[x+1][y] + cur_grid[x-1][y+1] + cur_grid[x][y+1] + cur_grid[x+1][y+1]);
//                     }
//                 } else if (y === width - 1) {
//                     if (x > 0 && x < height - 1) {
//                         neighbors[x].push(cur_grid[x-1][y-1] + cur_grid[x][y-1] + cur_grid[x+1][y-1] + cur_grid[x-1][y] + cur_grid[x+1][y]);
//                     }
//                 } else {
//                     neighbors[x].push(cur_grid[x-1][y-1] + cur_grid[x][y-1] + cur_grid[x+1][y-1] + cur_grid[x-1][y] + cur_grid[x+1][y] + cur_grid[x-1][y+1] + cur_grid[x][y+1] + cur_grid[x+1][y+1]);
//                 }
//             }
//         }
//         return neighbors;
//     }

//     function recountNeighbors() {
//         let n = countNeighbors();
//         console.log(["recount", n])
//         setTotalNeighbors(n);
//     }

//     return (
//         <div className="container">
//             <h1>Conway's History of Life</h1>
//             <h3>Living Cells: {count}</h3>
//             <form onSubmit={submitFreq}>
//                 <label for="freq">Frequency: </label>
//                 <input type="text" id="freq"/>
//                 <button type="submit">Update</button>
//             </form>
//             <br/><br/>
//             <button onClick={onStart}>Start</button>
//             <button onClick={onPause}>Pause</button>
//             <button onClick={onReset}>Reset</button>
//             <br/><br/>
//             {
//                 grid.map(function(row, heightIndex) {
//                     return <div className="row"> 
//                             {row.map(function(cell, widthIndex) {
//                                 let status = "";
//                                 if (cell === 1) {
//                                     status = "black";
//                                 } else {
//                                     status = "white";
//                                 }
//                                 return <Squares status={status} id={[heightIndex, widthIndex]} clickFunc={handleClick} />
//                             })}
//                         </div>
//                 }    
//                 )
//             }
//         </div>
//     )
// }
