import { INetwork, IProvider, ISettings } from '@amfi/connect-wallet/src/interface';
import { AbiItem } from 'web3-utils';

export enum ContractsNames {
  Name = 'Name',
}

/**
 * Should strict equal to @see https://github.com/Rock-n-Block/connect-wallet-lib/blob/6ae2e4eb5292a9685da8902505faa8623a385b8a/src/index.ts#L123
 */
export enum WalletProviders {
  metamask = 'MetaMask',
  walletConnect = 'WalletConnect',
  coinbase = 'CoinbaseWallet',
}

export enum Chains {
  Polygon = 'Polygon',
}
export type ChainType = 'testnet' | 'mainnet';

export interface IConnectWallet {
  network: INetwork;
  provider: {
    [index: string]: IProvider;
  };
  settings: ISettings;
}

export type NativeCurrency = {
  name: string;
  symbol: string; // 2-6 characters long
  decimals: number;
};

// @see https://docs.metamask.io/guide/rpc-api.html#wallet-addethereumchain
interface AddEthereumChainParameter {
  chainId: string; // A 0x-prefixed hexadecimal string
  chainName: string;
  nativeCurrency: NativeCurrency;
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[]; // Currently ignored.
}

export type TChain = {
  name: string;
  chainId: number;
  nativeCurrency: NativeCurrency;
  rpc: string;
  blockExplorerUrl: string;
  provider: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
  img?: string;
  network?: AddEthereumChainParameter;
};

export type TChains = Record<
  Chains,
  {
    [chainType in ChainType]: TChain;
  }
>;

export interface IContracts {
  decimals: number;
  names: string[];
  contracts: {
    [contractName in ContractsNames]: {
      [chainType in ChainType]: {
        address: {
          [chainKey in Chains]: string;
        };
        abi: AbiItem[];
      };
    };
  };
}

export type Token = {
  address: string;
  symbol: string;
  decimals: number;
  image?: string;
};
