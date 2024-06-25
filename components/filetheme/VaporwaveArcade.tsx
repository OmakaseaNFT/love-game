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

const themeMap : Partial<FileThemeCustomOptions> = {
    name: 'Vaporwave Arcade',
    EtherscanIcon,
    LoveIcon,
    FireIcon,
    FarmIcon,
    PaperIcon,
    UniswapIcon,
    WalletIcon,
    BridgeIcon,
    MglthIcon,
    ChiaIcon,
    GobyIcon,
    CLinksIcon,
    SpaceIcon,
    MintIcon, 
    TradeIcon, 
    DexieIcon, 
    TibetIcon, 
    FarmerIcon,
    SettingsIcon,
    ShutdownIcon,
    startLoveIcon: '/assets/skins/vaporwave-arcade/startLove.png',
    startIcon: '/assets/skins/vaporwave-arcade/start-icon.gif',
    closeIcon: '/assets/skins/vaporwave-arcade/close.png',
    background: '/assets/skins/vaporwave-arcade/background.gif',
    TelegramIcon: '/assets/skins/vaporwave-arcade/logo_telegram.png',
    TwitterIcon: '/assets/skins/vaporwave-arcade/logo_twitter.png',
    DiscordIcon: '/assets/skins/vaporwave-arcade/logo_discord.png',
    heartbreakIcon: '/assets/skins/vaporwave-arcade/heartbreak.png',
    heartbreakActiveButton: ActiveButton,
    heartbreakExitButton: ExitButton,
    heartbreakDeadButton: DeadButton,
}

export default themeMap