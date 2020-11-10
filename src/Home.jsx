import React from 'react';
import InputForm from './InputForm';

export default class Home extends React.Component {
    render() {
        return (
            <div className="home">
                <h2>Welcome to Conway's History of Life, please enter the size of your grid!</h2>
                <InputForm></InputForm>
            </div>
        );
    }
}
