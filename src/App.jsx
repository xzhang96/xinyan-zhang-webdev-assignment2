import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Grid from './Grid';
import About from './About';

class App extends React.Component {
    
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/home" component={Home}/>
                        <Route exact path="/about" component={About}/>
                        <Route path="/grid/:height/:width" component={Grid}/>
                        <Route render={() => <h1>Page not found!</h1>}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;