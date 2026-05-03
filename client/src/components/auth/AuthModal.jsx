import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const loadGoogleScript = () => new Promise((resolve, reject) => {
  if (window.google?.accounts?.id) {
    resolve();
    return;
  }
  const existing = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
  if (existing) {
    existing.addEventListener('load', resolve, { once: true });
    existing.addEventListener('error', reject, { once: true });
    return;
  }
  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;
  script.onload = resolve;
  script.onerror = reject;
  document.head.appendChild(script);
});

const AuthModal = ({ open, onClose }) => {
  const { login, register, loginWithGoogleCredential } = useAuth();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [googleError, setGoogleError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const googleButtonRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    let cancelled = false;

    const setupGoogle = async () => {
      setGoogleError('');
      try {
        const clientResponse = await api.get('/auth/google-client-id');
        const clientId = clientResponse.clientId;
        if (!clientId) {
          setGoogleError('Google Client ID is missing on the backend.');
          return;
        }
        await loadGoogleScript();
        if (cancelled || !googleButtonRef.current) return;
        googleButtonRef.current.innerHTML = '';
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: async ({ credential }) => {
            const ok = await loginWithGoogleCredential(credential);
            if (ok) onClose();
          }
        });
        window.google.accounts.id.renderButton(googleButtonRef.current, {
          theme: 'filled_black',
          size: 'large',
          type: 'standard',
          shape: 'pill',
          text: 'continue_with',
          width: 340
        });
      } catch {
        setGoogleError('Could not load Google sign-in. Check internet, backend env, and Google OAuth origin setup.');
      }
    };

    setupGoogle();
    return () => {
      cancelled = true;
    };
  }, [open, loginWithGoogleCredential, onClose]);

  if (!open) return null;

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const submit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    const ok = mode === 'login' ? await login(form) : await register(form);
    setSubmitting(false);
    if (ok) onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[10000] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-md rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-2xl font-sora font-bold text-white">{mode === 'login' ? 'Log in' : 'Create account'}</h2>
            <p className="text-sm text-text-muted mt-1">Sign in to unlock My Stats.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg bg-white/10 p-2 text-white">
            <X size={20} />
          </button>
        </div>

        <div className="min-h-11 flex justify-center" ref={googleButtonRef} />
        {googleError && <p className="mt-2 text-sm text-danger text-center">{googleError}</p>}
        <p className="mt-3 text-xs text-text-muted text-center">
          For Google login on localhost, add <span className="text-white">https://alco-aware.onrender.com</span> in Google Cloud OAuth Authorized JavaScript origins.
        </p>

        <div className="my-5 flex items-center gap-3 text-xs text-text-muted">
          <div className="h-px flex-1 bg-border" />
          or use email
          <div className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={submit} className="space-y-4">
          {mode === 'register' && (
            <input
              value={form.name}
              onChange={(event) => update('name', event.target.value)}
              className="w-full rounded-xl bg-bg-surface border border-border px-4 py-3 text-white"
              placeholder="Name"
            />
          )}
          <input
            type="email"
            required
            value={form.email}
            onChange={(event) => update('email', event.target.value)}
            className="w-full rounded-xl bg-bg-surface border border-border px-4 py-3 text-white"
            placeholder="Email"
          />
          <input
            type="password"
            required
            minLength={4}
            value={form.password}
            onChange={(event) => update('password', event.target.value)}
            className="w-full rounded-xl bg-bg-surface border border-border px-4 py-3 text-white"
            placeholder="Password"
          />
          <button type="submit" disabled={submitting} className="w-full rounded-xl bg-primary text-black px-4 py-3 font-semibold disabled:opacity-60">
            {submitting ? 'Please wait...' : mode === 'login' ? 'Log in' : 'Create account'}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
          className="mt-4 w-full text-sm text-text-muted hover:text-white"
        >
          {mode === 'login' ? 'Need an account? Register' : 'Already have an account? Log in'}
        </button>
      </div>
    </div>,
    document.body
  );
};

export default AuthModal;
