import { error, request, success } from 'shared/api';
import { put, takeLatest } from 'typed-redux-saga';

import { userActions } from '../reducer';

export function* getUserInfoSaga({ type }: ReturnType<typeof userActions.getUserInfo>) {
  yield* put(request(type));
  try {
    yield* put(success(type));
  } catch (err) {
    yield* put(error(type, err));
  }
}

export default function* listener() {
  yield takeLatest(userActions.getUserInfo.type, getUserInfoSaga);
}
