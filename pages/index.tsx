"use client";

import Win98 from "./win98/index";

export default function Start() {
  return (
    <div className="w-screen h-screen flex relative overflow-hidden">
      <Win98 lock={false} />
    </div>
  );
}
