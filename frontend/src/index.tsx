
import React from "react";
import ReactDOM from "react-dom";
import { AlbumInfo } from "./components/album_information";

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
        <AlbumInfo />
    </React.StrictMode>,
    document.getElementById("root")
);