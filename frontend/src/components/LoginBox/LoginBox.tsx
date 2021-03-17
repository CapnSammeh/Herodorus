import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'

const LoginBox: React.FC = () => {
  return (
    <div className="flex h-screen">
      <div className="m-auto w-1/2 text-center border">
        <h1>{"Sign in to Herodorus using your Spotify Account"}</h1>
        <br />
        <p>{"Herodorus uses your Spotify to access information specific to you, including your playlists, and what's currently playing."}</p>
        <p>{"Here is where we'll put some additional information"}</p>
        <br/>
        <button type="button" className="btn-outline-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border border-green-700 hover:bg-green-700 text-green-700 hover:text-white font-normal py-2 px-4 rounded">
          <FontAwesomeIcon icon={faMusic} className="mr-2"/>
          <span>
            Sign in with Spotify
          </span>
          <FontAwesomeIcon icon={faMusic} className="ml-2" />
        </button>
      </div>
    </div>
  )
};

export default LoginBox;