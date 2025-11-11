import React from "react";

type TerminalProps = {
  lines: string[];
  className?: string;
};

export function Terminal({ lines, className = "" }: TerminalProps) {
  return (
    <div
      className={`font-mono text-sm bg-black text-white p-4 rounded-md overflow-auto ${className}`}
    >
      {lines.length === 0 ? (
        <div className="text-muted-foreground">No logs yet...</div>
      ) : (
        lines.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {line}
          </div>
        ))
      )}
    </div>
  );
}

export default Terminal;
