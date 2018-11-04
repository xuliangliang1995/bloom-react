import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter ,Route,Switch ,Redirect} from 'react-router-dom';
import './index.css';
import App from './App';
import HomePage from './containers/HomePage/HomePage';
import Register from './containers/Register/Register';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
        <BrowserRouter>
            <Switch>
                <Redirect from={"/"} to={"/login"} exact/>
                <Route path={"/login"} component={App} exact/>
                <Route path={"/register"} component={Register}/>
                <Route path={"/home"} component={HomePage}/>
            </Switch>
        </BrowserRouter>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
