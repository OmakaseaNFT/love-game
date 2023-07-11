import React, { useContext, useEffect, useState } from "react";
import { FileThemeContext } from "../system/context/FileThemeContext";
import Image from "next/image";

interface LoveAlertsProps {
  hide: boolean;
  setHide: React.Dispatch<React.SetStateAction<boolean>>;
  setFinish: () => void;
}

interface Box {
  id: number;
  style: {
    left: number;
    top: number;
    width: number;
  };
  msg: string;
}

const LoveAlerts: React.FC<LoveAlertsProps> = ({
  hide,
  setHide,
  setFinish,
}) => {
  const { files: { startIcon, closeIcon }} = useContext(FileThemeContext);
  const [count, setCount] = useState<number>(0);
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [windWH, setWindWH] = useState<any>(null);

  const messages = ["Pepe", "Chicken", "Coffee", "Fart", "LOL", "Call Ur Mom"];

  function getRandomMessage(i: number): string {
    // Always show LOVE as a message in the 7th box
    if (i === 6) {
      return "LOVE";
    }

    const randIdx = Math.floor(Math.random() * messages.length);
    return messages[randIdx];
  }

  function generateBox(i: number): Box {
    const boxWidth = 250; //Math.floor(Math.random() * (300 - 200) + 200); // Box width in range 200-300
    const boxHeight = boxWidth * 1.6;

    var left = !windWH ? 0 : Math.floor(Math.random() * (windWH[0] - boxWidth));
    var top = !windWH ? 0 : Math.floor(Math.random() * (windWH[1] - boxHeight));

    return {
      id: i,
      style: {
        left: left,
        top: top,
        width: boxWidth,
      },
      msg: getRandomMessage(i),
    };
  }

  function closeBox(id: number) {
    setBoxes(boxes.filter((box) => box.id !== id));
    setCount(count - 1);
  }

  function boxAction(box: Box) {
    if (box.msg === "LOVE") {
      setHide(true);
      setFinish();
    }
    closeBox(box.id);
  }

  useEffect(() => {
    if (window) {
      setWindWH([
        window.innerWidth > 800 ? 800 : window.innerWidth,
        window.innerHeight > 600 ? 600 : window.innerHeight,
      ]);
    }
  }, []);

  useEffect(() => {
    if (hide) {
      return;
    }
    const interval = setInterval(() => {
      if (count < 8) {
        setBoxes((prevBoxes) => [...prevBoxes, generateBox(count)]);
        setCount((prevCount) => prevCount + 1);
      } else {
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [count, boxes, hide]);

  if (hide) {
    return null;
  }

  return (
    <div
      id="containerRef"
      className="flex flex-col absolute w-full h-full sm:w-[800px] sm:h-[600px] overflow-hidden"
    >
      {boxes.map((box) => (
        <div
          key={box.id}
          className="crazyAlert absolute bg-gray-300 border-2 border-gray-300 border-r-2 border-b-2"
          style={box.style}
        >
          <div className="header text-white bg-blue-900 p-1 text-xs">
            <img
              src={closeIcon}
              onClick={() => boxAction(box)}
              className="closeBtn float-right h-full cursor-pointer"
              alt=""
            />
          </div>

          <div className="flex flex-row">
            <div className="w-[30%] flex">
              {box.msg == "LOVE" ? (
                <Image
                  src={startIcon}
                  onClick={() => boxAction(box)}
                  className="my-auto ml-[20px]"
                  width={50}
                  height={50}
                  alt=""
                />
              ) : (
                <img
                  src="/assets/exclamationMark.png"
                  onClick={() => boxAction(box)}
                  className="my-auto ml-[20px]"
                  width={60}
                  alt=""
                />
              )}
            </div>

            <div className="flex flex-col items-center justify-center w-[60%]">
              <div className="mt-[10px] text-center text-lg">
                {" "}
                the Message is...
              </div>

              <div className="action flex">
                <button
                  onClick={() => boxAction(box)}
                  className="mx-auto px-5 bg-gray-200 border-3 border-gray-200 border-r-3 border-b-3 text-lg"
                >
                  {box.msg}
                </button>
              </div>
            </div>

            <div className="w-[10%]" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoveAlerts;
