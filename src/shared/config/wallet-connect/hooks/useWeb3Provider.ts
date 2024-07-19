import { useContext } from 'react';
import { Web3Context } from 'app/providers';

import { useDefaultWeb3Provider } from './useDefaultWeb3Provider';

export const useWalletConnectorContext = () => useContext(Web3Context);

export const useWeb3Provider = () => {
  const { walletService } = useWalletConnectorContext();
  const defaultWeb3Provider = useDefaultWeb3Provider();
  const web3Provider = walletService.Web3();
  return web3Provider || defaultWeb3Provider;
};
