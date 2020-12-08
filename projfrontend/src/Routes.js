import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";

import Home from "./core/Home"
import Signup from "./user/Signup"
import PrivateRoutes from "./auth/helper/privateRoutes";
import UserDashboared from "./user/UserDashboared";
import Signin from "./user/Signin";
import Cart from "./core/Cart";


const Routes =() => {
    return (
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component ={Home}/>
            <Route path="/signup" exact component ={Signup}/>
            <Route path="/signin" exact component ={Signin}/>
            <Route path="/cart" exact component ={Cart}/>

            <PrivateRoutes path ="/user/dashboard" exact component={UserDashboared}/>
        </Switch>
        </BrowserRouter>
    )
}

export default Routes;