'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    try {
      const response = await fetch('https://user-data.up.railway.app/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      console.log(response)
      if (response.ok) {
        // Successful login
        router.push('/coordinates');
      } else {
        const data = await response.json();
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred during login.');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-r from-blue-100 to-purple-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Hello Again!</h1>
        <p className="text-center mb-6">Welcome back you've been missed!</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
          <div className="text-right text-blue-500 hover:underline">
            <a href="#">Recovery Password</a>
          </div>
          <button type="submit" className="w-full bg-red-500 text-white py-2 rounded-lg">
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
}
