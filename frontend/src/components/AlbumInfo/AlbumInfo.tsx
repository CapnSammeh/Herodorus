import React from 'react';
import "./AlbumInfo.css";
import { CardContent, Card, Typography, Box } from '@material-ui/core';
import Star from "@material-ui/icons/Star";
import StarBorder from "@material-ui/icons/StarBorder";
import Rating from 'react-rating';

type albumInfoProps = {
    songTitle: string,
    albumName: string,
    artistName: string,
    releaseDate: string,
    popularity: string,
}

const AlbumInfo: React.FC<albumInfoProps> = (props) => {
    const popularityValue = Math.ceil(parseInt(props.popularity)/20);
    console.log(props.releaseDate);
    console.log("Popularity: " + popularityValue + "/5");

    const releaseDate = new Date(props.releaseDate).toLocaleDateString();    

    return (
        <Box className="box">
            <Card variant="outlined" className="card">
                <CardContent>
                    <Typography variant="h2" color="textPrimary">
                        {props.songTitle}
                    </Typography>
                    <Typography variant="h6" color="textPrimary">
                        {props.albumName}
                    </Typography>
                    <Typography variant="h5" color="textPrimary">
                        {props.artistName}
                    </Typography>
                    <br />
                    <Typography variant="h5" color="textPrimary">
                        {"Released: " + releaseDate}
                    </Typography>
                    <Rating
                        start={0}
                        stop={5}
                        fractions={2}
                        readonly
                        emptySymbol={<StarBorder />}
                        fullSymbol={<Star />}
                        initialRating={popularityValue}
                    />
                </CardContent>
            </Card>
        </Box>
    )
}

export default AlbumInfo;