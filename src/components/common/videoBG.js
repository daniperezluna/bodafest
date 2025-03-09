import React from 'react'
export function VideoBg() {
    return (
        <video poster={'/videos/poster-video.jpg'} className="video-size" muted loop autoPlay preload="none">
            <source src={'/videos/videoEventiva.mp4'} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    )
}