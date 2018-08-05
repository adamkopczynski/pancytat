import * as types from '../constants/actionTypes'

export const fetchFavorites = () => ({
  type: types.FETCH_FAVORITES
})

export const favoritesFetched = quotes => ({
  type: types.FETCH_FAVORITES_SUCCESS,
  quotes
})
