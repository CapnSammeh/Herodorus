import React from 'react';
// import AlbumInfo from "@components/AlbumInfo/AlbumInfo";
import AlbumCover from "@components/AlbumCover/AlbumCover";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const ArtPage: React.FC = () => {
  const [auth, setAuth] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/api/currentsongimage",
        {
          validateStatus: function () {
            return true; // default
          }
        })
        .then(response => response.status)
      if (result == 200) {
        setAuth(true);
      } else {
        setAuth(false);
      }
    }
    fetchData();
  }, []);

  if(auth == true){
    return (
      <AlbumCover />
    );
  } else {
    return (
      <Redirect to="/login" />
    )
  }

}

export default ArtPage;
