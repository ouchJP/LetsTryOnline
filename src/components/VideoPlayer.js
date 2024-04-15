import React, { useState } from 'react';
import filesData from './files.json';

function VideoPlayer() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoKey, setVideoKey] = useState(0); // Used to force re-render of video element

  const handleVideoChange = (event) => {
    setSelectedVideo(event.target.value);
    setVideoKey(prevKey => prevKey + 1); // Increment key to force re-render of video element
  }

  return (
    <div>
      <h1>Video Player</h1>
      <label htmlFor="videoSelect">Select a video:</label>
      <select id="videoSelect" onChange={handleVideoChange}>
        <option value="">Select a video...</option>
        {filesData.videos.map(video => (
          <option key={video.id} value={video.imgUrl}>{video.name}</option>
        ))}
      </select>
      {selectedVideo && (
        <div key={videoKey}>
          <video controls key={videoKey}>
            <source src={process.env.PUBLIC_URL + '/' + selectedVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}

export default VideoPlayer;
