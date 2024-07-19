import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
  address: string;
  isAdmin: boolean;
};

const initialUserState: UserState = {
  address: '',
  isAdmin: false,
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
