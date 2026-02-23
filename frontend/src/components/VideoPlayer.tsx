import { useEffect, useRef, useState } from 'react';

interface VideoPlayerProps {
    src: string;
}

export function VideoPlayer({ src }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [paused, setPaused] = useState(true);

    const togglePlay = () => {
        if(!videoRef.current) return;
        if(videoRef.current.paused) {
            videoRef.current.play();
            setPaused(false);
        } else {
            videoRef.current.pause();
            setPaused(true);
        }
    };

    useEffect(() => {
        if(videoRef.current) videoRef.current.pause();
        setPaused(true);
    }, [src]);
    
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "800px", maxWidth: "100%" }}>
            <video
              ref={videoRef}
              src={src}
              style={{
                width: "100%",
                height: "auto",
                display: "block"
              }}
            />
            <button
                onClick={togglePlay}
                className='mt-2 bg-black-500 text-white px-4 py-2 rounded'
            >
                {paused ? '▶️' : '⏸️'}
            </button>
          </div>
        </div>
    )
}