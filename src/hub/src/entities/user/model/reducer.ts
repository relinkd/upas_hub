import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
  isConnected: boolean
  achievements: any
};

const initialUserState: UserState = {
  isConnected: false,
  achievements: []
};

export type GetUserAchievementsReq = {
  getCollections: any,
}

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
    getUserAchievements(state, action: PayloadAction<GetUserAchievementsReq>) {},
  },
});

export const { reducer } = userSlice;
export const { actions: userActions } = userSlice;
