"use client"; // error.tsx must be client components

interface ErrorProps {
    error: Error;
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    return (
        <div>
            {error.message}
            <button onClick={reset}>Back</button>
        </div>
    );
}
