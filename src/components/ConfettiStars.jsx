import React from "react";
import confetti from "canvas-confetti";

function ConfettiStars() {
  return (
    <div className="ml-2 md:ml-52 lg:ml-72 mt-10 flex">
      <button
        className="cursor-pointer"
        onClick={() => {
          confetti({
            particleCount: 10,
            shapes: ["star"],
            spread: 360,
            startVelocity: 25,
          });
        }}
      >
        Click me!
      </button>
    </div>
  );
}

export default ConfettiStars;
