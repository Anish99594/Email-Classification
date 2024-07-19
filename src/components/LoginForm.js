import React from 'react';
import { signIn } from 'next-auth/react';

const LoginForm = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={() => signIn('google')}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Login with Google
      </button>
    </div>
  );
};

export default LoginForm;
