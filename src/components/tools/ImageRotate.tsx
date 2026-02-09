import { useState, useRef } from 'react';

export default function ImageRotate() {
  const [img, setImg] = useState<HTMLImageElement|null>(null);
  const [file, setFile] = useState<File|null>(null);
  const [angle, setAngle] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const load = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return; setFile(f);
    const image = new Image(); image.onload = () => setImg(image); image.src = URL.createObjectURL(f);
  };

  const download = () => {
    if (!img) return;
    const rad = angle * Math.PI / 180;
    const sin = Math.abs(Math.sin(rad)), cos = Math.abs(Math.cos(rad));
    const w = Math.round(img.width * cos + img.height * sin);
    const h = Math.round(img.width * sin + img.height * cos);
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const ctx = c.getContext('2d')!;
    ctx.translate(w/2, h/2); ctx.rotate(rad);
    ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
    ctx.drawImage(img, -img.width/2, -img.height/2);
    const a = document.createElement('a'); a.download = 'rotated.png'; a.href = c.toDataURL('image/png'); a.click();
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-purple-300 cursor-pointer" onClick={() => inputRef.current?.click()}>
        <input ref={inputRef} type="file" accept="image/*" onChange={load} className="hidden" />
        <div className="text-4xl mb-2">🔄</div>
        <p className="text-gray-600 font-medium">{file ? file.name : 'Click to upload an image'}</p>
      </div>
      {img && (
        <div className="bg-white border border-gray-100 rounded-xl p-4 space-y-3">
          <div className="text-center"><img src={img.src} alt="" className="max-h-48 mx-auto rounded-lg" style={{transform:`rotate(${angle}deg) scaleX(${flipH?-1:1}) scaleY(${flipV?-1:1})`,transition:'transform 0.3s'}} /></div>
          <div className="flex gap-2 justify-center">
            {[90,180,270].map(a => (<button key={a} onClick={() => setAngle(a)} className={`px-4 py-2 rounded-lg text-sm font-medium ${angle===a?'bg-purple-600 text-white':'bg-gray-100 text-gray-600'}`}>{a}°</button>))}
          </div>
          <div><label className="text-xs text-gray-500">Custom: {angle}°</label><input type="range" min="0" max="359" value={angle} onChange={e => setAngle(+e.target.value)} className="w-full accent-purple-600" /></div>
          <div className="flex gap-2 justify-center">
            <button onClick={() => setFlipH(!flipH)} className={`px-4 py-2 rounded-lg text-sm ${flipH?'bg-purple-600 text-white':'bg-gray-100 text-gray-600'}`}>↔ Flip H</button>
            <button onClick={() => setFlipV(!flipV)} className={`px-4 py-2 rounded-lg text-sm ${flipV?'bg-purple-600 text-white':'bg-gray-100 text-gray-600'}`}>↕ Flip V</button>
          </div>
          <button onClick={download} className="w-full py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700">Download</button>
        </div>
      )}
    </div>
  );
}
