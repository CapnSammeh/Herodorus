import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';

interface AlbumImageProps {
  imgsrc: string
}

const AlbumImage: React.FC<AlbumImageProps> = (props) => {
  const [flipped, setFlipped] = useState(false);
  const [transform, setTransformation] = useSpring(() => ({
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  }))

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

  console.log(props);
  return (
    // <animated.img style={animation} src={props.imgsrc} onClick={e => flipImage(e)} />
    <div onClick={() => setTransformation(state => !state)}>
      <animated.div style={fade}>
        <img src={img} />
      </animated.div>
    </div>
  )
}

export default AlbumImage;
