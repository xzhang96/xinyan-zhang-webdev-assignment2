import React, { useState, useEffect, useRef } from 'react';
import Navigation from './Navigation';
import Squares from './Squares';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'


export default function Grid() {
    let params = useParams();
    const height = params.height;
    const width = params.width;
    const [count, setCount] = useState(0);
    const [grid, setGrid] = useState(() => createGrid());
    const [freq, setFreq] = useState(1000);
    const [isActive, setIsActive] = useState(false);
    const autoRef = useRef(null);
    const [isHeatmap, setIsHeatmap] = useState(false);

    function createGrid() {
        let table = [];
        let count = 0;
        for (let i = 0; i < height; i++) {
            let children = []
            for (let j = 0; j < width; j++) {
                let rand = Math.random();
                if (rand <= 0.1) {
                    children.push(1);
                    count += 1;
                } else {
                    children.push(0)
                }
            }
            table.push(children)
        }
        setCount(count);
        return table
    }

    function handleClick(alive, h, w) {
        if (!isActive) {
            let cur_grid = cloneGrid(grid);
            cur_grid[h][w] = alive;
            if (alive === 1) {
                setCount(count+1);
            } else {
                setCount(count-1);
            }
            setGrid(cur_grid);
        }
    }

    function cloneGrid(original) {
        let result = [];
        for (let i = 0; i < original.length; i++) {
            result.push(Array.from(original[i]));
        }
        return result;
    }

    function toggle() {
        setIsActive(!isActive);
    }

    useEffect(() => {
        if (isActive) {
            autoRef.current = setInterval(() => {
                let cur_grid = cloneGrid(grid);
                let c = count;
                let n = countNeighbors(cur_grid, height, width);

                for (let x = 0; x < height; x++) {
                    for (let y = 0; y < width; y++) {
                        let neighbor = n[x][y];
                        let cell = grid[x][y];
                        if (isHeatmap) {
                            if (cell === 1 && (neighbor < 2 || neighbor > 3)) {
                                cur_grid[x][y] = Math.round((cell - 0.1) * 100) / 100;
                                c -= 1;
                            } else if (cell < 1 && neighbor === 3) {
                                cur_grid[x][y] = 1;
                                c += 1;
                            } else if (cell < 1 && cell > 0) {
                                cur_grid[x][y] = Math.round((cell - 0.1) * 100) / 100;
                            }
                        } else {
                            if (cell === 1 && (neighbor < 2 || neighbor > 3)) {
                                cur_grid[x][y] = 0;
                                c -= 1;
                            } else if (cell === 0 && neighbor === 3) {
                                cur_grid[x][y] = 1;
                                c += 1;
                            }
                        }
                    }
                }
                setGrid(cur_grid);
                setCount(c);
            }, freq);
        } else if (!isActive ) {
            clearInterval(autoRef.current);
            autoRef.current = null;
        }
        return () => clearInterval(autoRef.current);
    }, [isActive, grid, freq, count, height, width, isHeatmap]);

    function submitFreq(e) {
        e.preventDefault();
        if (autoRef.current === null) {
            if (e.target.freq.value >= 50 && e.target.freq.value <= 2000) {
                setFreq(e.target.freq.value);
                e.target.freq.value = null;
            } else {
                alert("Frequency must be between 50 and 2000 ms");
            }
        }
    }

    function countNeighbors(cur_grid, height, width) {
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

    return (
        <>
            <Navigation/>
            <Jumbotron fluid className="title"><h1>Conway's History of Life</h1></Jumbotron>
            <Container>
                <Form onSubmit={submitFreq}>
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
                <Button onClick={toggle}>{isActive ? 'Pause' : 'Start'}</Button>{" "}
                <Button onClick={() => {window.location.reload();}}>Reset</Button>
                
            </Container>
            
            <br/>
            <Form style={{textAlign: "center"}}>
                <h3>Living Cells: {count}</h3>
                <Form.Check inline label="Heatmap" id="heatmap" onChange={() => {setIsHeatmap(!isHeatmap)}}></Form.Check>
            </Form>
            <br/>
            <div className="mygrid">
                {
                    grid.map(function(row, heightIndex) {
                        return <div className="grid-row"> 
                                {row.map(function(cell, widthIndex) {
                                    return <Squares status={cell} heatmap={isHeatmap} id={[heightIndex, widthIndex]} clickFunc={handleClick} />
                                })}
                            </div>
                    }    
                    )
                }
            </div>
            
        </>
    )
}
