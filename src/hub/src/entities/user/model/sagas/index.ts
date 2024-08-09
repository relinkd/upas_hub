import { fork } from 'redux-saga/effects';

import getUserInfo from './getUserInfo';

export function* userSagas() {
  yield fork(getUserInfo);
}
