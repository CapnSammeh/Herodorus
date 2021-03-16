
import React from "react";
import ReactDOM from "react-dom";

import "./styles/styles.css"
export const Entry: React.FC = () => {
    return (
        <div>
            <h1>Hello World</h1>
        </div>
    )
}


ReactDOM.render(
    <React.StrictMode>
        <Entry />
    </React.StrictMode>,
    document.getElementById("root")
);