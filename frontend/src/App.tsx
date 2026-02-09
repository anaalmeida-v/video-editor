import { useState } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

function App() {
  const [file, setFile] = useState<File | null>(null);

  const cutVideo = async () => {
    if (!file) return;

    // 1) cria instância do ffmpeg
    const ffmpeg = new FFmpeg();

    // 2) carrega o motor wasm
    await ffmpeg.load();

    // 3) escreve o vídeo na memória virtual do ffmpeg
    await ffmpeg.writeFile('input.mp4', await fetchFile(file));

    // 4) executa o comando de corte
    await ffmpeg.exec([
      '-i', 'input.mp4',
      '-ss', '00:00:00',
      '-to', '00:00:05',
      '-c', 'copy',
      'output.mp4',
    ]);

    const data = await ffmpeg.readFile('output.mp4');

    const uint8 = data as Uint8Array;
    
    const arrayBuffer = new ArrayBuffer(uint8.length);
    new Uint8Array(arrayBuffer).set(uint8);
    
    const url = URL.createObjectURL(
      new Blob([arrayBuffer], { type: 'video/mp4' })
    );
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'video-cortado.mp4';
    a.click();
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Editor MVP</h1>

      <input
        type="file"
        accept="video/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button onClick={cutVideo}>
        Cortar 5 segundos
      </button>
    </div>
  );
}

export default App;
