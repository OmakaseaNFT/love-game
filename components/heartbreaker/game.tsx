import React, { useState, useRef, useEffect, useContext } from "react";
import { gsap, TweenLite, TweenMax } from "gsap";
import Image from "next/image";
import Heart from "../../assets/heart_beating.gif";
import HeartStatic from "../../assets/heart-static.svg";
import HeartBreakImage from "../../assets/half-heart-break.svg";
import { HeartBreakerContext } from "../../system/context/HeartbreakerContext";

gsap.registerPlugin(TweenLite);

const Game = () => {
  const [bgImage, setBgImage] = useState("/assets/screen-bg.jpg");
  const bgImage2 = "/assets/bg-loop.png";
  const [isAnimating, setIsAnimating] = useState(false);
  const bgRef = useRef(null);
  const heartRef: any = useRef(null);
  const tween: any = useRef(null);
  const heartTween: any = useRef(null);
  const [switchImage, setSwitchImage] = useState(false);
  const [crack, setCrack] = useState(false);
  const [breakWidth, setBreakWidth] = useState({
    width: 0,
    height: 0,
    translate: 0,
  });
  const {
    mult,
    gameIsLive,
    gameTimer,
    startAnimation
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
  }, []);

  useEffect(() => {
    if (switchImage && heartRef.current) {
      heartTween.current = gsap.to(heartRef.current.firstChild, 14, {
        css: {
          height: "200px",
          width: "200px",
          transformOrigin: "50% 50%",
          transform: `translateY(${35}px)`,
        },
        onComplete: () => {
          tween.current.restart();
        },
        paused: false,
      });
    }
  }, [switchImage, crack]);

  const handleStartStopClick = () => {
    startSound.current.play();
    setSwitchImage(true);
    setIsAnimating(true);
  };

  const handleStop = () => {
    let size: number;
    if (isAnimating) {
      startSound.current.pause();
      startSound.current.currentTime = 0;
      stopSound.current.play();

      if (heartRef.current) {
        const imgElement = heartRef.current.firstChild;
        const currentWidth = imgElement.offsetWidth;
        const currentHeight = imgElement.offsetHeight;
        if (imgElement.offsetWidth > 170) {
          size = 6;
        } else if (
          imgElement.offsetWidth > 100 &&
          imgElement.offsetWidth < 155
        ) {
          size = 4;
        } else if (
          imgElement.offsetWidth > 155 &&
          imgElement.offsetWidth < 170
        ) {
          size = 5;
        } else {
          size = 0;
        }
        setBreakWidth({
          width: currentWidth - currentHeight * 0.3,
          height: currentHeight - currentHeight * 0.3,
          translate: size,
        });
      }

      tween.current.pause();
      heartTween.current.pause();
      setCrack(true);
      setIsAnimating(false);
    }
  };

  const handleResetClick = () => {
    setSwitchImage(false);
    setCrack(false);
    setBgImage("/assets/screen-bg.jpg");
    TweenLite.set(bgRef.current, {
      backgroundPosition: "0 100%",
    });
    setIsAnimating(false);
    if (tween.current) {
      tween.current.progress(0).pause();
    }
    if (heartTween.current) {
      heartTween.current.progress(0).pause();
    }
    startSound.current.pause();
    startSound.current.currentTime = 0;
  };

  useEffect(() => {
    if (startAnimation) {
      handleStartStopClick();
    }
    if (!startAnimation) {
      handleStop();
      setTimeout(() => {
        handleResetClick();
      }, 5000);
    }
    return () => {
      startSound.current.pause();
    }
  }, [startAnimation]);

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
              zIndex: 101,
            }}
          >
            <span style={{ margin: "auto", color: "white" }}>
              <p>NEXT GAME IN</p>
              <p style={{ position: "absolute", right: "50%" }}>
                {!(gameTimer / 100) ? "" : gameTimer / 100}
              </p>
            </span>
          </div>
        )}
        {!startAnimation && (
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
          </div>
        )}
        <div
          ref={heartRef}
          className={`absolute inset-0 flex items-end justify-center -ml-1 
          bottom-[53px]`}
        >
          {!crack ? (
            switchImage ? (
              <div ref={heartRef}>
                <Image
                  src={Heart}
                  width={500}
                  height={500}
                  alt="ntap"
                  className="h-14 w-14 -mb-2"
                />
              </div>
            ) : (
              <Image
                src={HeartStatic}
                width={40}
                height={40}
                alt="ntap"
                className="h-10 w-10"
              />
            )
          ) : (
            <Image
              src={HeartBreakImage}
              width={breakWidth.width}
              height={breakWidth.height}
              alt="ntap"
              style={{ transform: `translateY(${breakWidth.translate}px)` }}
            />
          )}
        </div>
        <div className="flex flex-row absolute bottom-1 right-[20%] h-[20px] w-[50px]">
          <span className="text-white relative text-bold text-[1.3rem]">
            <p className="absolute">x{mult.toFixed(2)}</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Game;
