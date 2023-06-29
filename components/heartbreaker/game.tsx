import React, { useState, useRef, useEffect, useContext } from "react";
import { gsap, TweenLite, TweenMax } from "gsap";
import Image from "next/image";
import Heart from "../../assets/heart_beating.gif";
import HeartStatic from "../../assets/heart-static.svg";
import HeartBreakImage from "../../assets/half-heart-break.svg";
import { useHeartbreakerGameEngine } from "./useHeartbreakerGameEngine";
import { io } from "socket.io-client";
import { HEARTBREAKER_SOCKET_URL } from "../../utils/constant";
import { HeartBreakerContext } from "../../system/context/HeartbreakerContext";

gsap.registerPlugin(TweenLite);

const Game = () => {
  const [bgImage, setBgImage] = useState("/assets/screen-bg.jpg");
  const bgImage2 = "/assets/bg-loop.png";
  const [isAnimating, setIsAnimating] = useState(true);
  const bgRef = useRef(null);
  const heartRef: any = useRef(null);
  const tween: any = useRef(null);
  const heartTween: any = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 40, height: 40 });
  const [heartImage, setHeartImage] = useState(HeartStatic);
  const [bottomSpace, setBottomSpace] = useState(false);
  const {
    balance,
    mult,
    gameIsLive,
    gameTimer,
    onBet,
    onStop,
    onDeposit,
    onGetBalance,
    onSocketInit,
  } = useContext(HeartBreakerContext);
  const startSound = useRef(new Audio("/assets/beat.mp3"));
  const stopSound = useRef(new Audio("/assets/break.wav"));

  startSound.current.loop = true;

  useEffect(() => {
    TweenLite.set(bgRef.current, {
      backgroundPosition: "0 100%",
    });
    tween.current = TweenLite.to(bgRef.current, 20, {
      backgroundPosition: "0 0%",
      paused: true,
      ease: "none",
      onComplete: () => {
        if (bgImage !== bgImage2) {
          setBgImage(bgImage2);
        } else {
          setBgImage("/assets/screen-bg.png");
        }
        tween.current.restart();
      },
    });

    heartTween.current = gsap.to(heartRef.current.firstChild, 25, {
      css: {
        height: "200px",
        width: "200px",
        transformOrigin: "50% 50%",
        transform: "translateY(35px)",
      },
      onComplete: () => {
        tween.current.restart();
      },
      paused: true,
    });
  }, []);

  const handleStartStopClick = () => {
    if (isAnimating) {
      startSound.current.play();
      setHeartImage(Heart);
      setBottomSpace(true);
      heartTween.current.resume();
    }
  };

  const handleStop = () => {
    if (isAnimating && bottomSpace) {
      setDimensions({
        width: heartRef.current.firstChild.offsetWidth,
        height: heartRef.current.firstChild.offsetHeight,
      });

      heartRef.current.firstChild.style.width = `${
        heartRef.current.firstChild.offsetWidth - 20
      }px`;
      heartRef.current.firstChild.style.height = `${
        heartRef.current.firstChild.offsetHeight - 20
      }px`;
      heartRef.current.firstChild.style.transform = `translateY(2px)`;
      setIsAnimating(false);
      tween.current.pause();
      heartTween.current.pause();
      setBottomSpace(false);

      startSound.current.pause();
      startSound.current.currentTime = 0;
      stopSound.current.play();
    }
  };

  const handleResetClick = () => {
    setBottomSpace(false);
    setIsAnimating(true);
    setHeartImage(HeartStatic);
    setBgImage("/assets/screen-bg.jpg");
    TweenLite.set(bgRef.current, {
      backgroundPosition: "0 100%",
    });

    if (tween.current) {
      tween.current.progress(0).pause();
    }

    TweenLite.set(heartRef.current, {
      scale: 1,
    });

    TweenLite.set(heartRef.current.firstChild, {
      css: {
        height: "40px",
        width: "40px",
        transformOrigin: "50% 50%",
      },
    });

    if (heartTween.current) {
      heartTween.current.progress(0).pause();
    }

    startSound.current.pause();
    startSound.current.currentTime = 0;
  };

  useEffect(() => {
    if (gameIsLive) {
      handleStartStopClick();
    }
    if (!gameIsLive) {
      handleStop();
      setTimeout(() => {
        handleResetClick();
      }, 5000);
    }
  }, [gameIsLive]);

  return (
    <div className="relative inverseBorderStyle w-full h-full">
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-no-repeat flex"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
        }}
      >
        {!gameIsLive && (
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#08080880",
              zIndex: 100,
            }}
          >
            <span style={{ margin: "auto", color: "white" }}>
              <p>NEXT GAME IN</p>
              <p style={{ position: "absolute", marginLeft: "2rem" }}>
                {gameTimer / 100}
              </p>
            </span>
          </div>
        )}
        <div
          ref={heartRef}
          className={`absolute inset-0 flex items-end justify-center -ml-1 ${
            bottomSpace ? "bottom-[48px]" : "bottom-[53px]"
          }
          }`}
        >
          <Image
            src={isAnimating ? heartImage : HeartBreakImage}
            width={dimensions.width}
            height={dimensions.height}
            alt="heart"
            className={`transition-opacity duration-500 ${
              !isAnimating ? "bottom-[53px]" : ""
            }`}
          />
        </div>
        <div className="flex flex-row absolute top-1 left-1">
          <p className="text-white">x{mult}</p>
          {/* <button
            className="text-white mb-5 ml-5 mt-5"
            onClick={handleResetClick}
          >
            Reset
          </button>
          <button
            className="text-white mb-5 ml-5 mt-5 text-white"
            onClick={handleStop}
          >
            Stop
          </button>

          <button className="text-white ml-5" onClick={handleStartStopClick}>
            Start
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Game;
