import * as types from '../constants/actionTypes'

export const fetchTop = () => ({
  type: types.FETCH_TOP
})

export const topFetched = quotes => ({
  type: types.FETCH_TOP_SUCCESS,
  quotes
})
