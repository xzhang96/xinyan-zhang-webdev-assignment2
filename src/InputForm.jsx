import React from 'react';
import { withRouter } from 'react-router-dom';

class InputForm extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        let getHeight = e.target.height.value;
        let getWidth = e.target.width.value;
        if (getHeight >= 10 && getHeight <= 100 && getWidth >= 10 && getWidth <= 100) {
            let path = `grid/${getHeight}/${getWidth}`;
            this.props.history.push(path);
        } else {
            alert("Invalid size!")
        }
        
    };

    render() {
        return (
            <>
                <form className="form" onSubmit={this.handleSubmit}>
                    <label for="height">Height: </label>
                    <input type="text" id="height"/>
                    <br/><br/>
                    <label for="width">Width: </label>
                    <input type="text" id="width"/>
                    <br/><br/>
                    <button type="submit">Submit</button>
                </form>
            </>
        );
    }
}

export default withRouter(InputForm);