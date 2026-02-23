import { useState } from 'react';
import { VideoPlayer } from '../../components/VideoPlayer';

export function Editor() {
    const [videoSrc, setVideoSrc] = useState<string | null>(null);
    
    function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if(!file) return;

        const url = URL.createObjectURL(file);
        setVideoSrc(url);
    }

    return (
        <div className='p-4'>
            <h1>Editor</h1>

            <input
                type="file"
                accept='video/*'
                onChange={handleUpload}
            />
            {videoSrc && <VideoPlayer src={videoSrc} />}
        </div>
    )
}