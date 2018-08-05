import * as types from '../constants/actionTypes';

export const fetchComments = () => ({
  type: types.FETCH_COMMENTS
})

export const commentsFetched = (comments) => ({
  type: types.FETCH_COMMENTS_SUCCESS,
  comments
})
