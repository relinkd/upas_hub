import { ConnectWallet } from '@amfi/connect-wallet';
import { IConnect, IConnectorMessage, IError } from '@amfi/connect-wallet/dist/interface';
import { notifyText } from 'shared/config';
import { getToastMessage } from 'shared/lib';

import { chains, connectWallet as connectWalletConfig } from './chains';
import { Chains, ChainType, WalletProviders } from './types';

export class WalletService {
  public connectWallet: ConnectWallet;

  constructor() {
    this.connectWallet = new ConnectWallet();
  }

  public async initWalletConnect(
    providerName: WalletProviders,
    chainName: Chains,
    type: ChainType,
  ): Promise<boolean | IConnectorMessage> {
    const { provider, network, settings } = connectWalletConfig(chainName, type);

    try {
      const connecting = await this.connectWallet.connect(provider[providerName], network, settings);

      return connecting;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error('initWalletConnect providerWallet err: ', error);
      if (error.code === 2) {
        if (error.type === 'MetaMask') {
          getToastMessage('info', notifyText.wallet.connect.info.noExtension(providerName));
        } else if (error.type === 'CoinbaseWallet') {
          getToastMessage('info', notifyText.wallet.connect.info.noExtension(providerName));
        }
      } else if (error.code === 4) {
        if (error.type === 'MetaMask') {
          // Add unknown chain for MetaMask
          const { network: networkConfig } = chains[chainName][type];
          if (networkConfig) {
            // @see https://docs.metamask.io/guide/rpc-api.html#wallet-addethereumchain
            window.ethereum?.request({
              method: 'wallet_addEthereumChain',
              params: [networkConfig],
            });
          }
        }
      }

      return false;
    }
  }

  public resetConnect(): void {
    this.connectWallet.resetConect();
  }

  public eventSubscribe() {
    return this.connectWallet.eventSubscriber();
  }

  public Web3() {
    return this.connectWallet.currentWeb3();
  }

  public getAccount(): Promise<IConnect | IError | { address: string }> {
    return this.connectWallet.getAccounts();
  }
}
