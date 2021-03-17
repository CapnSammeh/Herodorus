import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { setLogger } from 'react-query';

//Pages Import
import LoginPage from '@pages/LoginPage/LoginPage';
import ArtPage from '@pages/ArtPage/ArtPage';

setLogger({
    log: console.log,
    warn: console.log,
    error: console.log,
});

const App: React.FC = () => {
    return (
        <Switch>
            <Route exact path="/login">
                <LoginPage />
            </Route>
            <Route exact path="/">
                <ArtPage />
            </Route>
        </Switch>
    )
}


export default App;