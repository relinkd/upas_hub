import Web3 from 'web3';

import { mapChainToBlockExplorerUrl, mapChainToChainId, mapChainToNativeCurrency, mapChainToRpc } from './lib';
import { Chains, ChainType, IConnectWallet, TChain, TChains, WalletProviders } from './types';

type ChainsConfig = {
  chain: Chains;
  providers: WalletProviders[];
  isCustomChain?: boolean;
}[];

const getChainsConfig = (chainsConfig: ChainsConfig) => {
  return chainsConfig.reduce((acc, { chain, providers }) => {
    return {
      ...acc,
      [chain]: (['mainnet', 'testnet'] as ChainType[]).reduce(
        (chainTypesAccumulator, chainType) => {
          const chainId = mapChainToChainId[chain][chainType];
          const nativeCurrency = mapChainToNativeCurrency[chain][chainType];
          const rpc = mapChainToRpc[chain][chainType];
          const blockExplorerUrl = mapChainToBlockExplorerUrl[chain][chainType];
          return {
            ...chainTypesAccumulator,
            [chainType]: {
              name: chain,
              chainId,
              nativeCurrency,
              rpc,
              blockExplorerUrl,
              provider: providers.reduce((providersAccumulator, providerName) => {
                let newProvider;
                // If you want to add custom provider add here condition
                if (providerName === WalletProviders.metamask) {
                  newProvider = {
                    name: WalletProviders.metamask,
                  };
                } else if (providerName === WalletProviders.walletConnect) {
                  newProvider = {
                    name: WalletProviders.walletConnect,
                    useProvider: 'rpc',
                    provider: {
                      rpc: {
                        rpc: {
                          [chainId]: rpc,
                        },
                        chainId,
                      },
                    },
                  };
                } else if (providerName === WalletProviders.coinbase) {
                  newProvider = {
                    name: WalletProviders.coinbase,
                    useProvider: 'rpc',
                    provider: {
                      rpc: {
                        rpc: {
                          [chainId]: rpc,
                        },
                        chainId,
                      },
                    },
                  };
                }

                if (!newProvider) return providersAccumulator;
                return {
                  ...providersAccumulator,
                  [providerName]: newProvider,
                };
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
              }, {} as { [key: string]: any }),
              network: {
                chainId: Web3.utils.toHex(chainId),
                chainName: `${chain} ${chainType === 'mainnet' ? 'Mainnet' : 'Testnet'}`,
                nativeCurrency,
                rpcUrls: [rpc],
              },
            } as TChain,
          };
        },
        {} as {
          [chainType in ChainType]: TChain;
        },
      ),
    };
  }, {} as TChains);
};

export const chains: TChains = getChainsConfig([
  {
    chain: Chains.Polygon,
    providers: [WalletProviders.metamask, WalletProviders.walletConnect, WalletProviders.coinbase],
  },
]);

export const connectWallet = (newChainName: Chains, type: ChainType): IConnectWallet => {
  const chain = chains[newChainName][type];
  return {
    network: {
      chainName: chain.name,
      chainID: chain.chainId,
      nativeCurrency: chain.nativeCurrency,
      rpc: chain.rpc,
      blockExplorerUrl: chain.blockExplorerUrl,
    },
    provider: chain.provider,
    settings: { providerType: true },
  };
};
