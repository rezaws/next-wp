'use client'

import Header from '../components/header'
import { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('https://localhost:10010/wp-json/gholly/v1/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage('لینک بازیابی رمز عبور به ایمیلت ارسال شد.');
      } else {
        setStatus('error');
        setMessage(data?.message || 'خطایی رخ داد.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('ارتباط با سرور برقرار نشد.');
    }
  };

  return (
    <div className='pt-25'>
      <Header />
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">فراموشی رمز عبور</h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          ایمیل:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mt-1 p-2 border rounded"
          />
        </label>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          ارسال لینک بازیابی
        </button>
      </form>

      {status !== 'idle' && (
        <p className={`mt-4 ${status === 'error' ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </p>
      )}
    </div>
    </div>
  );
}
