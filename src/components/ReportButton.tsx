import { useState } from 'react';
import Report from './Report';

interface ReportButtonProps {
  targetId: number;
  targetType: 'apartment' | 'user' | 'message';
  className?: string;
}

export default function ReportButton({ targetId, targetType, className }: ReportButtonProps) {
  const [showReport, setShowReport] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowReport(true)}
        className={`text-red-600 hover:text-red-800 ${className}`}
      >
        <svg
          className="w-5 h-5 inline-block mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        Reportar
      </button>

      {showReport && (
        <Report
          targetId={targetId}
          targetType={targetType}
          onClose={() => setShowReport(false)}
        />
      )}
    </>
  );
}
