import React from 'react';
import './index.css';

class Squares extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            alive: props.status,
        }
    }

    switchColorOnClick() {
        let c = document.getElementById(this.state.id);
        if (this.state.alive === 0) {
            this.props.clickFunc(1, this.state.id[0], this.state.id[1]);
            c.style.backgroundColor = "black";
            this.setState({
                alive: 1
            })
        } else {
            this.props.clickFunc(0, this.state.id[0], this.state.id[1]);
            c.style.backgroundColor = "white";
            this.setState({
                alive: 0
            })
        }
    }


    render() {
        let backgroundColor = "white";
        if (this.props.status === 1) {
            backgroundColor = "black";
        }
        return (
            <div>
                <div className="square" style={{backgroundColor: backgroundColor}} id={this.state.id} onClick={() => this.switchColorOnClick()}>

                </div> 
            </div>
            
        )
    }
}

export default Squares