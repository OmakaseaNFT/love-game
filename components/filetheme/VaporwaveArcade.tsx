import Etherscan from '../../assets/skins/vaporwave-arcade/etherscan.png'
import Farm from '../../assets/skins/vaporwave-arcade/farm.png'
import Paper from '../../assets/skins/vaporwave-arcade/paper.png'
import Uniswap from '../../assets/skins/vaporwave-arcade/uniswap.png'
import Wallet from '../../assets/skins/vaporwave-arcade/wallet.png'
import { FileThemeCustomOptions } from '../../system/context/FileThemeContext'

const themeMap : Partial<FileThemeCustomOptions> = {
    name: 'Vaporwave Arcade',
    Etherscan,
    Farm,
    Paper,
    Uniswap,
    Wallet,
    startIcon: '/assets/skins/vaporwave-arcade/start-icon.gif',
    closeIcon: '/assets/skins/vaporwave-arcade/close.png',
    background: '/assets/skins/vaporwave-arcade/background.gif',
    telegram: '/assets/skins/vaporwave-arcade/logo_telegram.png',
    twitter: '/assets/skins/vaporwave-arcade/logo_twitter.png',
}

export default themeMap