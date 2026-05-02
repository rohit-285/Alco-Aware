import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { LifeBuoy, Phone, MapPin, X } from 'lucide-react';
import toast from 'react-hot-toast';

const CONTACTS = [
  { label: 'Police', number: '100' },
  { label: 'Ambulance', number: '108' },
  { label: 'National Emergency', number: '112' },
  { label: 'Poison Control', number: '1800-11-6117' }
];

const EmergencySOSPanel = () => {
  const [open, setOpen] = useState(false);
  const [buddyPhone, setBuddyPhone] = useState(() => localStorage.getItem('alcoaware_buddy_phone') || '');

  const saveBuddy = (value) => {
    setBuddyPhone(value);
    localStorage.setItem('alcoaware_buddy_phone', value);
  };

  const sendLocation = () => {
    if (!buddyPhone) {
      toast.error('Add a buddy phone first.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const mapsLink = `https://maps.google.com/?q=${coords.latitude},${coords.longitude}`;
        window.location.href = `sms:${buddyPhone}?body=${encodeURIComponent(`I need help. My location: ${mapsLink}`)}`;
      },
      () => toast.error('Location permission is needed to send your GPS link.')
    );
  };

  const panel = (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[9999] rounded-full bg-danger text-white shadow-2xl shadow-danger/30 p-4 animate-pulse"
        aria-label="Open emergency SOS"
      >
        <LifeBuoy size={28} />
      </button>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center p-4">
          <div className="glass-panel w-full max-w-lg rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-2xl font-sora font-bold text-white">Emergency SOS</h3>
              <button onClick={() => setOpen(false)} className="p-2 rounded-lg bg-white/10"><X /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {CONTACTS.map((contact) => (
                <a key={contact.number} href={`tel:${contact.number}`} className="rounded-xl bg-danger/15 border border-danger/30 p-4 text-white">
                  <Phone className="mb-2" />
                  <div className="font-semibold">{contact.label}</div>
                  <div className="font-mono text-danger">{contact.number}</div>
                </a>
              ))}
            </div>
            <div className="mt-5">
              <label className="text-sm text-text-muted">Buddy phone</label>
              <input value={buddyPhone} onChange={(event) => saveBuddy(event.target.value)} className="mt-2 w-full rounded-xl bg-bg-surface border border-border px-4 py-3 text-white" placeholder="Phone number" />
              <button onClick={sendLocation} className="mt-3 w-full rounded-xl bg-danger px-4 py-4 text-white font-semibold flex items-center justify-center gap-2">
                <MapPin size={20} /> I'm Not OK - Send GPS
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return createPortal(panel, document.body);
};

export default EmergencySOSPanel;
