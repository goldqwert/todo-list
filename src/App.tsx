import React from 'react';
import { Route } from 'react-router-dom';
import Login from './Login/Login'
import Main from './Main'

class App extends React.Component {
    render = () => {
        return (<div>
            <Route path='/login' component={Login} />
            <Route exact path='/' component={Main} />
        </div>);
    }
}

export default App;
