import { useRef, useState } from "react";
import { ControlPanelTab } from "./ui/ControlPanelTab";
import { Background } from "./background";
import { FileTheme } from "./filetheme";
interface Props {
    backgroundImage?: string;
    onChangeBG: (wallpaper: string) => void;
    closeMe: () => void;
}

const ControlPanel = ({ backgroundImage, onChangeBG, closeMe }: Props) => {
    const inputFile = useRef(null)
    const [tab, setTab] = useState<'background' | 'file theme'>('background')
    const [selectedFile, setSelectedFile] = useState('');
    return <div className="w-full flex flex-col pt-4">
        <div className="flex flex-row">
            <ControlPanelTab 
                title="Background"
                isSelected={tab === 'background'}
                onClick={() => setTab('background')}
            />
            <ControlPanelTab 
                title="File Themes"
                isSelected={tab === 'file theme'} 
                onClick={() => setTab('file theme')}
            />
        </div>
        <div className="flex-col border-l-gray-200 border-t-gray-200 border-r-gray-600 border-b-gray-600 border-[1.6px] w-[100%] flex aspect-[1.4] m-auto pt-2">
            {tab === 'background' && <Background 
                closeMe={closeMe}
                onChangeBG={onChangeBG}
                backgroundImage={backgroundImage}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                inputFile={inputFile}
            />}
            {tab === 'file theme' && <FileTheme />}
        </div>
    </div >;
}

export default ControlPanel;
