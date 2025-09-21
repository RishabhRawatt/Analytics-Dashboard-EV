import { useEffect, useState } from "react";

export default function Loading() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        .loading-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          color: #4B5563; /* gray-600 equivalent */
        }
        .loading-text {
          font-size: 1.125rem; /* text-lg ~18px */
          font-weight: 500; /* medium */
          font-family: Arial, sans-serif;
        }
      `}</style>
      <div className="loading-container">
        <p className="loading-text">
          Loading data, please wait
          <span>{dots}</span>
        </p>
      </div>
    </>
  );
}
