import { useState } from 'react';

export default function PlaceholderGen() {
  const [w, setW] = useState(800);
  const [h, setH] = useState(600);
  const [bg, setBg] = useState('#E5E7EB');
  const [fg, setFg] = useState('#9CA3AF');
  const [text, setText] = useState('');

  const generate = () => {
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const ctx = c.getContext('2d')!;
    ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
    const label = text || `${w} × ${h}`;
    const fontSize = Math.max(16, Math.min(w, h) / 10);
    ctx.font = `${fontSize}px Arial`; ctx.fillStyle = fg; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(label, w/2, h/2);
    const a = document.createElement('a'); a.download = `placeholder-${w}x${h}.png`; a.href = c.toDataURL('image/png'); a.click();
  };

  const presets = [['Card','400','300'],['Banner','1200','400'],['Social','1200','630'],['Square','600','600'],['HD','1920','1080']];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {presets.map(([l,pw,ph]) => (<button key={l} onClick={() => {setW(+pw);setH(+ph);}} className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-600 hover:bg-purple-100">{l} ({pw}×{ph})</button>))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="text-xs text-gray-500">Width</label><input type="number" value={w} onChange={e => setW(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg" /></div>
        <div><label className="text-xs text-gray-500">Height</label><input type="number" value={h} onChange={e => setH(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg" /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="text-xs text-gray-500">Background</label><div className="flex gap-2"><input type="color" value={bg} onChange={e => setBg(e.target.value)} className="w-10 h-8 rounded" /><span className="text-sm font-mono text-gray-500">{bg}</span></div></div>
        <div><label className="text-xs text-gray-500">Text Color</label><div className="flex gap-2"><input type="color" value={fg} onChange={e => setFg(e.target.value)} className="w-10 h-8 rounded" /><span className="text-sm font-mono text-gray-500">{fg}</span></div></div>
      </div>
      <div><label className="text-xs text-gray-500">Custom Text (optional)</label><input type="text" value={text} onChange={e => setText(e.target.value)} placeholder={`${w} × ${h}`} className="w-full px-3 py-2 border border-gray-200 rounded-lg" /></div>
      <div className="bg-gray-100 rounded-xl p-4 flex items-center justify-center" style={{aspectRatio:`${w}/${h}`,maxHeight:200,backgroundColor:bg}}>
        <span style={{color:fg,fontSize:Math.max(12,Math.min(200/h*w,200)/10)+'px'}}>{text || `${w} × ${h}`}</span>
      </div>
      <button onClick={generate} className="w-full py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700">Generate & Download</button>
    </div>
  );
}
