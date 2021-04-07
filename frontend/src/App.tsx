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
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/art_page" component={ArtPage}/>
            <Route path="/logout" component={() => {
                window.location.href="/api/logout";
                return null;
            }}/>
        </Switch>
    )
}


export default App;