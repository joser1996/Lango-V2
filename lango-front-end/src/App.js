import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage"
import "./App.css"



const App = () => {

    return(
        <div className="app-container"> 
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact component={HomePage}/>
                    <Route path='/login' exact component={LoginPage} />
                </Switch>
            </BrowserRouter>
        </div>
    );

};

export default App;