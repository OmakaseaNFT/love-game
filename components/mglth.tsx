import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

const Mglth = () => {
  const menuBars = [
    {
      text: "<u>M</u>egalith",
    },
    {
      text: "<u>T</u>v",
    },
  ];

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null); // Reference to HLS.js instance

  useEffect(() => {
    const video = videoRef.current;
    const videoSrc = "https://mglth.tv/hls/mglth.m3u8";

    const playVideo = () => {
      if (video) {
        video.play().catch((error) => {
          console.error("Autoplay was prevented:", error);
        });
      }
    };

    const initializeHls = () => {
      if (video) {
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(videoSrc);
          hls.attachMedia(video);
          hlsRef.current = hls; // Save HLS.js instance to ref
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = videoSrc;
        }
      }
    };

    initializeHls();

    // Cleanup function
    return () => {
      if (video) {
        if (hlsRef.current) {
          hlsRef.current.destroy();
        }
        if (video.srcObject) {
          video.srcObject = null;
        }
      }
    };
  }, []);

  // Calculate max height based on 70% of current screen height
  const screenHeight = window.innerHeight;
  const maxHeight = `${screenHeight * 0.55}px`;

  return (
    <div className="w-full flex flex-col">
      <div className="text-gray-500 mt-1">
        {menuBars.map((item, idx) => (
          <span
            key={idx}
            dangerouslySetInnerHTML={{ __html: item.text }}
            className="mr-2"
          />
        ))}
      </div>
      <div style={{ maxWidth: "100%", maxHeight: maxHeight, overflow: "hidden" }}>
        <video ref={videoRef} controls style={{ width: "100%", height: "100%", objectFit: "cover" }}></video>
      </div>
    </div>
  );
};

export default Mglth;
