import { useMemo } from 'react';
import { mapChainToRpc } from 'shared/config';
import { useShallowSelector } from 'shared/lib';
import Web3 from 'web3';

export const useDefaultWeb3Provider = () => {
  const { network, chainType } = useShallowSelector(() => ({} as any));
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const rpc = useMemo(() => mapChainToRpc[network][chainType], [chainType, network]);
  return useMemo(() => new Web3(rpc), [rpc]);
};
