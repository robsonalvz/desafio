import  { createActions, createReducer } from 'reduxsauce';
export const { Types, Creators } = createActions({
  registerPersonRequest: ['person'],
  registerPersonSuccess: ['person'],
  registerPersonFailure: ['error'],

  updatePersonRequest: ['person'],
  updatePersonSuccess: ['person'],
  updatePersonFailure: ['error'],

  listPersonRequest: null,
  listPersonSuccess: ['persons'],
  listPersonFailure: ['error'],

  deletePersonRequest: ['person'],
  deletePersonSuccess: ['person'],
  deletePersonFailure: ['error'],
})

const INITIAL_STATE = { person : null, loading: false, error: [], persons: []} ;

/**
 * REGISTER REQUESTS BELLOW
 */

const registerPersonRequest = (state = INITIAL_STATE, action) => ({...state, error: [], person : null, loading: true })

const registerPersonSuccess = (state = INITIAL_STATE, action) => {
  return {...state, error: [], loading: false, person: action.person, persons: [...state.persons, action.person] }
}

const registerFailure = (state = INITIAL_STATE, action) => {
  return {...state, error: action.error, loading: false, person : null}
}
/**
 * UPDATE REQUESTS BELLOW
 */

const updatePersonRequest = (state = INITIAL_STATE, action) => ({...state, error: [], loading: true })

const updatePersonSuccess = (state = INITIAL_STATE, action) => {
  return {...state, error: [], loading: false, person: action.person, persons: state.persons.map(person => person.id === action.person.id ? action.person : person )}
}

const updateFailure = (state = INITIAL_STATE, action) => {
  return {...state, error: action.error, loading: false}
}

/**
 * LIST REQUESTS BELLOW
 */

const listPersonRequest = (state = INITIAL_STATE, action) => ({...state, error: [], persons : [], loading: true })

const listPersonSuccess = (state = INITIAL_STATE, action) => {
  return {...state, error: [], loading: false, persons: action.persons}
}

const listPersonFailure = (state = INITIAL_STATE, action) => {
  return {...state, error: action.error, loading: false, persons : []}
}

/**
 * DELETE REQUESTS BELLOW
 */

const deletePersonRequest = (state = INITIAL_STATE, action) => ({...state, error: [], loading: true })

const deletePersonSuccess = (state = INITIAL_STATE, action) => {
  return {...state, error: [], loading: false, persons: state.persons.filter(person => person.id !== action.person.id)}
}

const deletePersonFailure = (state = INITIAL_STATE, action) => {
  return {...state, error: action.error, loading: false}
}

export default createReducer(INITIAL_STATE, {
  [Types.REGISTER_PERSON_REQUEST]: registerPersonRequest,
  [Types.REGISTER_PERSON_SUCCESS]: registerPersonSuccess,
  [Types.REGISTER_PERSON_FAILURE]: registerFailure,

  [Types.UPDATE_PERSON_REQUEST]: updatePersonRequest,
  [Types.UPDATE_PERSON_SUCCESS]: updatePersonSuccess,
  [Types.UPDATE_PERSON_FAILURE]: updateFailure,

  [Types.LIST_PERSON_REQUEST]: listPersonRequest,
  [Types.LIST_PERSON_SUCCESS]: listPersonSuccess,
  [Types.LIST_PERSON_FAILURE]: listPersonFailure,

  [Types.DELETE_PERSON_REQUEST]: deletePersonRequest,
  [Types.DELETE_PERSON_SUCCESS]: deletePersonSuccess,
  [Types.DELETE_PERSON_FAILURE]: deletePersonFailure,
});