import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'

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
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group as={Row}>
                        <Col sm="2"/>
                        <Col sm="2">
                            <Form.Label>Height: </Form.Label>
                        </Col>
                        <Col sm="6">
                            <Form.Control type="text" id="height"/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Col sm="2"/>
                        <Col sm="2">
                            <Form.Label>Width: </Form.Label>
                        </Col>
                        <Col sm="6">
                            <Form.Control type="text" id="width"/>
                        </Col>
                    </Form.Group>
                    <Button type="submit">Submit</Button>
                </Form>
            </>
        );
    }
}

// let mapDispatchToProps = function(dispatch, props) {
//     return {
//         setSize: (height, width) => {dispatch({
//             type: "SET_SIZE",
//             height: height,
//             width: width
//         })}
//     }
// }

export default withRouter((InputForm));