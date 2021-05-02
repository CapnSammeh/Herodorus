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

  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <AlbumImage imgsrc={image} />
      <AlbumInfo
        songTitle={albumInfo.song_title}
        albumName={albumInfo.album_name}
        artistName={albumInfo.artist_name}
        releaseDate={"Release Date: " + albumInfo.release_date}
        popularity={"Popularity: " + albumInfo.popularity}
      />
    </Box>
  )
};



export default AlbumCover;

