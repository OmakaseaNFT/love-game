import Etherscan from '../../assets/skins/slavecoin/etherscan.png'
import Farm from '../../assets/skins/slavecoin/farm.png'
import Background from '../../assets/skins/slavecoin/background.png'
import Paper from '../../assets/skins/slavecoin/paper.png'
import Uniswap from '../../assets/skins/slavecoin/uniswap.png'
import Wallet from '../../assets/skins/slavecoin/wallet.png'
import { FileThemeCustomOptions } from '../../system/context/FileThemeContext'

const themeMap : Partial<FileThemeCustomOptions> = {
    Etherscan,
    Farm,
    Paper,
    Uniswap,
    Wallet,
    background: '/assets/skins/slavecoin/slavecoin_background.png',
    telegram: '/assets/logo_telegram.png',
    twitter: '/assets/logo_twitter.png'
}

export default themeMap