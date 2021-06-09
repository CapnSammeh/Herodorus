import React from 'react';
import "./AlbumInfo.css";
import { CardContent, Card, Typography } from '@material-ui/core';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from "@material-ui/core/styles";
import UseMediaQuery from "@material-ui/core/useMediaQuery";
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

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const AlbumInfo: React.FC<albumInfoProps> = (props) => {
    const popularityValue = Math.ceil(parseInt(props.popularity) / 20);
    console.log(props.releaseDate);
    console.log("Popularity: " + popularityValue + "/5");

    const releaseDate = new Date(props.releaseDate).toLocaleDateString();
    const matches = UseMediaQuery('(min-width:600px)');
    console.log(matches);
    return (
        <div style={{ justifyContent: "center", marginTop: "1em" }}>
            <Card variant="outlined" className="card">
                <CardContent>
                    <ThemeProvider theme={theme}>
                        <Typography variant="h4" color="textPrimary">
                            {props.songTitle}
                        </Typography>
                        <Typography variant="h5" color="textPrimary">
                            {props.albumName}
                        </Typography>
                        <Typography variant="h6" color="textPrimary">
                            {props.artistName}
                        </Typography>
                        <Typography variant="h6" color="textPrimary">
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
                    </ThemeProvider>
                </CardContent>
            </Card>
        </div>
    )
}

export default AlbumInfo;