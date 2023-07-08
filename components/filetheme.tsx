import { useContext } from "react";
import { FileThemeContext } from "../system/context/FileThemeContext";

interface FileThemeProps {

}
export const FileTheme = ({  }: FileThemeProps) => {
    const { setFileTheme } = useContext(FileThemeContext)
    return <div>
        <button onClick={() => setFileTheme('love')}>Love</button>
        <button onClick={() => setFileTheme('slavecoin')}>Slavecoin</button>
    </div>
}