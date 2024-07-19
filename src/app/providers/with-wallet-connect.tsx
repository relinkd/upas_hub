import { createContext, FC, PropsWithChildren, useCallback, useEffect, useMemo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { IConnect, IError } from '@amfi/connect-wallet/src/interface';
import { userModel } from 'entities/user';
import { Subscription } from 'rxjs';
import { Chains, notifyText, WalletProviders, WalletService } from 'shared/config';
import { getToastMessage, useShallowSelector } from 'shared/lib';

interface IContextValue {
  connect: (provider: WalletProviders, chain: Chains) => Promise<void>;
  disconnect: () => void;
  walletService: WalletService;
}

type IAccountInfo = IConnect | IError | { address: string };

export const Web3Context = createContext({} as IContextValue);
export const WithWalletConnect: FC<PropsWithChildren> = ({ children }) => {
  const subscriberRef = useRef<Subscription | null>(null);

  const WalletConnect = useMemo(() => new WalletService(), []);
  const dispatch = useDispatch();
  const {
    provider: storedProvider,
    address,
    chainType,
    network,
  } = useShallowSelector(userModel.selectors.selectUserWeb3Info);

  const disconnect = useCallback(
    ({ showNotification = true } = {}) => {
      dispatch(userModel.userActions.disconnectWalletState());
      WalletConnect.resetConnect();
      subscriberRef.current?.unsubscribe();
      subscriberRef.current = null;
      if (showNotification) {
        getToastMessage('info', notifyText.wallet.disconnect.info);
      }
    },
    [WalletConnect, dispatch],
  );

  const subscriberSuccess = useCallback(
    (res: { name: string; address: string }) => {
      if (document.visibilityState !== 'visible') {
        disconnect();
        return;
      }

      if (res.name === 'accountsChanged') {
        disconnect();
        getToastMessage('info', notifyText.wallet.connect.info.pleaseLogin);
      }
    },
    [disconnect],
  );

  const subscriberError = useCallback(
    (error: { code: number }) => {
      // eslint-disable-next-line no-console
      console.error(error);
      if (error.code === 4) {
        getToastMessage('error', notifyText.wallet.connect.error.wrongNetwork(network, chainType));
        disconnect();
      }
    },
    [chainType, disconnect, network],
  );

  const connect = useCallback(
    async (provider: WalletProviders, chain: Chains) => {
      const connected = await WalletConnect.initWalletConnect(provider, chain, chainType);
      if (!connected) {
        return;
      }

      try {
        if (!subscriberRef.current) {
          subscriberRef.current = WalletConnect.eventSubscribe().subscribe(subscriberSuccess, subscriberError);
        }
        const accountInfo: IAccountInfo = await WalletConnect.getAccount();
        const accountAddress = (accountInfo as IConnect).address;

        if (accountAddress === address) {
          dispatch(
            userModel.userActions.updateUserState({
              provider: (accountInfo as IError).type as WalletProviders,
              network: chain,
            }),
          );
          return;
        }

        if (accountAddress) {
          dispatch(
            userModel.userActions.updateUserState({
              provider: (accountInfo as IError).type as WalletProviders,
              address: accountAddress,
              network: chain,
            }),
          );
          getToastMessage('success', notifyText.wallet.connect.success(accountAddress));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-empty
      } catch (error: any) {
        if (error.code === 4) {
          getToastMessage('error', typeof error.message === 'string' ? error.message : error.message.text);
        }
      }
    },
    [WalletConnect, address, chainType, dispatch, subscriberError, subscriberSuccess],
  );

  useEffect(() => {
    // connect user if he connected previously
    if (storedProvider && address.length && network) {
      connect(storedProvider as WalletProviders, network);
    }
    // @disable-reason: this effect should work only once on page load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Web3Context.Provider value={{ connect, disconnect, walletService: WalletConnect }}>
      {children}
    </Web3Context.Provider>
  );
};
