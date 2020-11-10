import React from 'react';
import { connect } from 'react-redux';
import Navigation from './Navigation';
import Squares from './Squares';
import { withRouter } from 'react-router-dom';

class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: this.createGrid(),
            start: null,
            freq: 1000,
        }
    }
    
    createGrid() {
        let table = [];
        let count = 0;
        for (let i = 0; i < this.props.match.params.height; i++) {
            let children = []
            for (let j = 0; j < this.props.match.params.width; j++) {
                let rand = Math.random();
                if (rand <= 0.05) {
                    children.push(1);
                    count = count + 1;
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
        let cur_grid = this.state.grid;
        cur_grid[h][w] = alive;
        this.setState({
            grid: cur_grid,
        })
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
                if (cell === 1 && (neighbor < 2 || neighbor > 3)) {
                    cur_grid[x][y] = 0;
                } else if (cell === 0 && neighbor === 3) {
                    cur_grid[x][y] = 1;
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

    render () {
        return (
            <div className='container'>
                <Navigation />
                <h1>Conway's History of Life</h1>
                <h3>Living Cells: {this.countAlive()}</h3>
                <form onSubmit={this.setFreq}>
                    <label for="freq">Frequency: </label>
                    <input type="text" id="freq"/>
                    <button type="submit">Update</button>
                </form>
                
                <br/><br/>
                <button onClick={() => this.onStart()}>Start</button>
                <button onClick={() => this.onPause()}>Pause</button>
                <button onClick={() => this.onReset()}>Reset</button>
                <br/><br/>
                <div className="grid">
                    {
                        this.state.grid.map((row, heightIndex) => 
                            <div className='row'> {row.map((cell, widthIndex) => 
                                <Squares status={cell} id={[heightIndex, widthIndex]} clickFunc={(a, x, y) => this.handleClick(a, x, y)} />
                            )}</div>
                        )
                    }

                </div>
            </div>
        )
    }
}

// function mapStateToProps(state, props) {
//     return {
//         height: state.formValues.height,
//         width: state.formValues.width,
//     }
// };

export default withRouter(connect()(Grid));