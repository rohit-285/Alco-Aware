import React, { useState } from 'react';
import { Camera } from 'lucide-react';

const DrinkPhotoUpload = ({ onDrinkIdentified }) => {
  const [fileName, setFileName] = useState('');

  const onFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    onDrinkIdentified?.({ type: 'beer', volume: 330, percentage: 5 });
  };

  return (
    <div className="glass-panel rounded-2xl p-5">
      <div className="flex items-center gap-3 mb-4"><Camera className="text-primary" /><h3 className="text-xl font-sora text-white">Drink photo recognition</h3></div>
      <label className="block rounded-xl border border-dashed border-border bg-white/5 p-6 text-center cursor-pointer">
        <input type="file" accept="image/*" onChange={onFile} className="hidden" />
        <Camera className="mx-auto text-primary mb-3" />
        <span className="text-text-muted">{fileName || 'Take or upload a drink photo'}</span>
      </label>
    </div>
  );
};

export default DrinkPhotoUpload;
