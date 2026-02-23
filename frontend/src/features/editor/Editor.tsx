import { useState } from 'react';
import { VideoPlayer } from '../../components/VideoPlayer';
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile } from '@ffmpeg/util';

export function Editor() {
    const [file, setFile] = useState<File | null>(null);
    const [videoSrc, setVideoSrc] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    
    function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
        const selectedFile = event.target.files?.[0];
        if(!selectedFile) return;

        setFile(selectedFile);
        const url = URL.createObjectURL(selectedFile);
        setVideoSrc(url);
    }

    async function handleCut() {
        if(!file) return;

        setLoading(true);

        const ffmpeg = new FFmpeg();
        await ffmpeg.load();

        await ffmpeg.writeFile('input.mp4', await fetchFile(file));

        await ffmpeg.exec([
            '-i', 'input.mp4',
            '-ss', '00:00:00',
            '-to', '00:00:05',
            '-c', 'copy',
            'output.mp4',
        ])

        const data = await ffmpeg.readFile('output.mp4')

        const uint8 = new Uint8Array(data as Uint8Array)

        const blob = new Blob([uint8], { type: 'video/mp4' })
        const url = URL.createObjectURL(blob)

        setVideoSrc(url);
        setLoading(false);
    }

    return (
        <div className='p-4'>
            <h1>Editor</h1>

            <input
                type="file"
                accept='video/*'
                onChange={handleUpload}
                className='mb-4'
            />

            {videoSrc &&
                <>
                    <VideoPlayer src={videoSrc}/>
                    
                    <button
                        onClick={handleCut}
                        disabled={loading}
                        className='bg-black text-white px-4 py-2 rounded'
                    >
                        {loading ? 'Processando...' : 'Cortar 5 segundos'}
                    </button>
                </>
            }
        </div>
    )
}