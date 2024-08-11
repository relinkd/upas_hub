import { createSelector } from '@reduxjs/toolkit';
import { State } from 'app/store';

const getUser = (state: State) => state.user;

export const selectors = {
  getUser,
};
