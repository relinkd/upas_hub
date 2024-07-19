import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chains, ChainType, WalletProviders } from 'shared/config';

export type UserState = {
  address: string;
  provider: WalletProviders;
  chainType: ChainType;
  isAdmin: boolean;
  network: Chains;
};

const initialUserState: UserState = {
  address: '',
  provider: WalletProviders.metamask,
  isAdmin: false,
  chainType: 'testnet', // TODO: change to mainnet on production
  network: Chains.Polygon,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    updateUserState: (state: UserState, action: PayloadAction<Partial<UserState>>) => ({
      ...state,
      ...action.payload,
    }),

    clearUserState: () => ({
      ...initialUserState,
    }),

    disconnectWalletState: () => {
      localStorage.removeItem('walletconnect');
      return {
        ...initialUserState,
      };
    },

    /** For saga */
    /* eslint-disable @typescript-eslint/no-unused-vars */
    getUserInfo(state, action: PayloadAction) {},
  },
});

export const { reducer } = userSlice;
export const { actions: userActions } = userSlice;
