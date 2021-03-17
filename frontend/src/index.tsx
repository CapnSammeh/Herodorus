import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import AlbumInfo from "@components/AlbumInfo/AlbumInfo";
import AlbumCover from "@components/AlbumCover/AlbumCover";
import PageHeader from "@components/PageHeader/PageHeader";

import '@styles/styles.css'
import App from "./App";

export const Entry: React.FC = () => {
    return (
        <BrowserRouter>
                <PageHeader />
                <App />
                <AlbumCover />
                <AlbumInfo />
        </BrowserRouter>
    )
}


ReactDOM.render(
    <Entry />,
    document.getElementById("root")
);