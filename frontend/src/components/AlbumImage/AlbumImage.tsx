import React from 'react';
import { makeStyles } from '@material-ui/core';
import Image from 'material-ui-image';


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

function flipImage(e: React.MouseEvent) {
  //TODO: Put some fancy transform here so the element flips
  alert("You clicked me!" + e.type);
}

const AlbumImage: React.FC<AlbumImageProps> = (props) => {
  const { imgsrc } = props;
  return (
    <div style={{width: '600px', height: '600px'}}>
      <Image
        src={imgsrc}
        style={useStyles()}
        onClick={e => flipImage(e)}
        disableSpinner
      />
    </div>
  )
};

export default AlbumImage;
