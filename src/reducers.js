import { combineReducers } from 'react';

const initState = {
    formValues: {height: 10, width: 10},
};

function reducer(state=initState, action) {
    switch (action.type) {
        case "SET_VALUES":
            return {
                ...state,
                formValues: action.payload
            };
            
        default:
            return state;
    }
};

export default reducer;