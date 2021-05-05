import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import AlbumImage from '../AlbumImage/AlbumImage'
import axios from 'axios';
import useInterval from '../../hooks/useInterval';
import AlbumInfo from '@components/AlbumInfo/AlbumInfo';


const useStyles = makeStyles(() => ({
  box: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: '1vw',
    justifyContent: 'center'
  },
}));

const AlbumCover: React.FC = () => {
  const [image, setImage] = React.useState("");
  const [albumInfo, setAlbumInfo] = React.useState({
    song_id: "",
    spotify_song_id: "",
    song_title: "",
    artist_name: "",
    album_name: "",
    album_art: "",
    played_datetime: ""
  });

  useInterval(
    async () => {
      const response = await axios({
        url: '/api/currentsong',
        method: 'GET'
      }).then(response => response.data);
      //Only udpate if the currently playing song is different to what we're currently displaying
      if (response.spotify_song_id !== albumInfo.spotify_song_id) {
        setImage(response.album_art);
        setAlbumInfo(response);
      } else {
      }
    },
    1000,
  );

  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <AlbumImage imgsrc={image} />
      <AlbumInfo
        artistName={albumInfo.artist_name}
        albumName={albumInfo.album_name}         
        />
    </Box>
  )
};



export default AlbumCover;

