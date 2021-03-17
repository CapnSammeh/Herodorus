
import React from 'react';

export const AlbumInfo: React.FC = () => {
    return (
        <div className="flex space-x-3 bg-gray-400 mx-auto rounded-xl max-w-sm shadow-xl">
            <div className="flex-1 text-center p-10">
                <h1 id="artist_name" className="font-black text-4xl">Artist Name</h1>
                <h2 id="album_name" className="font-light text-2xl">Album Name</h2>
                <h2 id="label_name" className="font-bold text-3xl">Label Name</h2>
                <h4 id="realease_date" className="font-extralight text-xl">Release Date</h4>
                <h4 id="total_plays" className="font-extralight text-xl">Total Spotify Plays</h4>
            </div>
        </div>
    )
}