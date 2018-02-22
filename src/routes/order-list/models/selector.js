// import { createSelector } from 'reselect'
import { get } from 'lodash'

export const getCounter = state => get(state, 'gamePortal.cumulate')

/*
 export const makeMultiedCounter = createSelector(
 [getCounter, getMultiple],
 (counter, multiple) => counter * multiple,
 )
 */
