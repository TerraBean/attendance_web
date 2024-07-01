'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginPage = async () => {
    // Implement your login logic here (e.g., fetch API call)
    // ...
    setIsLoggedIn(true);
    router.push('/login');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {!isLoggedIn && (
        <button onClick={loginPage}>Login</button>
      )}
    </main>
  );
}
