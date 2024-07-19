import { factoryAbi } from './abi';
import { Chains, ContractsNames, IContracts } from './types';

export const contracts: IContracts['contracts'] = {
  [ContractsNames.Name]: {
    testnet: {
      address: {
        [Chains.Polygon]: '',
      },
      abi: [],
    },
    mainnet: {
      address: {
        [Chains.Polygon]: '',
      },
      abi: factoryAbi,
    },
  },
};

export const contractsConfig: IContracts = {
  names: Object.keys(ContractsNames),
  decimals: 18,
  contracts,
};
