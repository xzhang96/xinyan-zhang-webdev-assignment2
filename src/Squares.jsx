import React from 'react';
import { connect } from 'react-redux';
import './index.css';

class Squares extends React.Component {

    switchColorOnClick() {
        let c = document.getElementById(this.props.id);
        if (this.props.status < 1) {
            this.props.clickFunc(1, this.props.id[0], this.props.id[1]);
            // c.style.backgroundColor = "black";
        } else {
            this.props.clickFunc(0, this.props.id[0], this.props.id[1]);
            // c.style.backgroundColor = "white";
        }
    }

    numToColor(num, heatmap) {
        const gradient_arr = ["FFFFFF","FFFBC9","FFF894","FFF45E","FFF129","FAC922","F6A21B","F27B14","ED530D","E92C06","E50500"];
        if (heatmap) {
            let perc = num * 10;
            return "#" + gradient_arr[perc];
        } else {
            if (num === 1) {
                return "black";
            } else {
                return "white";
            }
        }
        
    }


    render() {
        let backgroundColor = this.numToColor(this.props.status, this.props.heatmap);
        return (
            <div>
                <div className="square" style={{backgroundColor: backgroundColor}} id={this.props.id} onClick={() => this.switchColorOnClick()}>

                </div> 
            </div>
            
        )
    }
}


export default Squares;

// export default function Squares({id, status, clickFunc}) {
//     function handleClick() {
//         let c = document.getElementById(id);
//         if (status === "white") {
//             clickFunc(1, id[0], id[1]);
//             c.style.backgroundColor = "black";
//         } else {
//             clickFunc(0, id[0], id[1]);
//             c.style.backgroundColor = "white";
//         }
//     }

//     return (
//         <div className="square" style={{backgroundColor: status}} id={id} onClick={handleClick}></div>
//     )
// }