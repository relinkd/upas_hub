import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IConnector } from '@connect2ic/core';

export type UserState = {
  isConnected: boolean
};

const initialUserState: UserState = {
  isConnected: false
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

    /** For saga */
    /* eslint-disable @typescript-eslint/no-unused-vars */
    getUserInfo(state, action: PayloadAction) {},
  },
});

export const { reducer } = userSlice;
export const { actions: userActions } = userSlice;
