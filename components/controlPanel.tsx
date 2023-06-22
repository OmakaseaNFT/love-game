"use client";

import { useAppStore } from "@/system/stores/appStore";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const ControlPanel = () => {
  const router = useRouter();
  const { wallpaper } = useAppStore();

  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState("");

  return (
    <div className="flex flex-col w-full pt-4">
      <div className="border-l-gray-200 border-t-gray-200 border-r-gray-600 border-b-0 border-[1.6px] rounded-tl-lg w-[30%] mb-[-4px] z-50 bg-[#C1C1C1] text-center text-small">
        Background
      </div>
      <div className="flex-col border-l-gray-200 border-t-gray-200 border-r-gray-600 border-b-gray-600 border-[1.6px] w-[100%] flex aspect-[1.4] m-auto pt-2">
        <div
          className="w-[90%] aspect-[1.3] m-auto"
          style={{
            backgroundImage: "url(/assets/cp_bg.png)",
            backgroundSize: "100% 100%",
          }}
        >
          <div
            className="border-2 ml-[12%] w-[74%] mt-[9%] h-[68%] bg-[#008081]"
            style={{
              backgroundImage: `url(${selectedFile ?? wallpaper})`,
              backgroundSize: "cover",
            }}
          />
        </div>

        <div className="flex items-center justify-center w-full">
          <input
            onChange={(e: any) => {
              if (e.target.files && e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = (event: any) => {
                  setSelectedFile(event.target.result);
                };
                reader.readAsDataURL(e.target.files[0]);
              }
            }}
            type="file"
            id="file"
            ref={inputFile}
            style={{ display: "none" }}
          />
          <button
            onClick={() => {
              if (selectedFile) {
                useAppStore.setState({ wallpaper: selectedFile });
                router.push("/");
              } else {
                const inputFileBG: any = inputFile;
                inputFileBG.current.click();
              }
            }}
            className="btn w-auto h-[35px] m-auto my-2"
          >
            {selectedFile ? "OK" : "Change Background"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
