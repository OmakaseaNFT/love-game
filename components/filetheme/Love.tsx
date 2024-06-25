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
import BridgeIcon from "../../assets/bridge-icon.png";
import MglthIcon from "../../assets/mglth-icon.png";
import ChiaIcon from "../../assets/chia-icon.png";
import GobyIcon from "../../assets/goby-icon.png";
import CLinksIcon from "../../assets/clinks-icon.png";
import SpaceIcon from "../../assets/space-icon.png";
import MintIcon from "../../assets/mint-icon.svg";
import TradeIcon from "../../assets/chia-icon.png";
import DexieIcon from "../../assets/dexie-icon.svg";
import TibetIcon from "../../assets/tibet-icon.jpg";
import FarmerIcon from "../../assets/farmer-icon.jpg";



import { FileThemeCustomOptions } from '../../system/context/FileThemeContext'

const themeMap : Partial<FileThemeCustomOptions> = {
    name: 'Default',
    EtherscanIcon,
    LoveIcon,
    FireIcon,
    FarmIcon,
    PaperIcon,
    BridgeIcon,
    MglthIcon,
    UniswapIcon,
    WalletIcon,
    ChiaIcon,
    GobyIcon,
    SpaceIcon,
    MintIcon, 
    TradeIcon, 
    DexieIcon, 
    TibetIcon, 
    FarmerIcon,
    CLinksIcon,
    SettingsIcon,
    ShutdownIcon,
    startLoveIcon: '/assets/startLove.png',
    startIcon: '/assets/start-icon.png',
    closeIcon: "/assets/win98Close.png",
    background: '/assets/lovegame_background.png',
    TelegramIcon: '/assets/logo_telegram.png',
    TwitterIcon: '/assets/logo_twitter.png',
    DiscordIcon: '/assets/logo_twitter.png',
    heartbreakIcon: '/assets/start-icon.png',
    heartbreakActiveButton: ActiveButton,
    heartbreakExitButton: ExitButton,
    heartbreakDeadButton: DeadButton,
}

export default themeMap