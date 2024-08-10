import { error, request, success } from 'shared/api';
import { put, takeLatest } from 'typed-redux-saga';
import { createReactor } from '@ic-reactor/react';

import { userActions } from '../reducer';

export function* getUserAchievementsSaga({ type, payload: { } }: ReturnType<typeof userActions.getUserAchievements>) {
  yield* put(request(type));
  try {
    yield* put(success(type));
  } catch (err) {
    yield* put(error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(userActions.getUserAchievements.type, getUserAchievementsSaga);
}
