import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import AlbumImage from '../AlbumImage/AlbumImage'

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
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <AlbumImage imgsrc="https://i.scdn.co/image/07c323340e03e25a8e5dd5b9a8ec72b69c50089d"/>
    </Box>
  )
};

export default AlbumCover;
