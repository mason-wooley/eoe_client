import React, {useCallback, useEffect, useState} from "react";
import {Route, Switch } from 'react-router-dom';
import Navigation from "./components/navigation.js";
import Home from './views/home.js';
import About from './views/about.js';
import Apply from './views/apply.js';
import Applications from './views/applications.js';
import ProtectedRoute from './auth/protected_route.js';
import AuthUser from './contexts/auth_user.js';
import {useAuth0} from '@auth0/auth0-react';
import Error from './components/error.js';

function App() {
    const [user, setUser] = useState({
        validated: false,
        permissions: []
    });

    const {getAccessTokenSilently} = useAuth0();

    const fetchCredentials = useCallback(async () => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch("/api/get-permissions", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const responseData = await response.json();
            setUser({...user, validated: true, permissions: responseData});
        } catch(error) {
            // Ignore errors that aren't login errors
            if (error.message !== "Login required")
                console.log(error);
        }
    }, [getAccessTokenSilently, user.validated])

    useEffect(() => {
        fetchCredentials();
    }, [user.validated]);

    return (
        <div className="App">
            <AuthUser.Provider value={[user, setUser]}>
                <Navigation />
                <Switch>
                    <Route exact path="/" component={() => <Home />} />
                    <Route exact path="/about" component={() => <About />} />
                    <Route exact path="/apply" component={() => <Apply />} />
                    <ProtectedRoute exact path="/applications" component={() => <Applications />} />
                    <Route path="*" component={() => <Error />} />
                </Switch>
            </AuthUser.Provider>
        </div>
    );
}

export default App;
