import { useState, useRef } from 'react';

export default function ImageCompress() {
  const [file, setFile] = useState<File|null>(null);
  const [quality, setQuality] = useState(80);
  const [result, setResult] = useState<{size:number;url:string}|null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const load = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files?.[0]) { setFile(e.target.files[0]); setResult(null); } };

  const compress = () => {
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
      c.getContext('2d')!.drawImage(img, 0, 0);
      c.toBlob(blob => {
        if (blob) setResult({ size: blob.size, url: URL.createObjectURL(blob) });
      }, 'image/jpeg', quality / 100);
    };
    img.src = URL.createObjectURL(file);
  };

  const fmt = (b: number) => b < 1024 ? b + ' B' : b < 1048576 ? (b/1024).toFixed(1) + ' KB' : (b/1048576).toFixed(2) + ' MB';

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-purple-300 cursor-pointer" onClick={() => inputRef.current?.click()}>
        <input ref={inputRef} type="file" accept="image/*" onChange={load} className="hidden" />
        <div className="text-4xl mb-2">📦</div>
        <p className="text-gray-600 font-medium">{file ? `${file.name} (${fmt(file.size)})` : 'Click to upload an image'}</p>
      </div>
      {file && (
        <div className="bg-white border border-gray-100 rounded-xl p-4 space-y-3">
          <div><label className="text-sm font-medium text-gray-700">Quality: {quality}%</label>
            <input type="range" min="10" max="100" value={quality} onChange={e => setQuality(+e.target.value)} className="w-full accent-purple-600" /></div>
          <button onClick={compress} className="w-full py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700">Compress</button>
          {result && (
            <div className="bg-green-50 rounded-xl p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div><div className="text-sm text-gray-500">Original</div><div className="font-bold">{fmt(file.size)}</div></div>
                <div><div className="text-sm text-gray-500">Compressed</div><div className="font-bold text-green-600">{fmt(result.size)}</div></div>
                <div><div className="text-sm text-gray-500">Saved</div><div className="font-bold text-purple-600">{Math.round((1 - result.size/file.size)*100)}%</div></div>
              </div>
              <a href={result.url} download="compressed.jpg" className="block mt-3 text-center py-2 bg-green-600 text-white rounded-lg text-sm font-medium">Download</a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
