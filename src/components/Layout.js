import React from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

const Layout = ({ children }) => {
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link href="/">Email Classifier</Link>
        </h1>
        <nav>
          {status === 'authenticated' ? (
            <button
              onClick={() => signOut()}
              className="bg-red-600 px-4 py-2 rounded"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => signIn('google')}
              className="bg-green-600 px-4 py-2 rounded"
            >
              Sign In
            </button>
          )}
        </nav>
      </header>
      <main className="flex-grow p-4">{children}</main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        © 2024 Email Classifier
      </footer>
    </div>
  );
};

export default Layout;
