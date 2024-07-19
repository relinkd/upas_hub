import { Chains, ChainType, NativeCurrency } from '../types';

export const mapChainToChainId: Record<
  Chains,
  {
    [chainType in ChainType]: number;
  }
> = {
  [Chains.Polygon]: {
    mainnet: 137,
    testnet: 80001,
  },
};

export const mapChainToNativeCurrency: Record<
  Chains,
  {
    [chainType in ChainType]: NativeCurrency;
  }
> = {
  [Chains.Polygon]: {
    mainnet: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    testnet: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
  },
};

export const mapChainToRpc: Record<
  Chains,
  {
    [chainType in ChainType]: string;
  }
> = {
  [Chains.Polygon]: {
    mainnet: 'https://endpoints.omniatech.io/v1/matic/mainnet/public',
    testnet: 'https://matic-mumbai.chainstacklabs.com',
  },
};

export const mapChainToBlockExplorerUrl: Record<
  Chains,
  {
    [chainType in ChainType]: string;
  }
> = {
  [Chains.Polygon]: {
    mainnet: 'https://polygonscan.com/',
    testnet: 'https://mumbai.polygonscan.com/',
  },
};
