import Etherscan from '../../assets/skins/vaporwave-arcade/etherscan.png'
import Farm from '../../assets/skins/vaporwave-arcade/farm.png'
import Paper from '../../assets/skins/vaporwave-arcade/paper.png'
import Uniswap from '../../assets/skins/vaporwave-arcade/uniswap.png'
import Wallet from '../../assets/skins/vaporwave-arcade/wallet.png'
import Shutdown from '../../assets/skins/vaporwave-arcade/shutdown.png'
import Settings from '../../assets/skins/vaporwave-arcade/settings.png'
import { FileThemeCustomOptions } from '../../system/context/FileThemeContext'

const themeMap : Partial<FileThemeCustomOptions> = {
    name: 'Vaporwave Arcade',
    Etherscan,
    Farm,
    Paper,
    Uniswap,
    Wallet,
    Settings,
    Shutdown,
    startIcon: '/assets/skins/vaporwave-arcade/start-icon.gif',
    closeIcon: '/assets/skins/vaporwave-arcade/close.png',
    background: '/assets/skins/vaporwave-arcade/background.gif',
    telegram: '/assets/skins/vaporwave-arcade/logo_telegram.png',
    twitter: '/assets/skins/vaporwave-arcade/logo_twitter.png',
    heartbreakIcon: '/assets/skins/vaporwave-arcade/heartbreak.png'
}

export default themeMap