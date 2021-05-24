import React from "react";
import Login from "./Login/Login"
import NavBar from "./navBar/navBar";
import { Switch, Route } from "react-router-dom";
import { LOGIN_PATH, HOME_PATH, USER_PATH } from "../views";
import { useStateValue } from '../StateProvider';
import HomePage from "./homePage/homePage";


import Profile from "./Profile/Profile"


function MainContainer() {
    const [{ user }, dispatch] = useStateValue();
    console.log(user);
    return (
        <div className="app">
            <NavBar user={user} />
            {/* <UploadButton /> */}
            <Switch>
                
                    {!user ? (
                        <Login />
                    ) : (
                        <>
                        <Route path={LOGIN_PATH} exact={true}></Route>
                            <Route path={HOME_PATH} exact={true}>
                                <HomePage user={user} />
                            </Route>
                            <Route path={USER_PATH} exact={true}>
                                <Profile />
                            </Route>
                        </>
                    )}
                

            </Switch>
        </div>
    );
}

export default MainContainer;