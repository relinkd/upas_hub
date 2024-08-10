import { fork } from 'redux-saga/effects';

import getUserAchievements from './getUserAchievements';

export function* userSagas() {
  yield fork(getUserAchievements);
}
