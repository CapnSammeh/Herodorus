import React from 'react';
import "./AlbumInfo.css";
import { CardContent, Card, Typography, Box } from '@material-ui/core';

type albumInfoProps = {
    artistName: string,
    albumName: string,
    // labelName: String,
    // releaseDate: String,
    // totalPlays: String,
}

const AlbumInfo: React.FC<albumInfoProps> = (props) => {   
    return (
        <Box className="box">
            <Card variant="outlined" className="card">
                <CardContent>
                    <Typography variant="h4" color="textPrimary">
                        {props.artistName}
                    </Typography>
                    <Typography variant="h5" color="textPrimary">
                        {props.albumName}
                    </Typography>
                    {/* <Typography variant="h5" color="textPrimary">
                        {props.labelName}
                    </Typography> */}
                    {/* <Typography variant="h5" color="textPrimary">
                        {props.releaseDate}
                    </Typography>
                    <Typography variant="h5" color="textPrimary">
                        {props.totalPlays}
                    </Typography> */}
                </CardContent>
            </Card>
        </Box>
    )
}

export default AlbumInfo;