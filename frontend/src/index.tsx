import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';

import '@styles/styles.css'
import App from "./App";
import PageHeader from "@components/PageHeader/PageHeader";

export const Entry: React.FC = () => {
    return (
        <BrowserRouter>
            <PageHeader />
            <App />
        </BrowserRouter>
    )
}


ReactDOM.render(
    <Entry />,
    document.getElementById("root")
);