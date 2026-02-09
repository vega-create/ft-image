import { useState, useRef } from 'react';

export default function JpgToPng() {
  const [file, setFile] = useState<File|null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const convert = () => {
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
      c.getContext('2d')!.drawImage(img, 0, 0);
      const a = document.createElement('a'); a.download = file.name.replace(/\.jpe?g$/i, '.png');
      a.href = c.toDataURL('image/png'); a.click();
    };
    img.src = URL.createObjectURL(file);
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-purple-300 cursor-pointer" onClick={() => inputRef.current?.click()}>
        <input ref={inputRef} type="file" accept=".jpg,.jpeg" onChange={e => { if (e.target.files?.[0]) setFile(e.target.files[0]); }} className="hidden" />
        <div className="text-4xl mb-2">🖼️</div>
        <p className="text-gray-600 font-medium">{file ? file.name : 'Click to select a JPG file'}</p>
      </div>
      {file && <button onClick={convert} className="w-full py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700">Convert to PNG</button>}
    </div>
  );
}
