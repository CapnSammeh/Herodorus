import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { setLogger } from 'react-query';

//Pages Import
import LoginPage from '@pages/LoginPage/LoginPage';

setLogger({
    log: console.log,
    warn: console.log,
    error: console.log,
});

const App: React.FC = () => {
    return (
        <Switch>
            <Route path="/login">
                <LoginPage />
            </Route>
        </Switch>
    )
}


export default App;