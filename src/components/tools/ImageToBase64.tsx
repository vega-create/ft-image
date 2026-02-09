import { useState, useRef } from 'react';

export default function ImageToBase64() {
  const [result, setResult] = useState('');
  const [file, setFile] = useState<File|null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const convert = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return; setFile(f);
    const reader = new FileReader();
    reader.onload = () => setResult(reader.result as string);
    reader.readAsDataURL(f);
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-purple-300 cursor-pointer" onClick={() => inputRef.current?.click()}>
        <input ref={inputRef} type="file" accept="image/*" onChange={convert} className="hidden" />
        <div className="text-4xl mb-2">🔤</div>
        <p className="text-gray-600 font-medium">{file ? file.name : 'Click to select an image'}</p>
      </div>
      {result && (
        <>
          <div className="flex gap-3 items-start">
            <img src={result} alt="" className="w-24 h-24 object-cover rounded-lg" />
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Length: {result.length.toLocaleString()} chars</p>
              <textarea readOnly value={result} className="w-full h-32 p-3 border border-gray-200 rounded-xl font-mono text-xs bg-gray-50" />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => navigator.clipboard.writeText(result)} className="flex-1 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium">Copy Base64</button>
            <button onClick={() => navigator.clipboard.writeText(`<img src="${result}" />`)} className="flex-1 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium">Copy as &lt;img&gt;</button>
          </div>
        </>
      )}
    </div>
  );
}
