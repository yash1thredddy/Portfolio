'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-semibold mb-4">Your Mail has been Send I will getback to you as soon as possible!</h2>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
      >
        Click here to go Back
      </button>
    </div>
  );
}