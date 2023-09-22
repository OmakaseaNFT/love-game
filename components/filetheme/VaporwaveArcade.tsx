import Etherscan from '../../assets/skins/vaporwave-arcade/etherscan.png'
import Farm from '../../assets/skins/vaporwave-arcade/farm.png'
import Love from '../../assets/skins/vaporwave-arcade/love-icon.png'
import Fire from '../../assets/skins/vaporwave-arcade/fire-icon.png'
import Paper from '../../assets/skins/vaporwave-arcade/paper.png'
import Uniswap from '../../assets/skins/vaporwave-arcade/uniswap.png'
import Wallet from '../../assets/skins/vaporwave-arcade/wallet.png'
import Shutdown from '../../assets/skins/vaporwave-arcade/shutdown.png'
import Settings from '../../assets/skins/vaporwave-arcade/settings.png'
import { FileThemeCustomOptions } from '../../system/context/FileThemeContext'
import DeadButton from "../../assets/skins/vaporwave-arcade/dead-game-button.png";
import ExitButton from "../../assets/skins/vaporwave-arcade/exit-button.png";
import ActiveButton from "../../assets/skins/vaporwave-arcade/active-game-button.png";

const themeMap : Partial<FileThemeCustomOptions> = {
    name: 'Vaporwave Arcade',
    EtherscanIcon: Etherscan,
    FarmIcon: Farm,
    LoveIcon: Love,
    FireIcon: Fire,
    PaperIcon: Paper,
    UniswapIcon: Uniswap,
    WalletIcon: Wallet,
    SettingsIcon: Settings,
    ShutdownIcon: Shutdown,
    startLoveIcon: '/assets/skins/vaporwave-arcade/startLove.png',
    startIcon: '/assets/skins/vaporwave-arcade/start-icon.gif',
    closeIcon: '/assets/skins/vaporwave-arcade/close.png',
    background: '/assets/skins/vaporwave-arcade/background.gif',
    TelegramIcon: '/assets/skins/vaporwave-arcade/logo_telegram.png',
    DiscordIcon: '/assets/skins/vaporwave-arcade/logo_discord.png',
    TwitterIcon: '/assets/skins/vaporwave-arcade/logo_twitter.png',
    heartbreakIcon: '/assets/skins/vaporwave-arcade/heartbreak.png',
    heartbreakActiveButton: ActiveButton,
    heartbreakExitButton: ExitButton,
    heartbreakDeadButton: DeadButton,
}

export default themeMap