import { all } from 'redux-saga/effects';
import { rootPersonSaga } from '../sagas/person';

export default function* rootSaga() {
  yield all([
    rootPersonSaga(),
  ])
}
