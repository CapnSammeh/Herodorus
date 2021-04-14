import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import AlbumImage from '../AlbumImage/AlbumImage'
import axios from 'axios';

const sendGetRequest = () => {
  return axios({
    url: '/api/currentsongimage',
    method: 'GET'
  }).then(response => {
    console.log(response.data);
    return response.data;
  }) 
}

const useStyles = makeStyles(() => ({
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    marginTop: '5vh',
    borderRadius: 10,
    heigh: "100vh",
  },
}));

const AlbumCover: React.FC = () => {
  const [image, setImage] = React.useState("");
  React.useEffect(() => {
    sendGetRequest().then(data => setImage(data));
  });
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <AlbumImage imgsrc={image} />
    </Box>
  )
};

export default AlbumCover;
