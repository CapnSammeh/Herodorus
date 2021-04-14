import React from 'react';
import { makeStyles } from '@material-ui/core';

interface AlbumImageProps {
  imgsrc: string
}

const useStyles = makeStyles(() => ({
  img: {
    margin: 'auto',
    objectFit: 'contain',
    userSelect: 'none',
  },
}))

function flipImage(e:React.MouseEvent){
  //TODO: Put some fancy transform here so the element flips
  alert("You clicked me!" + e.type);
}

const AlbumImage: React.FC<AlbumImageProps> = (props) => {
  const { imgsrc } = props;
  const classes = useStyles();
  return (
    <img
       
      className = {classes.img} 
      src = {imgsrc} 
      onClick = {e => flipImage(e)}
    />
  )
};

export default AlbumImage;
