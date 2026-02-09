import { useState, useRef } from 'react';

export default function ImageWatermark() {
  const [img, setImg] = useState<HTMLImageElement|null>(null);
  const [file, setFile] = useState<File|null>(null);
  const [text, setText] = useState('© My Photo');
  const [fontSize, setFontSize] = useState(24);
  const [opacity, setOpacity] = useState(0.5);
  const [pos, setPos] = useState('bottom-right');
  const inputRef = useRef<HTMLInputElement>(null);

  const load = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return; setFile(f);
    const image = new Image(); image.onload = () => setImg(image); image.src = URL.createObjectURL(f);
  };

  const download = () => {
    if (!img) return;
    const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
    const ctx = c.getContext('2d')!;
    ctx.drawImage(img, 0, 0);
    ctx.font = `${fontSize}px Arial`; ctx.fillStyle = `rgba(255,255,255,${opacity})`;
    const tw = ctx.measureText(text).width;
    let x = 20, y = img.height - 20;
    if (pos.includes('right')) x = img.width - tw - 20;
    if (pos.includes('center')) x = (img.width - tw) / 2;
    if (pos.includes('top')) y = fontSize + 20;
    if (pos === 'center') { x = (img.width - tw) / 2; y = img.height / 2; }
    ctx.fillText(text, x, y);
    const a = document.createElement('a'); a.download = 'watermarked.png'; a.href = c.toDataURL('image/png'); a.click();
  };

  const positions = [['top-left','↖'],['top-right','↗'],['center','⊕'],['bottom-left','↙'],['bottom-right','↘']];

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-purple-300 cursor-pointer" onClick={() => inputRef.current?.click()}>
        <input ref={inputRef} type="file" accept="image/*" onChange={load} className="hidden" />
        <div className="text-4xl mb-2">💧</div>
        <p className="text-gray-600 font-medium">{file ? file.name : 'Click to upload an image'}</p>
      </div>
      {img && (
        <div className="bg-white border border-gray-100 rounded-xl p-4 space-y-3">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Watermark Text</label>
            <input type="text" value={text} onChange={e => setText(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs text-gray-500">Size: {fontSize}px</label><input type="range" min="12" max="72" value={fontSize} onChange={e => setFontSize(+e.target.value)} className="w-full accent-purple-600" /></div>
            <div><label className="text-xs text-gray-500">Opacity: {Math.round(opacity*100)}%</label><input type="range" min="10" max="100" value={opacity*100} onChange={e => setOpacity(+e.target.value/100)} className="w-full accent-purple-600" /></div>
          </div>
          <div className="flex gap-2">{positions.map(([v,l]) => (
            <button key={v} onClick={() => setPos(v)} className={`flex-1 py-2 rounded-lg text-sm ${pos===v?'bg-purple-600 text-white':'bg-gray-100 text-gray-600'}`}>{l}</button>
          ))}</div>
          <button onClick={download} className="w-full py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700">Add Watermark & Download</button>
        </div>
      )}
    </div>
  );
}
