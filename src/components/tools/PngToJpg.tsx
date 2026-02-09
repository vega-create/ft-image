import { useState, useRef } from 'react';

export default function PngToJpg() {
  const [file, setFile] = useState<File|null>(null);
  const [quality, setQuality] = useState(90);
  const [bg, setBg] = useState('#ffffff');
  const inputRef = useRef<HTMLInputElement>(null);

  const convert = () => {
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
      const ctx = c.getContext('2d')!;
      ctx.fillStyle = bg; ctx.fillRect(0, 0, c.width, c.height);
      ctx.drawImage(img, 0, 0);
      const a = document.createElement('a'); a.download = file.name.replace(/\.png$/i, '.jpg');
      a.href = c.toDataURL('image/jpeg', quality/100); a.click();
    };
    img.src = URL.createObjectURL(file);
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-purple-300 cursor-pointer" onClick={() => inputRef.current?.click()}>
        <input ref={inputRef} type="file" accept=".png" onChange={e => { if (e.target.files?.[0]) setFile(e.target.files[0]); }} className="hidden" />
        <div className="text-4xl mb-2">🖼️</div>
        <p className="text-gray-600 font-medium">{file ? file.name : 'Click to select a PNG file'}</p>
      </div>
      {file && (
        <div className="bg-white border border-gray-100 rounded-xl p-4 space-y-3">
          <div><label className="text-sm font-medium text-gray-700">Quality: {quality}%</label>
            <input type="range" min="10" max="100" value={quality} onChange={e => setQuality(+e.target.value)} className="w-full accent-purple-600" /></div>
          <div className="flex items-center gap-2"><label className="text-sm text-gray-700">Background:</label><input type="color" value={bg} onChange={e => setBg(e.target.value)} className="w-10 h-8 rounded cursor-pointer" /><span className="text-xs text-gray-400">(replaces transparency)</span></div>
          <button onClick={convert} className="w-full py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700">Convert to JPG</button>
        </div>
      )}
    </div>
  );
}
