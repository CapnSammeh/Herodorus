import React from 'react';
import "./AlbumInfo.css";
import { CardContent, Card, Typography, Box } from '@material-ui/core';

const AlbumInfo: React.FC = () => {
    return (
        // <div className="albumInfo">
        //     <div className="flex-1 text-center p-10">
        //         <h1 id="artist_name" className="font-black text-4xl">Artist Name</h1>
        //         <h2 id="album_name" className="font-light text-2xl">Album Name</h2>
        //         <h2 id="label_name" className="font-bold text-3xl">Label Name</h2>
        //         <h4 id="realease_date" className="font-extralight text-xl">Release Date</h4>
        //         <h4 id="total_plays" className="font-extralight text-xl">Total Spotify Plays</h4>
        //     </div>
        // </div>
        <Box className="box">
            <Card variant="outlined" className="card">
                <CardContent>
                    <Typography variant="h4" color="textPrimary">
                        Artist Name
                    </Typography>
                    <Typography variant="h5" color="textPrimary">
                        Album Name
                    </Typography>
                    <Typography variant="h5" color="textPrimary">
                        Label Name
                    </Typography>
                    <Typography variant="h5" color="textPrimary">
                        Release Date
                    </Typography>
                    <Typography variant="h5" color="textPrimary">
                        Total Plays
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}

export default AlbumInfo;