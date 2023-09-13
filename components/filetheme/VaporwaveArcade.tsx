import EtherscanIcon from '../../assets/skins/vaporwave-arcade/etherscan.png'
import LoveIcon from '../../assets/skins/vaporwave-arcade/love-icon.png'
import FireIcon from '../../assets/skins/vaporwave-arcade/fire-icon.png'
import FarmIcon from '../../assets/skins/vaporwave-arcade/farm.png'
import PaperIcon from '../../assets/skins/vaporwave-arcade/paper.png'
import UniswapIcon from '../../assets/skins/vaporwave-arcade/uniswap.png'
import WalletIcon from '../../assets/skins/vaporwave-arcade/wallet.png'
import ShutdownIcon from '../../assets/skins/vaporwave-arcade/shutdown.png'
import SettingsIcon from '../../assets/skins/vaporwave-arcade/settings.png'
import { FileThemeCustomOptions } from '../../system/context/FileThemeContext'
import DeadButton from "../../assets/skins/vaporwave-arcade/dead-game-button.png";
import ExitButton from "../../assets/skins/vaporwave-arcade/exit-button.png";
import ActiveButton from "../../assets/skins/vaporwave-arcade/active-game-button.png";

const themeMap : Partial<FileThemeCustomOptions> = {
    name: 'Vaporwave Arcade',
    EtherscanIcon,
    LoveIcon,
    FireIcon,
    FarmIcon,
    PaperIcon,
    UniswapIcon,
    WalletIcon,
    SettingsIcon,
    ShutdownIcon,
    startLoveIcon: '/assets/skins/vaporwave-arcade/startLove.png',
    startIcon: '/assets/skins/vaporwave-arcade/start-icon.gif',
    closeIcon: '/assets/skins/vaporwave-arcade/close.png',
    background: '/assets/skins/vaporwave-arcade/background.gif',
    telegram: '/assets/skins/vaporwave-arcade/logo_telegram.png',
    twitter: '/assets/skins/vaporwave-arcade/logo_twitter.png',
    heartbreakIcon: '/assets/skins/vaporwave-arcade/heartbreak.png',
    heartbreakActiveButton: ActiveButton,
    heartbreakExitButton: ExitButton,
    heartbreakDeadButton: DeadButton,
}

export default themeMap