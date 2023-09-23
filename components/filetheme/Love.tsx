import Etherscan from '../../assets/etherscan.png'
import Farm from '../../assets/tree.png'
import Love from '../../assets/love-icon.png'
import Fire from '../../assets/fire-icon.png'
import Paper from '../../assets/book.png'
import Uniswap from '../../assets/uniswap.png'
import Wallet from '../../assets/wallet.png'
import Shutdown from '../../assets/shutdown.png'
import Settings from '../../assets/settings.png'
import DeadButton from "../../assets/dead-game-button.png";
import ExitButton from "../../assets/exit-button.png";
import ActiveButton from "../../assets/active-game-button.png";
import { FileThemeCustomOptions } from '../../system/context/FileThemeContext'

const themeMap : Partial<FileThemeCustomOptions> = {
    name: 'Default',
    EtherscanIcon: Etherscan,
    FarmIcon: Farm,
    LoveIcon: Love,
    FireIcon: Fire,
    PaperIcon: Paper,
    UniswapIcon: Uniswap,
    WalletIcon: Wallet,
    SettingsIcon: Settings,
    ShutdownIcon: Shutdown,
    startLoveIcon: '/assets/startLove.png',
    startIcon: '/assets/start-icon.png',
    closeIcon: "/assets/win98Close.png",
    background: '/assets/lovegame_background.png',
    TelegramIcon: '/assets/logo_telegram.png',
    DiscordIcon: '/assets/logo_discord.png',
    TwitterIcon: '/assets/logo_twitter.png',
    heartbreakIcon: '/assets/start-icon.png',
    heartbreakActiveButton: ActiveButton,
    heartbreakExitButton: ExitButton,
    heartbreakDeadButton: DeadButton,
}

export default themeMap