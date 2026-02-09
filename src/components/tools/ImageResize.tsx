import { useState, useRef } from 'react';

export default function ImageResize() {
  const [img, setImg] = useState<HTMLImageElement|null>(null);
  const [file, setFile] = useState<File|null>(null);
  const [w, setW] = useState(0);
  const [h, setH] = useState(0);
  const [lock, setLock] = useState(true);
  const [origW, setOrigW] = useState(0);
  const [origH, setOrigH] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const load = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    setFile(f);
    const image = new Image();
    image.onload = () => { setImg(image); setW(image.width); setH(image.height); setOrigW(image.width); setOrigH(image.height); };
    image.src = URL.createObjectURL(f);
  };

  const changeW = (nw: number) => { setW(nw); if (lock && origW) setH(Math.round(nw * origH / origW)); };
  const changeH = (nh: number) => { setH(nh); if (lock && origH) setW(Math.round(nh * origW / origH)); };

  const download = () => {
    if (!img) return;
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    c.getContext('2d')!.drawImage(img, 0, 0, w, h);
    const a = document.createElement('a'); a.download = `resized-${w}x${h}.png`; a.href = c.toDataURL('image/png'); a.click();
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-purple-300 cursor-pointer" onClick={() => inputRef.current?.click()}>
        <input ref={inputRef} type="file" accept="image/*" onChange={load} className="hidden" />
        <div className="text-4xl mb-2">📐</div>
        <p className="text-gray-600 font-medium">{file ? file.name : 'Click to upload an image'}</p>
        {origW > 0 && <p className="text-sm text-gray-400 mt-1">Original: {origW} × {origH}</p>}
      </div>
      {img && (
        <div className="bg-white border border-gray-100 rounded-xl p-4 space-y-3">
          <div className="flex gap-3 items-end">
            <div className="flex-1"><label className="block text-xs text-gray-500 mb-1">Width</label><input type="number" value={w} onChange={e => changeW(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg" /></div>
            <button onClick={() => setLock(!lock)} className={`px-3 py-2 rounded-lg text-sm ${lock ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-500'}`}>{lock ? '🔗' : '🔓'}</button>
            <div className="flex-1"><label className="block text-xs text-gray-500 mb-1">Height</label><input type="number" value={h} onChange={e => changeH(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg" /></div>
          </div>
          <div className="flex gap-2">
            {[25,50,75,100,150,200].map(p => (
              <button key={p} onClick={() => { changeW(Math.round(origW*p/100)); }} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600 hover:bg-gray-200">{p}%</button>
            ))}
          </div>
          <button onClick={download} className="w-full py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700">Download {w} × {h}</button>
        </div>
      )}
    </div>
  );
}
