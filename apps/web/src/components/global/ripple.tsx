import React from 'react';

// Modify these
const MAIN_CIRCLE_SIZE = 210;
const MAIN_CIRCLE_OPACITY = 0.3;
const NUM_CIRCLES = 10;

const Ripple = React.memo(function Ripple() {
  return (
    <div className="absolute inset-0 -z-10 bg-slate-900">
      <div className="absolute left-1/2 top-1/2 -z-10 h-full w-full overflow-visible opacity-20">
        {Array.from({ length: NUM_CIRCLES }, (_, i) => (
          <div
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2 animate-ripple rounded-full bg-white"
            style={{
              width: MAIN_CIRCLE_SIZE + i * 70,
              height: MAIN_CIRCLE_SIZE + i * 70,
              opacity: MAIN_CIRCLE_OPACITY - i * 0.03,
              animationDelay: `${i * 0.06}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
});

export default Ripple;
