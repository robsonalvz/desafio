import React from 'react';
import {
  takeLatest, all, put, call
} from 'redux-saga/effects';
import api from '../../services/api';
import { Types, Creators as PersonActions } from '../ducks/person'
import { notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

function* register(action) {
  try {
    const response = yield call(api.post, '/person', action.person);
    yield put(PersonActions.registerPersonSuccess(response.data.data));
    notification.open({
      message: 'Pessoa cadastrada com sucesso!.',
      description: 'Os dados foram atualizados.',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  } catch (error) {
    if (!!error.response) notification.open({
      message: 'Ops! Ocorreu um erro!.',
      description: error.response.data.errors[0],
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
    yield put(PersonActions.registerPersonFailure(error.response.data || error))
  }
}

function* update(action) {
  try {
    const response = yield call(api.put, `/person/${action.person.id}`, action.person);
    yield put(PersonActions.updatePersonSuccess(response.data.data));
    notification.open({
      message: 'Pessoa atualizada',
      description: 'Os dados foram atualizados.',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  } catch (error) {
    console.log(error)
    yield put(PersonActions.updatePersonFailure(error || error.response.data))
  }
}

function* deletePerson(action) {
  try {
    yield call(api.delete, `/person/${action.person.id}`);
    yield put(PersonActions.deletePersonSuccess(action.person));
    notification.open({
      message: 'Pessoa removida',
      description: 'Os dados foram atualizados.',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  } catch (error) {
    console.log(error)
    yield put(PersonActions.deletePersonFailure(error || error.response.data))
  }
}

function* list(action) {
  try {
    const {data: persons} = yield call(api.get, '/person');
    yield put(PersonActions.listPersonSuccess(persons.data));
  } catch (error) {
    yield put(PersonActions.listPersonFailure(error.response.data || error))
  }
}

export function* rootPersonSaga() {
  yield all([takeLatest(Types.REGISTER_PERSON_REQUEST, register)]);
  yield all([takeLatest(Types.LIST_PERSON_REQUEST, list)]);
  yield all([takeLatest(Types.UPDATE_PERSON_REQUEST, update)]);
  yield all([takeLatest(Types.DELETE_PERSON_REQUEST, deletePerson)]);
}
