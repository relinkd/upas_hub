import { createSelector } from '@reduxjs/toolkit';
import { State } from 'app/store';

const getUser = (state: State) => state.user;

const selectUserWeb3Info = createSelector(getUser, ({ network, chainType, provider, address }) => ({
  network,
  chainType,
  provider,
  address,
}));

const selectIsAuthenticated = createSelector(getUser, ({ address }) => ({
  isAuthenticated: !!address,
  userAddress: address,
}));

const selectUserInfo = createSelector([getUser, selectIsAuthenticated], ({ isAdmin }, authenticatedData) => ({
  isAdmin,
  ...authenticatedData,
}));

export const selectors = {
  getUser,
  selectUserWeb3Info,
  selectIsAuthenticated,
  selectUserInfo,
};
