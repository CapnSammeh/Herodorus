import { Box, Button, Card, CardActions, CardHeader, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(() => ({
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    paddingTop: '20%',
  },

  card: {
    textAlign: 'center',
    minWidth: '60%',
    minHeight: '60%',
    padding: 25,
  },

  button_actions: {
    alignItems: 'center',
    display: 'inherit',
  }
}));

const LoginBox: React.FC = () => {
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <Card className={classes.card}>
        <CardHeader title="Sign in to Herodorus using your Spotify Account" />
        <Typography variant="body1" component="p">
          {"Herodorus uses your Spotify to access information specific to you, including your playlists, and what's currently playing."}
          <br />
          {"Here is where we'll put some additional information"}
        </Typography>
        <CardActions className={classes.button_actions}>
          <Button variant="contained" color="primary" onClick={() => { window.location.href = "/api/auth/spotify" }}>
            Sign in with Spotify
        </Button >
        </CardActions>
      </Card>
    </Box>
  )
}

export default LoginBox;