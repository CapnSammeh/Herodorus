import React from "react";
import ReactDOM from "react-dom";
import AlbumInfo from "./components/AlbumInfo/AlbumInfo";
import AlbumCover from "./components/AlbumCover/AlbumCover";
import PageHeader from "./components/PageHeader/PageHeader";

import "./styles/styles.css"


ReactDOM.render(
    <React.StrictMode>
        <PageHeader />
        <AlbumCover /> 
        <AlbumInfo />
    </React.StrictMode>,
    document.getElementById("root")
);