import { useState, useRef } from 'react';

export default function SvgToPng() {
  const [file, setFile] = useState<File|null>(null);
  const [scale, setScale] = useState(2);
  const inputRef = useRef<HTMLInputElement>(null);

  const convert = () => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const c = document.createElement('canvas'); c.width = img.width * scale; c.height = img.height * scale;
        c.getContext('2d')!.drawImage(img, 0, 0, c.width, c.height);
        const a = document.createElement('a'); a.download = file.name.replace(/\.svg$/i, '.png');
        a.href = c.toDataURL('image/png'); a.click();
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-purple-300 cursor-pointer" onClick={() => inputRef.current?.click()}>
        <input ref={inputRef} type="file" accept=".svg" onChange={e => { if (e.target.files?.[0]) setFile(e.target.files[0]); }} className="hidden" />
        <div className="text-4xl mb-2">📊</div>
        <p className="text-gray-600 font-medium">{file ? file.name : 'Click to select an SVG file'}</p>
      </div>
      {file && (
        <div className="bg-white border border-gray-100 rounded-xl p-4 space-y-3">
          <div><label className="text-sm font-medium text-gray-700">Scale: {scale}x</label>
            <div className="flex gap-2 mt-1">{[1,2,3,4].map(s => (
              <button key={s} onClick={() => setScale(s)} className={`px-4 py-2 rounded-lg text-sm font-medium ${scale===s?'bg-purple-600 text-white':'bg-gray-100 text-gray-600'}`}>{s}x</button>
            ))}</div></div>
          <button onClick={convert} className="w-full py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700">Convert to PNG</button>
        </div>
      )}
    </div>
  );
}
