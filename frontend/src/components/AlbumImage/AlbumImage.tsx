import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';

interface AlbumImageProps {
  imgsrc: string
}

const AlbumImage: React.FC<AlbumImageProps> = (props) => {
  
  const [fade, setFade] = useSpring(() => ({ opacity: 0 }));
  const [img, setImage] = useState("");
  
  useEffect(() => {
    setImage(props.imgsrc);
    setFade.start({
      to: { opacity: 1 },
      from: { opacity: 0 },
      config: {
        duration: 1500
      }
    });
  }, [props.imgsrc, setFade]);

  return (
    <div onClick={() => alert("You clicked me!")}>
      <animated.div style={fade}>
        <img src={img} />
      </animated.div>
    </div>
  )
}

export default AlbumImage;
