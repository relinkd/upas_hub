import { createSelector } from '@reduxjs/toolkit';
import { State } from 'app/store';

const getUser = (state: State) => state.user;
const getPostMessage = (state: State) => state.user.postMessage;

export const selectors = {
  getUser,
  getPostMessage
};
