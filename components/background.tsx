interface BackgroundProps {
    selectedFile: string;
    backgroundImage?: string;
    setSelectedFile: (file: string) => void;
    inputFile: any;
    onChangeBG: (wallpaper: string) => void;
    closeMe: () => void;
}
export const Background = ({ selectedFile, backgroundImage, setSelectedFile, inputFile, onChangeBG, closeMe }: BackgroundProps) => {
    return <>
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
                        backgroundImage: `url(${selectedFile || backgroundImage})`,
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
                        onChangeBG(selectedFile);
                        closeMe();
                    } else {
                        const inputFileBG: any = inputFile;
                        inputFileBG.current.click();
                    }
                }}
                className="btn w-auto h-[35px] m-auto my-2">
                {selectedFile ? 'OK' : 'Change Background'}
            </button>
        </div>
    </>
}