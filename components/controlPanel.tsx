import { useRef, useState } from "react";
interface Props {
    backgroundImage?: string;
    onChangeBG: (wallpaper: string) => void;
    closeMe: () => void;
}

const ControlPanel = (props: Props) => {
    const inputFile = useRef(null)
    const [selectedFile, setSelectedFile] = useState('');

    return <div className="w-full flex flex-col pt-4">
        <div className="border-l-gray-200 border-t-gray-200 border-r-gray-600 border-b-0 border-[1.6px] rounded-tl-lg w-[30%] mb-[-4px] z-50 bg-[#C1C1C1] text-center text-small">Background</div>
        <div className="flex-col border-l-gray-200 border-t-gray-200 border-r-gray-600 border-b-gray-600 border-[1.6px] w-[100%] flex aspect-[1.4] m-auto pt-2">
            <div className="w-[90%] aspect-[1.3] m-auto"
                style={
                    {
                        backgroundImage: "url(/assets/cp_bg.png)",
                        backgroundSize: "100% 100%"
                    }
                }>
                <div className="border-2 ml-[12%] w-[74%] mt-[9%] h-[68%] bg-[#008081]"
                    style={
                        {
                            backgroundImage: `url(${selectedFile || props.backgroundImage})`,
                            backgroundSize: 'cover',
                        }
                    }
                />
            </div>

            <div className="w-full flex items-center justify-center">
                <input onChange={(e: any) => {
                    if (e.target.files && e.target.files[0]) {
                        var reader = new FileReader();
                        reader.onload = (event: any) => {
                            setSelectedFile(event.target.result);
                        }
                        reader.readAsDataURL(e.target.files[0]);
                    }


                }} type='file' id='file' ref={inputFile} style={{ display: 'none' }} />
                <button
                    onClick={() => {
                        if (selectedFile) {
                            props.onChangeBG(selectedFile);
                            props.closeMe();
                        } else {
                            const inputFileBG: any = inputFile;
                            inputFileBG.current.click();
                        }
                    }}
                    className="btn w-auto h-[35px] m-auto my-2">
                    {selectedFile ? 'OK' : 'Change Background'}
                </button>
            </div>
        </div>
    </div >;
}

export default ControlPanel;
