import { userModel } from 'entities/user';
import { all, fork } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([userModel.userSagas].map(fork));
}
