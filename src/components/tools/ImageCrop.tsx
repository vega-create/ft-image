import { useState, useRef, useCallback } from 'react';

export default function ImageCrop() {
  const [img, setImg] = useState<HTMLImageElement|null>(null);
  const [file, setFile] = useState<File|null>(null);
  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [cropW, setCropW] = useState(100);
  const [cropH, setCropH] = useState(100);
  const inputRef = useRef<HTMLInputElement>(null);

  const load = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    setFile(f);
    const image = new Image();
    image.onload = () => { setImg(image); setCropW(image.width); setCropH(image.height); };
    image.src = URL.createObjectURL(f);
  };

  const applyRatio = (r: number) => {
    if (!img) return;
    const newW = img.width;
    const newH = Math.round(newW / r);
    setCropX(0); setCropY(Math.max(0, Math.round((img.height - newH) / 2)));
    setCropW(newW); setCropH(Math.min(newH, img.height));
  };

  const download = () => {
    if (!img) return;
    const c = document.createElement('canvas'); c.width = cropW; c.height = cropH;
    c.getContext('2d')!.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
    const a = document.createElement('a'); a.download = 'cropped.png'; a.href = c.toDataURL('image/png'); a.click();
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-purple-300 cursor-pointer" onClick={() => inputRef.current?.click()}>
        <input ref={inputRef} type="file" accept="image/*" onChange={load} className="hidden" />
        <div className="text-4xl mb-2">✂️</div>
        <p className="text-gray-600 font-medium">{file ? file.name : 'Click to upload an image'}</p>
      </div>
      {img && (
        <div className="bg-white border border-gray-100 rounded-xl p-4 space-y-3">
          <div className="flex flex-wrap gap-2">
            {[['1:1',1],['4:3',4/3],['16:9',16/9],['3:2',3/2],['2:3',2/3]].map(([l,r]) => (
              <button key={l as string} onClick={() => applyRatio(r as number)} className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-600 hover:bg-purple-100">{l as string}</button>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div><label className="text-xs text-gray-500">X</label><input type="number" value={cropX} onChange={e => setCropX(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 rounded text-sm" /></div>
            <div><label className="text-xs text-gray-500">Y</label><input type="number" value={cropY} onChange={e => setCropY(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 rounded text-sm" /></div>
            <div><label className="text-xs text-gray-500">Width</label><input type="number" value={cropW} onChange={e => setCropW(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 rounded text-sm" /></div>
            <div><label className="text-xs text-gray-500">Height</label><input type="number" value={cropH} onChange={e => setCropH(+e.target.value)} className="w-full px-2 py-1 border border-gray-200 rounded text-sm" /></div>
          </div>
          <button onClick={download} className="w-full py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700">Crop & Download</button>
        </div>
      )}
    </div>
  );
}
