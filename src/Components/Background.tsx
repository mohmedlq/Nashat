import React from "react";

const Background: React.FC = () => {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.035]"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
};

export default Background;
