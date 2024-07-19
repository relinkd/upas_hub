import { Box } from '@mui/material';
import { Chains, CoinbaseLogo, Icon, WalletProviders } from 'shared';

export enum TextVariants {
  Metamask = 'Metamask',
  WalletConnect = 'Wallet Connect',
  CoinbaseWallet = 'Coinbase Wallet',
}

export const walletsOptions = [
  {
    provider: WalletProviders.metamask,
    chain: Chains.Polygon,
    icon: <Icon type="metamask" size={80} />,
    text: TextVariants.Metamask,
  },
  {
    provider: WalletProviders.walletConnect,
    chain: Chains.Polygon,
    icon: <Icon type="wallet-connect" size={80} />,
    text: TextVariants.WalletConnect,
  },
  {
    provider: WalletProviders.walletConnect,
    chain: Chains.Polygon,
    icon: <Box component="img" src={CoinbaseLogo} width={80} height={80} />,
    text: TextVariants.CoinbaseWallet,
  },
];
