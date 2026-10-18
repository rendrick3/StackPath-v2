import React from 'react';

interface SystemDiagramProps {
  diagramId: string;
  title?: string;
}

export function SystemDiagram({ diagramId, title }: SystemDiagramProps) {
  switch (diagramId) {
    case 'diagram-client-server-pantry':
      return (
        <figure className="my-6 p-4 md:p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100">
          <figcaption className="text-sm font-semibold mb-4 text-indigo-600 dark:text-indigo-400">
            {title || 'Client-Server Architecture: The Restaurant Analogy'}
          </figcaption>
          <div className="w-full overflow-x-auto">
            <svg
              className="w-full min-w-[550px] h-48"
              viewBox="0 0 700 180"
              role="img"
              aria-label="Diagram showing flow from Browser to Internet to Server and Database"
            >
              <desc>A flow showing Browser Client sending HTTP Request to Server and Database returning data.</desc>
              {/* Client Box */}
              <rect x="20" y="30" width="160" height="120" rx="10" className="fill-indigo-50 dark:fill-indigo-950/60 stroke-indigo-500" strokeWidth="2" />
              <text x="100" y="65" textAnchor="middle" className="font-bold fill-indigo-700 dark:fill-indigo-300 text-sm">Client / Browser</text>
              <text x="100" y="90" textAnchor="middle" className="fill-slate-600 dark:fill-slate-400 text-xs">The Dining Room</text>
              <text x="100" y="115" textAnchor="middle" className="fill-slate-500 text-xs">HTML • CSS • JS</text>

              {/* Request Arrow */}
              <path d="M 190 70 L 270 70" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 2" markerEnd="url(#arrow)" />
              <text x="230" y="60" textAnchor="middle" className="fill-indigo-600 dark:fill-indigo-400 text-xs font-mono">HTTP Request</text>

              {/* Response Arrow */}
              <path d="M 270 110 L 190 110" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrow-teal)" />
              <text x="230" y="130" textAnchor="middle" className="fill-teal-600 dark:fill-teal-400 text-xs font-mono">200 OK (HTML/JSON)</text>

              {/* Server Box */}
              <rect x="280" y="30" width="160" height="120" rx="10" className="fill-purple-50 dark:fill-purple-950/60 stroke-purple-500" strokeWidth="2" />
              <text x="360" y="65" textAnchor="middle" className="font-bold fill-purple-700 dark:fill-purple-300 text-sm">Server / Backend</text>
              <text x="360" y="90" textAnchor="middle" className="fill-slate-600 dark:fill-slate-400 text-xs">The Kitchen</text>
              <text x="360" y="115" textAnchor="middle" className="fill-slate-500 text-xs">Next.js • API Logic</text>

              {/* DB Query Arrow */}
              <path d="M 450 70 L 510 70" stroke="#f59e0b" strokeWidth="2" />
              <text x="480" y="60" textAnchor="middle" className="fill-amber-600 dark:fill-amber-400 text-xs font-mono">SQL Query</text>

              {/* DB Response Arrow */}
              <path d="M 510 110 L 450 110" stroke="#f59e0b" strokeWidth="2" />
              <text x="480" y="130" textAnchor="middle" className="fill-amber-600 dark:fill-amber-400 text-xs font-mono">Data Rows</text>

              {/* Database Box */}
              <rect x="520" y="30" width="160" height="120" rx="10" className="fill-amber-50 dark:fill-amber-950/60 stroke-amber-500" strokeWidth="2" />
              <text x="600" y="65" textAnchor="middle" className="font-bold fill-amber-700 dark:fill-amber-300 text-sm">PostgreSQL Database</text>
              <text x="600" y="90" textAnchor="middle" className="fill-slate-600 dark:fill-slate-400 text-xs">The Pantry</text>
              <text x="600" y="115" textAnchor="middle" className="fill-slate-500 text-xs">Tables & Rows</text>

              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
                </marker>
                <marker id="arrow-teal" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#14b8a6" />
                </marker>
              </defs>
            </svg>
          </div>
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 italic">
            Text alternative: The client browser sends an HTTP request over the network. The backend server verifies and processes the request, queries the PostgreSQL database for records, and returns formatted HTML or JSON.
          </p>
        </figure>
      );

    case 'diagram-box-model-layers':
      return (
        <figure className="my-6 p-4 md:p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100">
          <figcaption className="text-sm font-semibold mb-4 text-indigo-600 dark:text-indigo-400">
            {title || 'The 4 Concentric Layers of the CSS Box Model'}
          </figcaption>
          <div className="w-full flex justify-center">
            <div className="w-full max-w-md p-4 rounded-xl border-2 border-dashed border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 text-center text-xs">
              <span className="font-bold text-amber-700 dark:text-amber-400">Margin (Outer clear space)</span>
              <div className="my-3 p-4 rounded-lg border-2 border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20">
                <span className="font-bold text-indigo-700 dark:text-indigo-400">Border (Visual edge)</span>
                <div className="my-3 p-4 rounded-md border-2 border-teal-500 bg-teal-50/50 dark:bg-teal-950/20">
                  <span className="font-bold text-teal-700 dark:text-teal-400">Padding (Inner clear space)</span>
                  <div className="my-3 p-4 rounded bg-white dark:bg-slate-800 shadow-sm border border-slate-300 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-200">
                    Content (Text, Images, Video)
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 italic">
            Text alternative: The CSS Box Model consists of Content inside Padding, bounded by Border, with Margin providing spacing from neighboring elements.
          </p>
        </figure>
      );

    default:
      return (
        <figure className="my-6 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-sm mb-2">
            <span>⚙️ System Architecture Flow</span>
          </div>
          <div className="p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-xs">
            Client Browser &rarr; HTTPS TLS Gateway &rarr; Next.js App Router (Zod Validation) &rarr; Drizzle ORM &rarr; Neon Serverless PostgreSQL
          </div>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Text alternative: Secure end-to-end data pipeline from client browser through cryptographic validation layers into serverless relational storage.
          </p>
        </figure>
      );
  }
}
