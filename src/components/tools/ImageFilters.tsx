import { useState, useRef, useEffect } from 'react';

export default function ImageFilters() {
  const [img, setImg] = useState<HTMLImageElement|null>(null);
  const [file, setFile] = useState<File|null>(null);
  const [filters, setFilters] = useState({brightness:100,contrast:100,saturate:100,blur:0,grayscale:0,sepia:0,hueRotate:0});
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const load = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return; setFile(f);
    const image = new Image(); image.onload = () => setImg(image); image.src = URL.createObjectURL(f);
  };

  useEffect(() => {
    if (!img || !canvasRef.current) return;
    const c = canvasRef.current; c.width = Math.min(img.width, 600); c.height = c.width * img.height / img.width;
    const ctx = c.getContext('2d')!;
    ctx.filter = `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturate}%) blur(${filters.blur}px) grayscale(${filters.grayscale}%) sepia(${filters.sepia}%) hue-rotate(${filters.hueRotate}deg)`;
    ctx.drawImage(img, 0, 0, c.width, c.height);
  }, [img, filters]);

  const download = () => {
    if (!img) return;
    const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
    const ctx = c.getContext('2d')!;
    ctx.filter = `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturate}%) blur(${filters.blur}px) grayscale(${filters.grayscale}%) sepia(${filters.sepia}%) hue-rotate(${filters.hueRotate}deg)`;
    ctx.drawImage(img, 0, 0);
    const a = document.createElement('a'); a.download = 'filtered.png'; a.href = c.toDataURL('image/png'); a.click();
  };

  const reset = () => setFilters({brightness:100,contrast:100,saturate:100,blur:0,grayscale:0,sepia:0,hueRotate:0});
  const set = (k: string, v: number) => setFilters(p => ({...p, [k]: v}));
  const sliders = [['brightness','Brightness',0,200,100,'%'],['contrast','Contrast',0,200,100,'%'],['saturate','Saturation',0,200,100,'%'],['blur','Blur',0,10,0,'px'],['grayscale','Grayscale',0,100,0,'%'],['sepia','Sepia',0,100,0,'%'],['hueRotate','Hue Rotate',0,360,0,'°']];

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-purple-300 cursor-pointer" onClick={() => inputRef.current?.click()}>
        <input ref={inputRef} type="file" accept="image/*" onChange={load} className="hidden" />
        <div className="text-4xl mb-2">🎭</div>
        <p className="text-gray-600 font-medium">{file ? file.name : 'Click to upload an image'}</p>
      </div>
      {img && (
        <>
          <canvas ref={canvasRef} className="w-full rounded-xl" />
          <div className="bg-white border border-gray-100 rounded-xl p-4 space-y-2">
            {sliders.map(([k,label,min,max,def,unit]) => (
              <div key={k as string} className="flex items-center gap-3">
                <span className="w-24 text-xs text-gray-600">{label as string}</span>
                <input type="range" min={min as number} max={max as number} value={(filters as any)[k as string]} onChange={e => set(k as string, +e.target.value)} className="flex-1 accent-purple-600" />
                <span className="w-14 text-xs text-gray-500 text-right">{(filters as any)[k as string]}{unit}</span>
              </div>
            ))}
            <div className="flex gap-2 pt-2">
              <button onClick={reset} className="flex-1 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm">Reset</button>
              <button onClick={download} className="flex-1 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium">Download</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
