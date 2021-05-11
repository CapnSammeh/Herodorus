import React from 'react';
import "./AlbumInfo.css";
import { CardContent, Card, Typography, Box } from '@material-ui/core';
import Rating from "@material-ui/lab/Rating"

type albumInfoProps = {
    songTitle: string,
    albumName: string,
    artistName: string,
    releaseDate: string,
    popularity: string,
}

const AlbumInfo: React.FC<albumInfoProps> = (props) => {   
    return (
        <Box className="box">
            <Card variant="outlined" className="card">
                <CardContent>
                    <Typography variant="h4" color="textPrimary">
                        {props.songTitle}
                    </Typography>
                    <Typography variant="h5" color="textPrimary">
                        {props.albumName}
                    </Typography>
                    <Typography variant="h5" color="textPrimary">
                        {props.artistName}
                    </Typography>
                    <Typography variant="h5" color="textPrimary">
                        {props.releaseDate}
                    </Typography>
                    <Rating
                        name="popularity"
                        value={parseInt(props.popularity)}
                        disabled
                        precision={0.5}
                        size="large"
                    />
                </CardContent>
            </Card>
        </Box>
    )
}

export default AlbumInfo;