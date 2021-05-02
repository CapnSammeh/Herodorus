import React from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import BrushIcon from '@material-ui/icons/Brush';
import { IconButton } from '@material-ui/core';

const LoginButton: React.FC = () => {
  const [buttonText, setButtonText] = React.useState("");
  const [href, setHref] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/api/currentsongimage",
        {
          validateStatus: function () {
            return true; // default
          }
        })
        .then(response => response.status)
      if (result != 200) {
        setButtonText("Login");
        setHref("/login");
      } else {
        //We're auth'd, so show the logout button
        console.log("Logged in!");
        setButtonText("Logout");
        setHref("/api/logout");
      }
    };
    fetchData();
  }, [setButtonText]);

  return (
    <>
      <IconButton edge="start" color="inherit" aria-label="menu" href="/art_page">
        <BrushIcon />
      </IconButton>
      <Button color="inherit" href={href}>{buttonText}</Button>
    </>
  )
};

export default LoginButton;
