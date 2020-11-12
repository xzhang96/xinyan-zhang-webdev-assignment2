import React from 'react';
import './index.css';


export default function Squares({id, status, heatmap, clickFunc}) {
    const backgroundColor = numToColor(status, heatmap);
    
    function handleClick() {
        if (status < 1) {
            clickFunc(1, id[0], id[1]);
        } else {
            clickFunc(0, id[0], id[1]);
        }
    }

    function numToColor(num, heatmap) {
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

    return (
        <div className="square" style={{backgroundColor: backgroundColor}} onClick={handleClick}></div>
    )
}