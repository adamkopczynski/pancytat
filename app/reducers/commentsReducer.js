import * as types from '../constants/actionTypes';

const INITIAL_STATE = {
  list: [],
  fetching: false,
  errors: {}
}

export default function commentsReducer(state = INITIAL_STATE, action){
  switch(action.type){

    case types.FETCH_COMMENTS:
      return{...state, fetching: true }

    case types.FETCH_COMMENTS_SUCCESS:
      return{...state, fetching: false, list: action.comments}

    default:
      return{...state}
  }
}
