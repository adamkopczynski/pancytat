import * as types from '../constants/actionTypes'

const INITIAL_STATE = {
  quotes: [],
  fetching: false
}

export default function(state = INITIAL_STATE, action){
  switch(action.type){

    case types.FETCH_FAVORITES:
      return{...state, fetching: true }

    case types.FETCH_FAVORITES_SUCCESS:
      return{...state, fetching: false, quotes: action.quotes}

    default:
      return{...state}
  }
}
