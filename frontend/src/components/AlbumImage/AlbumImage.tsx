import { useMediaQuery, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';

interface AlbumImageProps {
  imgsrc: string
}

const AlbumImage: React.FC<AlbumImageProps> = (props) => {
  
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  console.log(matches);

  const [fade, setFade] = useSpring(() => ({ opacity: 0, width:"130%"}));
  const [img, setImage] = useState("");

  useEffect(() => {
    setImage(props.imgsrc);
    setFade.start({
      to: { opacity: 1 },
      from: { opacity: 0 },
      config: {
        duration: 1500,
      }
    });
  }, [props.imgsrc, setFade]);

  return (
    <animated.img style={fade} src={img} />
  )
}

export default AlbumImage;
