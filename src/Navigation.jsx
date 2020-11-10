import React from 'react';
import { NavLink } from 'react-router-dom';

class Navigation extends React.Component {
    render() {
        return (
            <div className="nav">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/hello/jane">Hello</NavLink>
            </div>
        );
    }
}

export default Navigation;