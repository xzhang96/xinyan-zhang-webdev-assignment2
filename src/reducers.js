import { combineReducers } from 'redux';


function createGrid() {
    let table = [];
        for (let i = 0; i < this.props.match.params.height; i++) {
            let children = []
            for (let j = 0; j < this.props.match.params.width; j++) {
                let rand = Math.random();
                if (rand <= 0.05) {
                    children.push(1);
                } else {
                    children.push(0)
                }
            }
            table.push(children)
        }
        return table
}

// function switch(state = [2, [0,0]], action) {
//     if (action.cur_status === 1) {

//     }
// }

function gridManager(state = 0, action) {
    return state;
}

export default combineReducers({
    grid: gridManager
})