import React, { useMemo, useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { parseDrinksFromSpeech } from '../../utils/speechParser';

const VoiceInput = ({ onDrinksDetected }) => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const Recognition = useMemo(() => window.SpeechRecognition || window.webkitSpeechRecognition, []);

  const start = () => {
    if (!Recognition) {
      toast.error('Speech recognition is not supported in this browser.');
      return;
    }
    const recognition = new Recognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (event) => {
      const text = Array.from(event.results).map((result) => result[0].transcript).join(' ');
      setTranscript(text);
      const drinks = parseDrinksFromSpeech(text);
      if (drinks.length) onDrinksDetected(drinks);
    };
    recognition.start();
  };

  return (
    <div className="rounded-xl border border-border bg-white/5 p-4">
      <button type="button" onClick={start} className={`rounded-full p-3 ${listening ? 'bg-danger animate-pulse' : 'bg-primary'} text-black`}>
        {listening ? <MicOff /> : <Mic />}
      </button>
      <div className="mt-3 text-sm text-text-muted">{transcript || 'Tap the microphone and say: two beers and a whiskey shot.'}</div>
    </div>
  );
};

export default VoiceInput;
