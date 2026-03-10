// Usage:
// <Footer />
//
// Minimal centered footer with pixel-style dashed top border decoration.
// Author name in text-slate-500, tech stack in pixel font.
// Pixel star decoration before "Built with" using CSS box-shadow technique.
// No animations — static, low visual weight.

export function Footer({ className = '' }: { className?: string }) {
  return (
    <footer
      className={`border-t-2 border-dashed border-navy-lightest/30 py-10 px-6 ${className}`}
      aria-label="Site footer"
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 text-center">

        {/* Pixel star decoration (CSS box-shadow, 5x5 pixel cross pattern) */}
        <div
          className="flex justify-center mb-4"
          aria-hidden="true"
        >
          <div
            className="w-[3px] h-[3px]"
            style={{
              backgroundColor: 'transparent',
              boxShadow: `
                6px 0px 0 0 rgb(52 211 153 / 0.25),
                0px 6px 0 0 rgb(52 211 153 / 0.25),
                3px 3px 0 0 rgb(52 211 153 / 0.5),
                6px 6px 0 0 rgb(52 211 153 / 0.25),
                12px 0px 0 0 rgb(52 211 153 / 0.25),
                0px 12px 0 0 rgb(52 211 153 / 0.25),
                12px 6px 0 0 rgb(52 211 153 / 0.25),
                6px 12px 0 0 rgb(52 211 153 / 0.25),
                12px 12px 0 0 rgb(52 211 153 / 0.25),
                9px 9px 0 0 rgb(52 211 153 / 0.4)
              `,
            }}
          />
        </div>

        <p className="leading-relaxed">
          <span className="text-xs text-slate-500">游承緯</span>
          <span
            className="text-slate-600 font-mono"
            style={{ fontFamily: "'Press Start 2P'", fontSize: '0.55rem' }}
          >
            {' '}· Built with React + TypeScript · 2026
          </span>
        </p>

        {/* Pixel border bottom accent line */}
        <div className="flex justify-center gap-1 mt-4" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-0.5 bg-navy-lightest/30"
            />
          ))}
        </div>

      </div>
    </footer>
  )
}
