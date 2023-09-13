import EtherscanIcon from '../../assets/etherscan.png'
import FarmIcon from '../../assets/tree.png'
import BackgroundIcon from '../../assets/background.png'
import LoveIcon from '../../assets/love-icon.png'
import FireIcon from '../../assets/fire-icon.png'
import PaperIcon from '../../assets/book.png'
import UniswapIcon from '../../assets/uniswap.png'
import WalletIcon from '../../assets/wallet.png'
import ShutdownIcon from '../../assets/shutdown.png'
import SettingsIcon from '../../assets/settings.png'
import DeadButton from "../../assets/dead-game-button.png";
import ExitButton from "../../assets/exit-button.png";
import ActiveButton from "../../assets/active-game-button.png";
import { FileThemeCustomOptions } from '../../system/context/FileThemeContext'

const themeMap : Partial<FileThemeCustomOptions> = {
    name: 'Default',
    EtherscanIcon,
    LoveIcon,
    FireIcon,
    FarmIcon,
    PaperIcon,
    UniswapIcon,
    WalletIcon,
    SettingsIcon,
    ShutdownIcon,
    startLoveIcon: '/assets/startLove.png',
    startIcon: '/assets/start-icon.png',
    closeIcon: "/assets/win98Close.png",
    background: '/assets/lovegame_background.png',
    telegram: '/assets/logo_telegram.png',
    twitter: '/assets/logo_twitter.png',
    heartbreakIcon: '/assets/start-icon.png',
    heartbreakActiveButton: ActiveButton,
    heartbreakExitButton: ExitButton,
    heartbreakDeadButton: DeadButton,
}

export default themeMap