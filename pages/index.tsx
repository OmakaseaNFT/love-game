"use client";
import Win98 from "./win98/index";

export default function Start() {
  return (
    <div className="w-screen h-screen flex relative overflow-hidden font-main">
      {/* Funny enough and don't understand why but, these comment lines are required or the fonts wouldn't display correctly*/}
      {/* <div className={`${"theme-vaporwave-arcade"}`}/> */}
      {/* <div className={`${"theme-love"}`}/> */}
      <Win98 lock={false} />
    </div>
  );
}
