import React from 'react';
import { Box, Grid } from '@material-ui/core';
import AlbumImage from '../AlbumImage/AlbumImage'
import axios from 'axios';
import useInterval from '../../hooks/useInterval';
import AlbumInfo from '@components/AlbumInfo/AlbumInfo';

const AlbumCover: React.FC = () => {

  const [image, setImage] = React.useState("");
  const [albumInfo, setAlbumInfo] = React.useState({
    song_title: "",
    album_name: "",
    artist_name: "",
    release_date: "",
    popularity: "",
  });

  useInterval(
    async () => {
      const response = await axios({
        url: '/api/currentsong',
        method: 'GET'
      }).then(response => response.data);
      //Only udpate if the currently playing song is different to what we're currently displaying
      if (response.song_title !== albumInfo.song_title) {
        setImage(response.album_art);
        setAlbumInfo(response);
      } else {
      }
    },
    1000,
  );

  return (
    <div style={{ paddingTop: '8em' }}>
      <Grid
        className="responsive"
        container
        spacing={3}
        alignContent="center"
      >
        <Grid item xs />
        <Grid item xs={6}>
          <Box>
            <div style={{display:"flex", justifyContent: "center"}}>
            <AlbumImage imgsrc={image} />
            </div>
          </Box>
          <Box>
            <AlbumInfo
              songTitle={albumInfo.song_title}
              albumName={albumInfo.album_name}
              artistName={albumInfo.artist_name}
              releaseDate={albumInfo.release_date}
              popularity={albumInfo.popularity}
            />
          </Box>
        </Grid>
        <Grid item xs />
      </Grid>
    </div >
  )
};


export default AlbumCover;