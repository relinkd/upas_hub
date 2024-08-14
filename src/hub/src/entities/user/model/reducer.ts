import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Achievements = Record<string, Record<string, string>[]>

export type UserState = {
  isConnected: boolean
  achievements: Achievements
  postMessage: {
    type: string
    data: string
    achievement?: string
    reputation_module?: string
  } | undefined
};

const initialUserState: UserState = {
  isConnected: false,
  achievements: {},
  postMessage: undefined
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
