import { useState, useRef } from 'react';

export default function FaviconGen() {
  const [mode, setMode] = useState<'text'|'image'>('text');
  const [text, setText] = useState('F');
  const [bg, setBg] = useState('#7C3AED');
  const [fg, setFg] = useState('#FFFFFF');
  const [radius, setRadius] = useState(8);
  const [img, setImg] = useState<HTMLImageElement|null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const generate = (size: number) => {
    const c = document.createElement('canvas'); c.width = size; c.height = size;
    const ctx = c.getContext('2d')!;
    if (mode === 'text') {
      ctx.beginPath();
      const r = radius * size / 64;
      ctx.moveTo(r, 0); ctx.lineTo(size-r, 0); ctx.quadraticCurveTo(size, 0, size, r);
      ctx.lineTo(size, size-r); ctx.quadraticCurveTo(size, size, size-r, size);
      ctx.lineTo(r, size); ctx.quadraticCurveTo(0, size, 0, size-r);
      ctx.lineTo(0, r); ctx.quadraticCurveTo(0, 0, r, 0); ctx.closePath();
      ctx.fillStyle = bg; ctx.fill();
      ctx.font = `bold ${size*0.6}px Arial`; ctx.fillStyle = fg; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(text.slice(0,2), size/2, size/2 + size*0.05);
    } else if (img) {
      ctx.drawImage(img, 0, 0, size, size);
    }
    return c.toDataURL('image/png');
  };

  const download = (size: number) => {
    const a = document.createElement('a'); a.download = `favicon-${size}x${size}.png`;
    a.href = generate(size); a.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(['text','image'] as const).map(m => (
          <button key={m} onClick={() => setMode(m)} className={`px-4 py-2 rounded-lg text-sm font-medium ${mode===m?'bg-purple-600 text-white':'bg-gray-100 text-gray-600'}`}>{m === 'text' ? '📝 Text' : '🖼️ Image'}</button>
        ))}
      </div>
      {mode === 'text' ? (
        <div className="bg-white border border-gray-100 rounded-xl p-4 space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <div><label className="text-xs text-gray-500">Text (1-2 chars)</label><input type="text" value={text} onChange={e => setText(e.target.value.slice(0,2))} maxLength={2} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-center font-bold text-lg" /></div>
            <div><label className="text-xs text-gray-500">Background</label><input type="color" value={bg} onChange={e => setBg(e.target.value)} className="w-full h-10 rounded cursor-pointer" /></div>
            <div><label className="text-xs text-gray-500">Text Color</label><input type="color" value={fg} onChange={e => setFg(e.target.value)} className="w-full h-10 rounded cursor-pointer" /></div>
          </div>
          <div><label className="text-xs text-gray-500">Rounded: {radius}px</label><input type="range" min="0" max="32" value={radius} onChange={e => setRadius(+e.target.value)} className="w-full accent-purple-600" /></div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:border-purple-300 cursor-pointer" onClick={() => inputRef.current?.click()}>
          <input ref={inputRef} type="file" accept="image/*" onChange={e => { const f = e.target.files?.[0]; if (f) { const i = new Image(); i.onload = () => setImg(i); i.src = URL.createObjectURL(f); }}} className="hidden" />
          <p className="text-gray-600">{img ? 'Image loaded ✓' : 'Click to upload'}</p>
        </div>
      )}
      <div className="flex items-end gap-4 justify-center">
        {[16,32,48,64,128,256].map(s => (
          <div key={s} className="text-center">
            <img src={generate(s)} alt="" style={{width: Math.min(s,64), height: Math.min(s,64)}} className="mx-auto rounded border border-gray-200" />
            <span className="text-xs text-gray-400 mt-1 block">{s}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">{[16,32,48,180,192,512].map(s => (
        <button key={s} onClick={() => download(s)} className="px-3 py-1.5 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700">{s}×{s}</button>
      ))}</div>
    </div>
  );
}
